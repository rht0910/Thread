const Thread = require('../')
new Thread(() => {
  console.log('test')  
})
  .on('resolved', () => console.log('Resolved'))
  .start()
