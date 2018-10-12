const Thread = require('..')
const thread = new Thread(arg => {
  console.log(arg)
  return true
})
thread.on('resolved', result => console.log('Resolved: ' + result))
thread.on('rejected', () => console.log('never be called'))
thread.start(['It works!', 'It works again'])
