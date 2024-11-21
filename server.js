const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const connectDB = require('./db');
const User = require('./User');

const app = express();
const port = 3000;

app.use(bodyParser.json());

connectDB();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: 'Email already registered' });
        }

        user = new User({ username, email, password });
        await user.save();

        let mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Confirm your registration',
            text: `Hello ${username}, please confirm your registration by clicking the link: http://localhost:${port}/confirm?email=${email}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({ success: false, message: 'Failed to send confirmation email' });
            }
            res.json({ success: true, message: 'Registration successful. Please check your email for confirmation.' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/confirm', async (req, res) => {
    const { email } = req.query;

    try {
        let user = await User.findOne({ email });
        if (user) {
            user.confirmed = true;
            await user.save();
            res.send('Your email has been confirmed. You can now login.');
        } else {
            res.send('Email not found or already confirmed.');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
