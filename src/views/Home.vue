<template>
  <div class="wrapper">
    <div class="wrapperButton">
        <button type="button" @click="search">Список коллекции</button>
        <button type="button" @click="searchProduct">Продукты</button>
        <button type="button" @click="searchMaterial">Материал</button>
        <button type="button" @click="searchVidjet">Виджет</button>
        <button type="button" @click="createVidjet">Создание виджета</button>
      <div class="createButton">
        <button v-for="item in сollection" id="key" @click="selectCollection(item)">{{ item.name }}</button>
        <button v-for="item in nameProducts" id="product" @click="selectProduct(item)">{{ item.name }}</button> 
        <button v-for="item in nameMaterial" id="material" @click="selectMaterial(item)">{{ item.name }}</button> 
      </div>

    </div>
    <div id="myContainer"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      сollection: [],
      selectedCollection: [],
      nameProducts: [],
      selectedMaterial: [],
      nameMaterial: [],
      selectedVidjet: [],
      selectedUuid: [],
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
      .then((response) => {
        this.selectedCollection = response.data.map(item => item.key);
        console.log(response.data)
         this.сollection = response.data 
         let elem = document.querySelectorAll('#key');
         elem.forEach(elem => {
            elem.style.display  = 'inline';
          });
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
        let elem = document.querySelectorAll('#key');
         elem.forEach(elem => {
            elem.style.display  = 'none ';
          });
          this.nameProducts = response.data.results
          this.selectedUuid = response.data.results.map(item => item.uuid);
          console.log(this.selectedUuid)
          this.selectedMaterial = response.data.results.map(item => item.id);
          console.log(this.selectedMaterial)
         console.log(response.data.results)
        // let buttonClickProduct = (id) =>{
        //     this.selectedUuid = response.data.results[i].uuid
        //     this.selectedMaterial = id;
        //     console.log("Нажата вторая кнопка: " + id);
        // }
        // for (let i = 0; i <= response.data.results.length - 1; i++) {
        //   this.materials = response.data.results[i]
        //     buttonClickProduct(response.data.results[i].id);
        // }
        //console.log(this.selectedCollection);
        let item = document.querySelectorAll('#product');
         item.forEach(item => {
            item.style.display  = 'inline';
          });


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
        let item = document.querySelectorAll('#product');
         item.forEach(item => {
            item.style.display  = 'none ';
          });

        console.log(response.data.results)
        this.nameMaterial = response.data.results.map(item => item.quality)
          this.selectedVidjet = response.data.results.map(item => item.product_id);
          console.log(this.nameMaterial)
         console.log(this.selectedVidjet)

        console.log(this.selectedUuid)
      
      })
      .catch(error => {
        console.error(error);
      });
  },
  selectCollection (item) {
      this.selectedCollection = item.key;
      console.log('Нажата первая кнопка:', item.key);
  },
  selectProduct (id) {
    this.selectedMaterial = id.id
    console.log("Нажата вторая кнопка: " + id.id);
  },
  selectMaterial(id) {
    this.selectedVidjet = id.id;
    console.log("Нажата третья кнопка: " + id.id);
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
        this.materials = this.widget.results
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
        console.log(this.widget);
      }
      console.log(this.selectedCollection)
      console.log(this.selectedMaterial)
      console.log(this.selectedVidjet)
      console.log(this.selectedUuid)

    })
    .catch(error => {
      console.error(error);
    });
  },
  createVidjet() {

    
  let iframeElement = document.createElement('iframe');
  iframeElement.src = `https://embed.dev.zarbo.works/10044810-b8c8-482f-a3e5-6e3b1728aebf/1693/?materialCode=ыыва`; //${this.selectedUuid} 8b1654f6-da14-4f0b-a609-56b70f3325e2 
  iframeElement.allowFullscreen = true;
  iframeElement.allow = 'camera; autoplay; xr-spatial-tracking';
  //iframeElement.frameBorder = 0;
  console.log(this.selectedUuid)
  // Вставьте iframe в нужное место в коде
  
  // Например, чтобы вставить iframe внутрь элемента с id="myContainer":
  let containerElement = document.getElementById('myContainer');
  containerElement.appendChild(iframeElement);
}
}
}
</script>

<style>
#myContainer{
  width: 70%;
  height: 100%;
}
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapperButton{
  width: 30%;
  height: 100%;
}
.createButton button{
  background-color: aliceblue;
  color: black;
  display: inline;
  margin: 5px;
  padding: 3px 5px;
}
</style>