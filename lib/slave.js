process.once('message', async data => {
  const run = data.run
  const func = new Function('return ' + run)()
  try {
    const result = await func(...data.args)
    process.send({status: 'resolved', result: result})
  } catch(e) {
    process.send({status: 'rejected', result: e.toString(), stack: e.stack || null})
  }
})
