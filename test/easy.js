const Thread = require('..')
const outside = 'test'
module.exports = new Thread(() => {
  console.log(outside)
}).start()
