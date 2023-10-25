<template>
  <button type="button" @click="search">Найти</button>
  <button type="button" @click="searchProduct">Продукты</button>
  <div id="home"></div>
</template>

<script>
export default {
  data() {
    return {
      searchResults: [],
      collections: '',
    }
  },
methods: {
    search() {
      const url = `https://api.dev.zarbo.works/api/v1/collections/`
      this.$axios.get(url, {
          headers: {
            Authorization: 'Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6'
          }
        })
        .then(response => {
          for (let i = 0; i <= response.data.length-1; i++) {
              this.searchResults = response.data[i]
                console.log(this.searchResults);
              this.keyColl = this.searchResults.key
                console.log(this.keyColl)
//---------------------------------------------------------------------
              let key = document.createElement("p")
              key.innerText = this.keyColl;
              let homeElement = document.getElementById("home");
              homeElement.appendChild(key)
//---------------------------------------------------------------------
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    searchProduct() {
      const url = `https://api.dev.zarbo.works/api/v1/products/?search=%7B%7Bsku%7D)?collections={{testirovanie-vidzheta}}`;
      this.$axios.get(url, {
    headers: {
      Authorization: 'Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6'
    }
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
  }
}
</script>

<style>
#home {
  color: red;
  margin: 15px;
}
</style>