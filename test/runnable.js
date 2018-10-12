const Thread = require('..')
const Runnable = require('../Runnable')

const runnable = new Runnable(() => {
  function anotherMethod() {
    console.log('Of course you can use another method.')
  }
  console.log('Using Runnable class')
  anotherMethod()
})
const thread = new Thread(runnable.run) // you need .run (do not '()')
thread.start()
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
