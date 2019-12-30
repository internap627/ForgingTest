const rp = require("request-promise");

const getEthRate = (fiat, res) => {
  const options = {
    uri: `https://api.coingecko.com/api/v3/coins/ethereum`,
    json: true
  };
  rp(options)
  .then((data) => {
    const fiatformatted = Number(fiat.replace(/[^0-9\.-]+/g,""));
    const ethRate = fiatformatted / data.market_data.current_price.usd
    res.send({ ethRate });
  })
  .catch(function(err) {
    // API call failed...
    console.log(err);
  });
}

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
    }

    rp(options)
      .then(function(repos) {
        const { orderAmountFiat } = repos;
        getEthRate(orderAmountFiat, res)
      })
      .catch(function(err) {
        // API call failed...
        console.log(err);
      });
  });
}

module.exports = routes;
