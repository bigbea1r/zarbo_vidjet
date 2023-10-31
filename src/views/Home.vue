
<template>
   <div id="myContainer"></div>
  <button type="button" @click="search">Список коллекции</button>
  <button type="button" @click="searchProduct">Продукты</button>
  <button type="button" @click="searchMaterial">Материал</button>
  <button type="button" @click="searchVidjet">Виджет</button>
  <button type="button" @click="createVidjet">Создание виджета</button>
  
 <div class="wrapperButton">
  <div id="key"></div>
  <div id="product"></div>
  <div id="material"></div>
 </div>

</template>


<script>
export default {
  data() {
    return {
      //collections: [],
      selectedCollection: "",
      selectedMaterial: "",
      selectedVidjet: "",
      selectedUuid: [],
      google: [],
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
        let self = this;
        function buttonClick(key) {
          self.selectedCollection = key;
          console.log("Нажата первая кнопка: " + key);
        }
        let idCounter = 1;
        for (let i = 0; i <= response.data.length - 1; i++) {
          this.collections = response.data[i];
          //console.log(this.collections);
          // this.collection = response.data.map(item => item.key);
          // console.log(this.collection)
          let key = document.createElement("button");
          key.innerText = this.collections.name;
          key.setAttribute("id", "my-button_" + idCounter);
          key.addEventListener("click", function() {
            buttonClick(response.data[i].key);
          });
          let homeElement = document.getElementById("key");
          homeElement.appendChild(key);
          idCounter++;
          //console.log(this.keyColl)
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
      .then(response => {
        let numCounter = 1;
        console.log(response.data.results)
        let self2 = this;
          function buttonClickProduct(id) {
            self2.selectedMaterial = id;
            console.log("Нажата вторая кнопка: " + id);
          }
        for (let i = 0; i <= response.data.results.length - 1; i++) {
          this.materials = response.data.results[i]
          this.selectedUuid = response.data.results
          //console.log(this.selectedUuid)
          //this.selectedUuid
          let mat = document.createElement("button");
          mat.innerText = this.materials.name;
          mat.setAttribute("id", "button_" + numCounter);
          mat.addEventListener("click", function() {
            buttonClickProduct(response.data.results[i].id);
          });
          let homeElement = document.getElementById("product");
          homeElement.appendChild(mat);
          numCounter++;
        }
        console.log(this.selectedUuid)

      })
      .catch(error => {
        console.error(error);
      });
  },
  searchMaterial(){
    let url = `https://api.dev.zarbo.works/api/v1/materials/?product=${this.selectedMaterial}`
    this.$axios
      .get(url, {
        headers: {
          Authorization: 'Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6'
        }
      })
      .then(response => {
        let numCount = 1;
        console.log(response.data.results)
        let self3 = this;
          function buttonClickMaterial(id) {
            self3.selectedVidjet = id;
            console.log("Нажата третья кнопка: " + id);
          }
        for (let i = 0; i <= response.data.results.length - 1; i++) {
          this.materials = response.data.results[i]

          let mat = document.createElement("button");
          mat.innerText = response.data.results[i].quality.name;
          mat.setAttribute("id", "button_" + numCount);
          mat.addEventListener("click", function() {
            buttonClickMaterial(response.data.results[i].product_id);
          });
          let homeElement = document.getElementById("material");
          homeElement.appendChild(mat);
          numCount++;
        }
        console.log(this.selectedMaterial)
      
      })
      .catch(error => {
        console.error(error);
      });
  },
  searchVidjet(){
    let url = `https://api.dev.zarbo.works/api/v1/widgets/?product=${this.selectedMaterial}`
    this.$axios
      .get(url, {
        headers: {
          Authorization: 'Api-Key UURjJ3ez.7inOMuZnHNZyochLX8sapyRuuAsk5gc6'
        }
      })
      .then(response => {
      let numCount = 1;
      //console.log(response.data.results);
      let self3 = this;
      const buttonClickMaterial = (id) => {
        self3.google = id;
        console.log("Нажата четвёртая кнопка: " + id);
       // console.log(this.google);
      }
      for (let i = 0; i <= response.data.results.length - 1; i++) {
        this.widget = response.data;
        this.materials = this.widget.results[i]
        // console.log(this.materials)
       // console.log(response.data)
        let mat = document.createElement("button");
        mat.innerText = response.data.results[i].name;
        mat.setAttribute("id", "button_" + numCount);
        mat.addEventListener("click", function() {
          buttonClickMaterial(this.selectedUuid);
        });
       // console.log(response.data.results[i].product.uuid);
        let homeElement = document.getElementById("material");
        homeElement.appendChild(mat);
        numCount++;
      }
      console.log(this.selectedCollection)
      console.log(this.selectedMaterial)
      console.log(this.selectedVidjet)
      console.log(this.selectedUuid[0].uuid)
      console.log(this.google);
    })
    .catch(error => {
      console.error(error);
    });
  },
  createVidjet() {

    
  let iframeElement = document.createElement('iframe');
  iframeElement.src = `https://api.dev.zarbo.works/${this.selectedUuid[0].uuid}/1608/?materialCode=ыва`; //8b1654f6-da14-4f0b-a609-56b70f3325e2 
  iframeElement.allowFullscreen = true;
  iframeElement.allow = 'camera; autoplay; xr-spatial-tracking';
  //iframeElement.frameBorder = 0;
  console.log(this.selectedUuid)
  console.log(this.google)
  // Вставьте iframe в нужное место в коде
  
  // Например, чтобы вставить iframe внутрь элемента с id="myContainer":
  let containerElement = document.getElementById('myContainer');
  containerElement.appendChild(iframeElement);
}
}
}
</script>

<style>
#key {
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