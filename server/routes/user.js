const rp = require('request-promise');


async function routes(fastify, options) {

  fastify.get('/:id', async function (req, res) {

    const options = {
        uri: `https://reqres.in/api/users/${req.params.id}`,
        json: true
    };
    
    rp(options)
        .then(function (repos) {
            res.send(
                repos.data
            )
        })
        .catch(function (err) {
            // API call failed...
            console.log(err);
        });
  })
}

module.exports = routes;
