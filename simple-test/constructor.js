const Thread = require('..')
const thread = new Thread(() => {
  console.log('test')
})
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
console.log('before start')
thread.start()
console.log('after start')
