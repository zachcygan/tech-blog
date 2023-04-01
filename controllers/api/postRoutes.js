const router = require('express').Router();
const { Project } = require('../../models');
const { post } = require('../homeRoutes');

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

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destry({
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