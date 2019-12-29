//Imports
const fastify = require('fastify')()

//Routes
fastify.register(require('./routes/user'), { prefix: 'api/user'})
fastify.register(require('./routes/avatar'), { prefix: 'api/user'})


//Listener
fastify.listen(3000, (err, address) => {
    if(err) {
    console.log(err)
    process.exit(1)
    }
    else console.log('server running on 3000...')
})