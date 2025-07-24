const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/subscribe', (req, res) => {
    const{email} = req.body;


const msg ={
    to: email,
    from: 'janiceleslie050@gmail.com',
    subject: 'Welcome to Deakin',
    html:
    `
      <h2>Welcome to DEV@Deakin!</h2>
      <p>Thank you for subscribing. We're excited to have you on board!</p>
    `,
}

sgMail
.send(msg)
.then(()=> res.status(200).send('Email sent'))
.catch((error)=>{
    console.error('Error: ',error);
    res.status(500).send('Failed to send email');
});
});
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});