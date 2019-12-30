//Imports
const fastify = require('fastify')()

//Routes
fastify.register(require('./routes/invoice'), { prefix: 'status/invoice'})
fastify.register(require('./routes/eth'), { prefix: 'status/eth/invoice'})


//Listener
fastify.listen(3000, (err, address) => {
    if(err) {
    console.log(err)
    process.exit(1)
    }
    else console.log('server running on 3000...')
})