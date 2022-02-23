<template>
  <div>
    <Splide :options="options">
      <SplideSlide>
        <div class="mode">
          <div class="box_tuto">
            <p>Compartilhe o seu link com seus amigos pelo Whatsapp, Twitter, ou apenas copiando o link!</p>
            <div class="image_tuto">
              <img src="../assets/tutorial_1.gif" />
            </div>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="mode">
          <div class="box_tuto">
            <p>Você já pode visitar a loja e resgatar seu primeiro prêmio!</p>
            <div class="image_tuto">
              <img src="../assets/tutorial_2.gif" />
            </div>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="mode">
          <div class="box_tuto">
            <p>Utilize as suas moedas para adquirir um Voucher exclusivo!</p>
            <div class="image_tuto">
              <img src="../assets/tutorial_3.gif" />
            </div>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="mode">
          <div class="box_tuto">
            <p>Consulte seus Vouchers utilizando o menu na direita superior.</p>
            <div class="image_tuto">
              <img src="../assets/tutorial_4.gif" />
            </div>
          </div>
        </div>
      </SplideSlide>
    </Splide>
    <div class="closeDiv">
      <button class="closeButton" @click="closeButton">Pular tutorial</button>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default {
  name: "Tutorial",
  components: {
    Splide,
    SplideSlide,
  },
  data() {
      return {
        options: {
          rewind : true,
          gap    : '1rem',
        },
      }
  },
  methods: {
    closeButton() {
      this.$emit('closeTutorial');
    }
  }
};
</script>

<style scoped>
.closeButton {
  width: 130px;
  height: 40px;
  font-size: 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);
}
.closeButton:hover {
  cursor: pointer;
}
.center {
  padding-left: 25%;
}
.mode {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box_tuto {
  width: 40%;
  height: 90%;
  padding: 0px 40px;
  color:black;
  background-color: #fffffff0;
  display: flex;
  border-radius: 10px;
  /* padding: 10px; */
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

p {
  text-align: center;
  font-size: 24px;
  padding: 10px;
  line-height: 23.89333px;
  font-weight: 300;

}

.image_tuto {
  display: flex;
  justify-content: center;
}
.image_tuto img {
  width: 100%;
  border: solid 1px black;
  border-radius: 10px
}
.closeDiv {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box_tuto p{
  width: 100%;
}

@media screen and (max-width: 800px) {
  .box_tuto {
    width: 90%;
    height: 75%;
    padding: 0 2%;
  }
}
</style>