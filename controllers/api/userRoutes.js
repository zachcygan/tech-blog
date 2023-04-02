const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.redirect('/dashboard')
        });

        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        res.redirect('/login')
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/logout', async (req, res) => {
    try {
        const { userId } = req.session;
        if (userId) {
            await User.update({ 
                session: null 
            }, 
            { 
                where: { 
                    id: userId 
                }
            });

            req.session.destroy();
        }

        res.redirect('/login');
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router;