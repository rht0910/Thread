const Thread = require('..')
module.exports = new Thread.Thread(() => {
  console.log('Instant')
}).start()
