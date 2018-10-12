const Thread = require('..')
const thread = new Thread(async () => {
  Promise.reject('Promise reject')
  throw new Error('Test')
})
thread.start()
thread.on('resolved', () => console.log('never'))
thread.on('rejected', error => {
  console.log('Rejected: ' + error.error)
  console.log('stacktrace: ' + error.stack)
})
