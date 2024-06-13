const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

exports.sendInquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: 'Inquiry from website',
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: 'Inquiry sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
