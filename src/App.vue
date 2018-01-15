<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <hr>
    <h3 style="color:white">{{array}}</h3>
<table>
  <thead>
    <tr>
      <th v-for="col in gridColumns"
      @click="sortBy(col)"
      :class="{active: sortKey == col}">
        {{col}}
      </th>
      <th>amount_holding</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="result in results">
      <td v-for="col in gridColumns">
        {{result[col]}}
      </td>
      <!--<a :href="crypto.link">{{crypto.name}}</a>-->
      <!--{{result.last_updated}}-->
      <!--<input v-model.lazy="result['amount']"-->
      <input v-model.number.lazy="result['holding']"
      @change="calcHoldings(result['price_usd'], result['holding'], result)"
      >
        <!-- button class="btn btn-primary" @click="submit(result)">Submit</button -->
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
import db from './data/data.json'

export default {
  name: 'app',
  data () {
    return {
      results: [],
      array: [],
      msg: 'Welcome to Your Crypto Watch',
      gridColumns: ['rank', 'name', 'price_usd', 'percent_change_1h', 'percent_change_24h', 'symbol', 'amount_usd'],
    }
  },
  methods:{
    fetchCryptos() {
      fetch('https://api.coinmarketcap.com/v1/ticker/')
        .then(stream => stream.json())
        .then(data => this.results = data)
        .then(data => this.fetchAmounts())
        .catch(error => console.error(error))
    },
    fetchAmounts(){
      //console.log(this.results.find(item => item.symbol === result['symbol'])['symbol']);
      this.results.forEach(function (result){
        this.$http.get('https://crypto-watch-b505f.firebaseio.com/' + result['symbol'] + '/data.json')
            .then(response => {
              return response.json(); 
              //must return resonse data since it is async and returns function, can use another then to get data
            })
            .then(data => {
                this.array = this.results.find(item => item.symbol === result['symbol'])['holding'] = data['holding'];
                this.results.find(item => item.symbol === result['symbol'])['amount_usd'] = (data['holding'] * data['price_usd']).toFixed(2);
            }
            );              
      }, this)
      //extra this is for scope
    },
    inAmountUSD(price_usd, amount, result) {
     result['amount_usd'] = (price_usd * amount).toFixed(2);
    },
    submit(result){
      console.log(result)
      this.$http.put('https://crypto-watch-b505f.firebaseio.com/' + result['symbol'] + '/data.json/', result)
          .then(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
    },
    calcHoldings(price_usd, amount, result){
      this.inAmountUSD(price_usd, amount, result);
      this.submit(result);
    },
    sortBy(col){
      console.log(col)
    }
  },
  created () {
    this.fetchCryptos();
  },

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
