
<template>
  <button type="button" @click="search">Список коллекции</button>
  <button type="button" @click="searchProduct">Продукты</button>
  <div id="home"></div>
</template>

<script>
export default {
  data() {
    return {
      collections: [],
    }
  },
  methods: {
  search() {
    const url = "https://api.dev.zarbo.works/api/v1/collections/";
    this.$axios
      .get(url, {
        headers: {
          Authorization: "Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6"
        }
      })
        .then(response => {
          let idCounter = 1
          for (let i = 0; i <= response.data.length-1; i++) {
              this.collections = response.data[i]
                console.log(this.collections);
              this.keyColl = this.collections.key
              this.collection = response.data.map(item => item.key); 
              
              let key = document.createElement("button")
              key.innerText = this.keyColl;
              key.setAttribute("id", "my-button_" + idCounter);
              let homeElement = document.getElementById("home");
              homeElement.appendChild(key)   
              idCounter++;
            }
          //console.log(this.collections);

//---------------------------------------------------------------------
          
//---------------------------------------------------------------------
        })
        .catch(error => {
          console.error(error);
        });
    },
    searchProduct() {
      const url = `https://api.dev.zarbo.works/api/v1/products/?collections=testahqoe`;
      this.$axios.get(url, {
    headers: {
      Authorization: 'Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6'
    }
  })
    .then(response => {
      document.querySelector('#my-button_2').onclick = () =>{
        console.log(response.data)
      }
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