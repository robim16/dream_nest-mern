const router = require('express').Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/register', upload.single('profileImage'), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const profileImage = req.file;

        if(!profileImage) {
            return res.status(400).send('Please upload a profile image');
        }

        const profileImagePath = profileImage.path;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath
        });

        await newUser.save();

        res.status(200).json({message: 'User registered successfully', user: newUser});

    } catch (error) {
        res.status(500).json({message: "Registration failed!", error: error.message});
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({message: 'User doesn´t exists'});
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete user.password;

        res.status(200).json({token, user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Login failed!", error: error.message});
    }
});

module.exports = router;