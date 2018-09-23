const Thread = require('..')
const thread = new Thread(() => {
  console.log('test')
})
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
