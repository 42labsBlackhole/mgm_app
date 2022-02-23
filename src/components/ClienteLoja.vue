<template>
  <div id="shop-space">
    <div id="welcome_text">Confira nossas recompensas exclusivas</div>
    <main>
      <div id="shop">
        <div class="card" v-if="prize">
          <div>
            <h2>Pacote de 5 moedas</h2>
            <p>Resgate grátis seu primeiro prêmio</p>
          </div>
          <div
            class="override card_confirm content-center"
            :class="{ card_confirm_animation: fillDiv }"
          >
            <h3>Resgatado</h3>
            <h3>com</h3>
            <h3>Sucesso !</h3>
          </div>
          <div>
            <span>
              <h3>0</h3>
              <img class="icons" alt="icone moeda" src="../assets/wallet.png" />
            </span>
            <div v-if="claimPr">
              <button class="button" @click="controlPrize('claimId')">
                Resgatar
              </button>
            </div>
            <div class="confirm" v-else>
              <p>Tem Certeza?</p>
              <div>
                <button
                  class="button buttonCancel"
                  @click="controlPrize('fillDiv', false)"
                >
                  Não
                </button>
                <button
                  class="button buttonConfirm"
                  @click="controlPrize('fillDiv', true)"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-for="product in products" :key="product.id">
          <div>
			  <div id="title_product">
            	  <h2>{{ product.name }}</h2>
			  </div>
			<div id="descrip_product">
				<p>{{ product.about }}</p>
			</div>
          </div>
		  <div>
			<img class="logos" :src="require(`../assets/logos/${product.partner}.png`)">
		  </div>
          <div
            class="override card_confirm"
            :class="{
              card_confirm_animation: getControlCard(product.id, 'fillDiv'),
            }"
          >
            <button
              class="close"
              @click="setContrlCard(product.id, 'fillDiv', false)"
            >
              X
            </button>
            <h2>Resgatado com Sucesso!</h2>
            <div>
              <h2 class="voucherMsg">Seu voucher de resgate é:</h2>
              <h3 class="voucherCard">
                {{ getControlCard(product.id, "voucher") }}
              </h3>
            </div>
            <button
              class="button voucherButtonCopy"
			  :class="{copyButton: getControlCard(product.id, 'button') == 'Copiado!'}"
              @click="copyToClip(product.id)"
            >
              {{ getControlCard(product.id, 'button') }}
            </button>
          </div>
          <div
            class="override card_fail"
            :class="{
              card_fail_animation: getControlCard(product.id, 'fillDivFail'),
            }"
          >
            <h3>Tente</h3>
            <h3>novamente</h3>
            <h3>mais</h3>
            <h3>tarde!</h3>
          </div>
          <div>
            <span>
              <h3>{{ product.price }}</h3>
              <img class="icons" alt="icone moeda" src="../assets/wallet.png" />
            </span>
            <div v-if="getControlCard(product.id, 'claimId')">
              <button
                v-if="coin >= product.price"
                class="button"
                :class="{notHover: getControlCard(product.id, 'fillDiv')}"
                @click="setContrlCard(product.id, 'claimId', false)"
              >
                Resgatar
              </button>
              <button v-else class="button inactive">
                Moedas Insuficientes
              </button>
            </div>
            <div class="confirm" v-else>
              <p>Tem Certeza?</p>
              <div>
                <button
                  class="button buttonCancel"
                  @click="decisionProduct(false, product.id, product.price, product.name)"
                >
                  Não
                </button>
                <button
                  class="button buttonConfirm"
                  @click="decisionProduct(true, product.id, product.price, product.name)"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ClienteLoja",
  data() {
    return {
      claimPr: true,
      fillDiv: false,
    };
  },
  props: ["products", "coin", "id", "prize", "cardControl"],
  methods: {
    controlPrize(element, decision = false) {
      if (element == "claimId") {
        this.claimPr = false;
      } else {
        if (decision) {
          this.fillDiv = true;
          axios.get(process.env.VUE_APP_API_IP + "/reclaim/" + this.id);
          setTimeout(() => (this.fillDiv = false), 2000);
          setTimeout(() => this.$emit("prizeClaimed"), 2350);
        }
        this.claimPr = true;
      }
    },
    getControlCard(productId, element) {
      var prod = this.cardControl.filter((item) => item.id == productId);
      return prod[0][element];
    },
    setContrlCard(productId, element, value, voucher = "") {
      this.cardControl.forEach((item) => {
        if (item.id == productId) {
          item[element] = value;
          if (value) {
            if (element == "fillDiv") {
              item.voucher = voucher;
            }
            if (element == "fillDivFail") {
              setTimeout(() => (item.fillDivFail = false), 2000);
            }
          }
        }
      });
    },
    decisionProduct(decision, productId, productPrice, productName) {
      if (decision) {
        axios
          .post(process.env.VUE_APP_API_IP + "/buy/" + this.id, {
            price: productPrice, name: productName  
          })
          .then((res) => {
            this.setContrlCard(productId, "fillDiv", true, res.data.voucher);
          })
          .catch(() => {
            this.setContrlCard(productId, "fillDivFail", true);
          });
      }
      this.setContrlCard(productId, "claimId", true);
    },
    copyToClip(productId) {
      navigator.clipboard.writeText(this.getControlCard(productId, "voucher"))
      this.setContrlCard(productId, "button", "Copiado!")
      setTimeout(() => this.setContrlCard(productId, "button", "Copiar"), 2000)
    },
  },
};
</script>

