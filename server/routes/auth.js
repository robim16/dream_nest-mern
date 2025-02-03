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


module.exports = router;