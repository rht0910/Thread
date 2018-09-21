const Thread = require('..')
const thread = new Thread.Thread(async () => {
  Promise.reject('Promsie reject')
  throw new Error('Test')
})
thread.start()
thread.on('resolved', () => console.log('never'))
thread.on('rejected', error => console.log('Rejected: ' + error))
