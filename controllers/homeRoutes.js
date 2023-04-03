const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../util/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        

        const posts = postData.map((post) => post.get({ plain: true }));
        

        console.log(req.session.logged_in)

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ]
        })

        req.session.post_id = req.params.id

        const post = postData.get({ plain: true });
        const comments = commentData.map((post) => post.get({ plain: true }));
        
        res.render('post', {
            post,
            comments,
            currentUser: {
                id: req.session.user_id
            },
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPost = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userPost.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login')
})

router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('register')
})

module.exports = router;