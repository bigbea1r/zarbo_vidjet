
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
      google: [],
      selectedCollection: "",
    }
  },
methods: {
  search() {
    const url = `https://api.dev.zarbo.works/api/v1/collections/`;
    this.$axios
      .get(url, {
        headers: {
          Authorization: "Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6"
        }
      })
      .then(response => {
        function buttonClick(key) {
          //selectedCollection = key;
        console.log("Нажата кнопка: " + key);
      }
        let idCounter = 1;
        for (let i = 0; i <= response.data.length - 1; i++) {
          this.collections = response.data[i];
          console.log(this.collections);
          this.keyColl = this.collections.key;
          this.collection = response.data.map(item => item.key);

          this.nameKey = this.collections.name;
          let key = document.createElement("button");
          key.innerText = this.nameKey;
          key.setAttribute("id", "my-button_" + idCounter);
          key.addEventListener("click", function() {
            buttonClick(response.data[i].key);
          });
          let homeElement = document.getElementById("home");
          homeElement.appendChild(key);
          idCounter++;
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  searchProduct() {
    let url = `https://api.dev.zarbo.works/api/v1/products/?collections=${this.selectedCollection}`;
    this.$axios
      .get(url, {
        headers: {
          Authorization: 'Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6'
        }
      })
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
<!-- export default {
  data() {
    return {
      collections: [],
      google: [],
    }
  },
  methods: {
    searchProduct() {
  const url = `https://api.dev.zarbo.works/api/v1/collections/`;
  const productUrl = "https://api.dev.zarbo.works/api/v1/products/?collections=${selectedCollection}";

  const searchCollections = async () => {
    try {
      const response = await this.$axios.get(url, {
        headers: {
          Authorization: "Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6"
        }
      });

      let selectedCollection = "";

      function buttonClick(key) {
        console.log("Нажата кнопка: " + key);
        selectedCollection = key;
      }

      let idCounter = 1;

      for (let i = 0; i <= response.data.length - 1; i++) {
        this.collections = response.data[i];
        console.log(this.collections);
        this.keyColl = this.collections.key;
        this.collection = response.data.map(item => item.key);

        this.nameKey = this.collections.name;
        let key = document.createElement("button");
        key.innerText = this.nameKey;
        key.setAttribute("id", "my-button_" + idCounter);
        key.addEventListener("click", function() {
          buttonClick(response.data[i].key);
        });
        let homeElement = document.getElementById("home");
        homeElement.appendChild(key);
        idCounter++;
      }
      
      await searchProduct(productUrl + selectedCollection);
    } catch (error) {
      console.error(error);
    }
  };

  const searchProduct = async (productUrl) => {
    try {
      const response = await this.$axios.get(productUrl, {
        headers: {
          Authorization: "Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6"
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  searchCollections();
}
  }} -->