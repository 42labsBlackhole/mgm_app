<template>
  <div>
    <IndicadoNav :username='username'/>
    <IndicadoLoja :products='products' :code='code' :from='from'/>
	<Footer/>
  </div>
</template>

<script>
import axios from 'axios';
import IndicadoNav from '../components/IndicadoNav.vue';
import IndicadoLoja from '../components/IndicadoLoja.vue';
import Footer from "../components/Footer.vue";

export default {
  name: "Indicado",
  data() {
    return {
      products: [],
      username: "",
      from: "",
      code: 0,
    }
  },
  components: { IndicadoNav, IndicadoLoja, Footer },
  mounted() {
    //Ideia do rafa do click, esquece não
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.code = urlParams.get('code')
    this.from = urlParams.get('from')
    axios
      .get(process.env.VUE_APP_MOCK_API_IP + '/vivo_store?sortBy=price')
      .then(response => {
        this.products = response.data;
      })
    axios
      .get(process.env.VUE_APP_API_IP + '/usersCode/' + this.code)
      .then(response => {
        if (response.data) {
          this.username = response.data.username[0].toUpperCase()
            + response.data.username.slice(1);
        }
      })
  }
};
</script>