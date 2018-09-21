const Thread = require('..')
const runnable = new Thread.Runnable(() => {
  console.log('Using Runnable class')
})
const thread = new Thread.Thread(runnable.run) // you need .run (do not '()')
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
