const webpush = require('web-push')
 
const vapidKeys = {
  privateKey: process.env.WEBPUSH_PRIVATE_KEY,
  publicKey: process.env.WEBPUSH_PUBLIC_KEY,
}
// webpush.setGCMAPIKey('12345678910');
webpush.setVapidDetails(
  'mailto:shain.codes@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

module.exports.sendNotification = async (subscription, dataToSend) => {
  const res = await webpush.sendNotification(subscription, dataToSend).catch((err) => {
    if (err.statusCode >= 400) {
      console.log('Subscription is invalid: ', err)
    }
  })
}

module.exports.default = webpush
