const Thread = require('..')
const thread = new Thread(() => {
  console.log('test')
})
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', error => console.log('Rejected: ' + error))
thread.on('interrupt', () => console.log('Interrupted'))
console.log(thread.ended)
