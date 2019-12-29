const rp = require('request-promise')
const fs = require('fs')
const request = require('request')

const fileFinder = (id) => {
    const path = `./${id}.jpg`
try {
  if (fs.existsSync(path)) {
    //file exists
    console.log('file found')
    return true
  }
} catch(err) {
  console.error(err)
}
}

function base64(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}

async function routes(fastify, options) {

  fastify.delete('/:id/avatar', async function (req, res) {
    if(fileFinder(req.params.id)) {
        const path = `./${req.params.id}.jpg`
        try {
            fs.unlinkSync(path)
            //file removed
          } catch(err) {
            console.error(err)
          }
          res.send(
            {deleted: `./${req.params.id}.jpg`}
        )
    }
  })

  fastify.get('/:id/avatar', async function (req, res) {

    const options = {
        uri: `https://reqres.in/api/users/${req.params.id}`,
        json: true
    };
    
    rp(options)
        .then(function (repos) {

            if(fileFinder(repos.data.id)) {
                return
            }

            else {
            var download = function(uri, filename, callback){
                request.head(uri, function(err, res, body){
                  console.log('content-type:', res.headers['content-type']);
                  console.log('content-length:', res.headers['content-length']);
              
                  request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
              };
            download(repos.data.avatar, `${repos.data.id}.jpg`, function(){
            console.log('done');
            const encoded = base64(`${repos.data.id}.jpg`)
            res.send(
                encoded
            )
            });

            
            }
            })
            .catch(function (err) {
                // API call failed...
                console.log(err);
            });
  })

  
}

module.exports = routes;