const sgMail = require('@sendgrid/mail')
const apiKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(apiKey)

const sendWelcome = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kappy@acydburne.com.pt',
        subject: 'Welcome to the Task Manager App',
        text: 'Hello ' + name + ' and welcome to the Task Manager App'
    })
}

const sendCancellation = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kappy@acydburne.com.pt',
        subject: 'Task Manager App Account cancelled',
        text: 'Hello ' + name + '. We\'ve cancelled your account'
    })
}

// sgMail.send({
//     to: 'Bebe Pekenina <cuddly@acydburne.com.pt>',
//     from: 'Prof Marcelo <seila@cenas.pt>',
//     subject: 'Parabéns Magda',
//     text: 'Parabéns por ser a Melhor trabalhadora da Segurança Social.. Acabou de ganhar exactamente nada, e mais um pouco de nenhum!'
// })

module.exports = {
    sendCancellation,
    sendWelcome
}