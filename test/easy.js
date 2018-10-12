const Thread = require('..')
module.exports = new Thread(async () => {
  console.log('Instant')
  const test = async () => {
    console.log('test')
  }
  await test()
}).start()
