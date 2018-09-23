const Thread = require('..')
const Runnable = require('../Runnable')

const runnable = new Runnable(() => {
  console.log('Using Runnable class')
})
const thread = new Thread(runnable.run) // you need .run (do not '()')
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
