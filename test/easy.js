const Thread = require('..')
module.exports = new Thread(() => {
  console.log('Instant')
}).start()