<style scoped>
#shop-space {
  margin-top:115px;
}

#welcome_text {
  margin: 0px 0px 0px 10%;
  height: auto;
  text-align: left;
  font-weight: 300;
  font-size: 38px;
  line-height: 35px;
}

.confirm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.confirm div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.confirm p {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 0px 20px 0px;
}

.confirm button {
  margin: 0px 5px 30px 5px;
}
.buttonConfirm {
  width: 130px;
}

.buttonCancel {
  background-color: #e3e3e3;
  color: #cb2166;
  width: 90px;
}

.inactive {
  z-index: -1;
  background-color: #e9a5c0;
}

.inactive:hover {
  opacity: 0.5;
  cursor: default;
}

.inactive:active {
  transform: translateY(0);
}

.override {
  display: flex;
  flex-direction: column;
  color: white;
  width: 283px;
  height: 330px;
  border: 1px solid #ccc;
  border-radius: 0.25px;
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.override h3 {
  font-weight: 500;
}

.card_confirm {
  background: linear-gradient(to top, #68019a 50%, #fff 50%);
  background-size: 100% 200%;
  justify-content: space-between;
  background-position: top left;
  transition: all 0.5s ease-in-out;
}

.card_confirm_animation {
  border: 2px solid #68019a;
  background-position: bottom left;
  z-index: 0;
  opacity: 1;
}

.card_fail {
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top, #888888 50%, #fff 50%);
  background-size: 100% 200%;
  background-position: top left;
  transition: all 0.5s ease-in-out;
}

.card_fail_animation {
  border: 2px solid #888888;
  background-position: bottom left;
  z-index: 0;
  opacity: 1;
}

.voucherButtonCopy {
  color: #68019a;
  background-color: white;
  transition: background-color 1000ms;
  transition: color 1000ms;
	font-weight: 700;
}
.voucherButtonCopy:hover {
	opacity: 1;
}

.voucherCard {
  margin: 10px 50px 0 50px;
  background-color: white;
  padding: 5px;
  border-radius: 20px;
  text-align: center;
  color: #68019a;
}
.voucherMsg {
  margin: 0px 28.3px 0 28.3px;
}

.content-center {
  align-items: center;
  justify-content: center;
}
.close {
  margin: 0px;
  width: 30px;
  height: 30px;
  right: 0;
  position: absolute;
  font-size: 25px;
  font-weight: 400;
  cursor: pointer;
  color: #ffffff;
  background: transparent;
}

.copyButton {
	background: rgba(255, 255, 255, 0.486);
	color: white;
	transition: background-color 500ms;
	transition: color 500ms;
}

#descrip_product{
	height: 41px;
}

#title_product{
	height: 48px;
}
.notHover {
  pointer-events: none;
}
</style>