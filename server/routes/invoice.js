const rp = require("request-promise");

async function routes(fastify, options) {
  fastify.post("/:id", async function(req, res) {
    const id = "YRfNzfkey2bgam49iQ5Qd1";
    const options = {
      uri: `https://api.forgingblock.io/invoice/status?invoiceId=${id}&paymentMethodId=BTC&_=1575903768088`,
      body: {
        invoice: req.params.id
      },
      json: true
    };

    if (options.body.invoice != id) {
      res.send({ error: "Invoice ID is not correct" });
    } else {
      rp(options)
        .then(function(repos) {
          const { btcAddress, status, orderAmount, orderAmountFiat } = repos;
          res.send({ btcAddress, status, orderAmount, orderAmountFiat });
        })
        .catch(function(err) {
          // API call failed...
          console.log(err);
        });
    }
  });
}

module.exports = routes;
