const User = require('../schemas/User');

const router = require('express').Router();

router.post('/signup', async (req, res) => {
    try {
        //find if user already exists
        const isExists = await User.findOne({ email: req.body.email });
        console.log(isExists);
        if (isExists) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }
        //create new user
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });
        //save user to database
        await user.save();
        res.json({
            message: 'User created successfully',
        });
    } catch (error) {
        //internal server error
        res.status(500).json({
            message: 'Internal server error',
        });
        console.log(error);
    }
});
router.post('/login', async (req, res) => {
    try {
        //find if user already exists
        const user = await User.findOne({ 'email': req.body.email });
        if (!user) {
            return res.status(400).json({
                message: 'User does not exists',
            });
        }
        //check password
        console.log(user)
        if (user.password !== req.body.password) {
            return res.status(400).json({
                message: 'Invalid credentials',
            });
        } 
        //user logged in successfully
        res.json({
            message: 'User logged in successfully',
            id: user._id
        });
    } catch (error) {
        //internal server error
        res.status(500).json({
            message: 'Internal server error',
        });
    }
});

module.exports = router;