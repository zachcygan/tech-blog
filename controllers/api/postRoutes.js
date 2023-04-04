const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body
        const postData = await Post.update({
            name,
            description
        },
        {
            where: {
                id: req.params.id
            }
        })

        res.status(200).json(postData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                post_id: req.params.id
            }
        })

        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            req.status(400).json({ message: 'No post found with that id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;