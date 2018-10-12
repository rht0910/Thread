const Thread = require('..')
const thread = new Thread(() => {
  console.log('test')
})
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
const thread2 = new Thread(() => {
  console.log('test2')
})
thread2.on('resolved', result => console.log('Resolved: ' + result))
thread2.on('rejected', () => console.log('never be called'))
const thread3 = new Thread(() => {
  console.log('test3')
})
thread3.on('resolved', result => console.log('Resolved: ' + result))
thread3.on('rejected', () => console.log('never be called'))
thread.start()
thread2.start()
thread3.start()
