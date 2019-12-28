<template>
  <div class="RateGroup">
    <h1>Ethereum</h1>
    <div class='Card'>
      <h3>BTC Price</h3>
      <p>{{ this.price.btc }}</p>
      <h3>USD Price</h3>
      <p>${{ this.price.usd }}</p>
    </div>
    <div class="SelectWrapper">
      <select class="select-text" v-model="selection">
        <option value="english">English</option>
        <option value="russian">Russian</option>
        <option value="japanese">Japanese</option>
      </select>
        <label class="select-label">Select Translation</label>
    </div>
    <br />
    <div class='translation'>
      <strong>{{ this.translation[this.selection]  }}</strong>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EthRate',
    data() {
        return {
            url: 'https://api.coingecko.com/api/v3/coins/ethereum',
            price: {
                    btc: 0,
                    usd: 0
                },
            translation: {
              english: '',
              russian: '',
              japanese: ''
            },
            selection: 'english'
        }
    },
    created () {
    this.fetchData()
    this.updateData()
    },
    methods: {
      fetchData: function () {
      fetch(this.url)
      .then((response) => {
          return response.json();
        }).then((data) => {
          this.translation.english = data.description.en
          this.translation.russian = data.description.ru
          this.translation.japanese = data.description.ja
          this.price.btc = data.market_data.current_price.btc
          this.price.usd = data.market_data.current_price.usd
        });
      },
      updateData: function () {
        const self = this;
        setInterval(function(){ 
          fetch(self.url)
          .then((response) => {
            return response.json();
          }).then((data) => {
          self.price.btc = data.market_data.current_price.btc
          self.price.usd = data.market_data.current_price.usd
        });
       }, 40000);
      }
    }
  }
</script>

<style scoped>
.RateGroup > * {
  margin-bottom: 10px;
}

.Card {
  width: 250px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border: solid #54b883 10px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 1fr 1fr;
  transition: 0.5s;
  margin: 32px auto;
}

.Card:hover {
  transform: scale(1.02, 1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5)
}

.Card h3 {
  opacity: 0.8;
  font-size: 20px;
  margin: 20px;
  width: 50px;
  text-transform: uppercase;
}

.Card p {
  margin: 25px auto;
  font-size: 20px;
  font-weight: 600;
}

.SelectWrapper {
  margin: 32px 0;
}

.select-text {
	position: relative;
	font-family: inherit;
	background-color: transparent;
	width: 350px;
	padding: 10px 10px 10px 0;
	font-size: 18px;
	border-radius: 0;
	border: none;
	border: 2px solid rgba(0,0,0, 0.12);
}

.translation {
  margin: 32px auto;
  padding: 16px;
  height: 50vh;
  width: 50vw;
  overflow: scroll;
}

.select-label {
  display: block;
	font-size: 18px;
	font-weight: normal;
	pointer-events: none;
	left: 0;
	top: 10px;
	transition: 0.2s ease all;
  margin: 16px;
}
</style>
