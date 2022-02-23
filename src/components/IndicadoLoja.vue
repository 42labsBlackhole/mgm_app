<template>
  <div>
    <div id="title">
      <h3 tabindex="2" role="text">Confira estas ofertas imperdíveis da Vivo</h3>
    </div>
    <main>
      <div id="shop">
        <div class="card" v-for="product in products" :key="product.id">
          <div>
            <h2 tabindex="3" role="textbox">{{ product.name }}</h2>
            <p tabindex="3" role="textbox">{{ product.about }}</p>
          </div>
          <div>
            <span v-if="parseInt(product.price) > 98.00">
              <h4 tabindex="3" role="textbox">Cashback 10%</h4>
            </span>
            <span>
              <h6 aria-hidden="true">
                R$ {{ ( parseInt(product.price) + parseInt(product.price) / 10 ).toFixed(2) }}/mês
              </h6>
            </span>
            <span>
              <h3 tabindex="3" role="textbox">R$ {{ product.price }}/mês</h3>
            </span>
            <button tabindex="3" role="button" class="button" @click="toForm">Assine já</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "IndicadoLoja",
  props: ["products", "code", "from"],
  methods: {
    toForm() {
      router.push({ name: "ExternalForm", params: { code: this.code, from:this.from } });
    },
  },
};
</script>

<style scoped>
#title {
  margin-left: 50px;
  margin-right: 25px;
  margin-top: 75px;
}

#shop {
  margin-bottom: 45px;
}

h2 {
  font-size: 50px;
  font-weight: 700;
}

h4 {
  background-color: #660099;
  color: white;
  border-radius: 5px;
  padding: 3px 10px
}

.card div h3 {
  color: #660099;
  font-weight: 500;
}
</style>