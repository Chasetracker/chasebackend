const {sendEmail} = require("./sendEmail")


const sendVerificationMail = async (user, emailUser) => {
    const transporter = sendEmail();

    const token = user.generateVerificationToken();
    await token.save();

    const mailOptions = {
        from: emailUser,
        to: user.email,
        subject: "Verify Your Email",
        html: `
            </style>
        <body style="font-family: calibri, 'DejaVu Sans', Arial, Helvetica, sans-serif; background-color: #cbd5e1;" >
        <div class="container" style=" margin: 0 auto; width: 600px; padding: 10px 30px 30px 30px; box-shadow: 0 0 4px #ddd;
        background-color: #f3f4f6; border-radius: 5px;" >
            <h1 class="text-blue" style="color: #0ea5e9;">Confirm your account</h1>
            <div>Welcome <b class="text-blue" style="color: #0ea5e9;">${user.business_name}</b> !</div>
            <p>
                Your account has been created on our platform
                <br/><br/>
                Find your login information below:
                <br/><br/>
                <span style="font-size: 14px; font-weight: bold">
                    Email address : <span class="text-blue" class="text-blue" style="color: #0ea5e9;">${user.email}</span>
                </span>
                <br/><br/>
                To confirm the validity of your email address, please make use of the token below
            </p>
            <p>
                <a class="link" style =" border: solid 1px #0ea5e9; background-color: #0ea5e9; text-decoration: none; color: #fff; font-size:80; font-weight: bold;
                display: block; width: 400px; text-align: center; padding: 10px 0; margin-top: 50px;
                border-radius: 5px;">${token.token}</a>
            </p>
            <br>
            <p>
                Regards, <br />
                <em>Chase Hackathon Team</em>
            </p>
        </div>
        </body>`
    };
  
    transporter.sendMail(mailOptions, (error, result) => {
        if (error){
        console.log(error)
           console.log( 'Opps error occured')
        } else{
            console.log('thanks for e-mailing me');
        }
    })
};

module.exports = {sendVerificationMail}


