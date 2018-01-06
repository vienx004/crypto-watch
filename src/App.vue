<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <hr>
<table>
  <thead>
    <tr>
      <th v-for="col in gridColumns">
        {{col}}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="result in results">
      <td v-for="col in gridColumns">
        {{result[col]}}
      </td>
      <!--<a :href="crypto.link">{{crypto.name}}</a>-->
      {{result.last_updated}}
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      results: [],
      msg: 'Welcome to Your Crypto Watch',
      gridColumns: ['rank', 'name', 'price_usd', 'percent_change_1h', 'percent_change_24h', 'symbol'],
    }
  },
  methods:{
    fetchCryptos() {
      fetch('https://api.coinmarketcap.com/v1/ticker/')
        .then(stream => stream.json())
        .then(data => this.results = data)
        .catch(error => console.error(error))
    }
  },
  mounted(){
    this.fetchCryptos()
  }
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
