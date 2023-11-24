const nodemailer = require ("nodemailer");


const sendEmail = () => {
    
    const emailUser = process.env.EMAIL_USERNAME;
    const pass = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: process.env.GMAIL_PORT,
        secure: true,
        auth: {
            user: emailUser,
            pass: pass,
        },
        tls: { rejectUnauthorized: false }
    });
    
    return transporter;
}
module.exports ={sendEmail}

