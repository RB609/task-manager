const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'rbhola89@gmail.com',
//     from: 'rbhola89@gmail.com',
//     subject: 'From my app',
//     text: 'I hope the email gets sent through'
// })

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rbhola89@gmail.com',
        subject: 'Thanks for joining in!!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app!`
    })
}

const sendCancelMail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'rbhola89@gmail.com',
        subject: 'Thanks for being with us',
        text: `Thanks for using our app. Kindly give a feedback so that we may serve better in the future`
    })
}

module.exports = {
    sendWelcomeMail,
    sendCancelMail
}