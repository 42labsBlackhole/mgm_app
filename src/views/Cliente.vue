<template>
  <div id="page">
	  <div>
      <Tutorial
        v-if="showTutorial"
        id="tutorial"
        @closeTutorial="toggleTutorial()"/>
	  </div>
    <div id="client">
    <ClienteNav
      :id="id"
      :username="username"
      :coin="coin"
      :converts="converts"
      :bell="bell"
      :disableMenu="disableMenu"
      :disableNoti="disableNoti"
      :lastConverted="lastConverted"
      @goHome="selectTab('Share')"
      @goToSoon="selectTab('Stats')"
      @goToVouchers="selectTab('Vouchers')"
      @switchMenu="switchMenu()"
      @switchNoti="switchNoti()"
      @resetBell="resetBell()"
      @openTutorial="toggleTutorial()"
      @click.self.prevent="disableTooltip()"
      :prize="prize"
    />
    <div @click="disableTooltip()">
      <div id="menu">
        <div
          class="tab"
          :class="{ tabShare: tabSelected === 'Share' }"
          @click="selectTab('Share')"
        >
          <img class="icons" src="../assets/share.png" />
          COMPARTILHE
        </div>
        <div
          class="tab"
          :class="{ tabLoja: tabSelected === 'Loja' }"
          @click="selectTab('Loja')"
        >
          <img class="icons" src="../assets/buy.png" />
          RESGATE
        </div>
      </div>
      <ClienteShare
        v-if="tabSelected === 'Share'"
        :username="username"
        :shortUrl="shortUrl"
      />
      <ClienteLoja
        v-if="tabSelected === 'Loja'"
        :products="products"
        :coin="coin"
        :id="id"
        :prize="prize"
        :cardControl="cardControl"
        @prizeClaimed="reclaimPrize()"
      />
      <Statistics v-if="tabSelected === 'Stats'" :convertedStats="convertedStats" :prize="prize"/>
      <Vouchers 
			v-if="tabSelected === 'Vouchers'" 
			:tabSelected="tabSelected"
			/>
      <div v-if="tabSelected === 'Share'" id="description">
        <div class="box_description">
          <div class="imgDescription">
            <img src="../assets/callpeople.png" width="400" />
          </div>
          <div class="descriptionText">
            <p>Compartilhe com seus amigos</p>
          </div>
        </div>
        <div class="box_description">
          <div class="imgDescription">
            <img src="../assets/wincoin.png" width="400" />
          </div>
          <div class="descriptionText">
            <p>Ganhe moedas</p>
          </div>
        </div>
        <div class="box_description">
          <div class="imgDescription">
            <img src="../assets/winprize.png" width="400" />
          </div>
          <div class="descriptionText">
            <p>Troque moedas por</p>
            <p>recompensas exclusivas</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClienteNav from "../components/ClienteNav.vue";
import ClienteLoja from "../components/ClienteLoja.vue";
import ClienteShare from "../components/ClienteShare.vue";
import Vouchers from "../components/Vouchers.vue";
import Statistics from "../components/Statistics.vue";
import Footer from "../components/Footer.vue";
import router from "../router";
import Tutorial from "../components/Tutorial.vue";

export default {
  name: "Cliente",
  data() {
    return {
      username: "",
      lastConverted: "",
      coin: 0,
      longUrl: "",
      bell: 0,
      converts: 0,
      prize: false,
      msg: "",
      products: [],
      shortUrl: {}, //Fazer array pra link diferente em cada caso
      code: "",
      id: 0,
      cardControl: [],
      disableMenu: false,
      disableNoti: false,
      tabSelected: "Share",
	    showTutorial: false,
      skipTutorial: false,
      convertedStats: {},
    };
  },
  components: { ClienteNav, ClienteLoja, ClienteShare, Footer, Statistics, Vouchers, Tutorial },
  beforeCreate() {
    if (this.$cookies.get("id") !== this.$route.params.id) {
      router.push({ name: "Login" });
    }
  },
  beforeMount() {
    this.id = this.$route.params.id;
    axios
      .get(process.env.VUE_APP_API_IP + "/usersById/" + this.id)
      .then((response) => {
        if (response.data) {
          this.username =
            response.data.username[0].toUpperCase() +
            response.data.username.slice(1).split(" ")[0];
          this.coin = response.data.wallet;
          this.longUrl =
            process.env.VUE_APP_RECOMM_IP +
            "/indicado?code=" +
            response.data.code +
            "&from=";
          this.bell = response.data.notification;
          this.prize = response.data.first_prize;
          this.showTutorial = response.data.show_tutorial;
          this.skipTutorial = response.data.show_tutorial;
          this.converts = response.data.converted.total;
          this.lastConverted = response.data.converted.nameLastConverted;
          this.convertedStats = response.data.converted;
          this.getShortURL("Link", process.env.VUE_APP_BITLY_TOKEN3);
          this.getShortURL("Whatsapp", process.env.VUE_APP_BITLY_TOKEN4);
          this.getShortURL("Twitter", process.env.VUE_APP_BITLY_TOKEN5);
        }
      });
    axios
      .get(process.env.VUE_APP_MOCK_API_IP + "/product?sortBy=price")
      .then((response) => {
        this.products = response.data;
        this.products.forEach((item) => {
          this.cardControl.push({
            id: item.id,
            claimId: true,
            fillDiv: false,
            fillDivFail: false,
            voucher: "",
            button: "Copiar",
          });
        });
      });
  },
  methods: {
    toggleTutorial() {
      if (this.skipTutorial)
        axios
          .put(process.env.VUE_APP_API_IP + "/users/" + this.id,{
            show_tutorial: false
          })
      this.showTutorial = !this.showTutorial;
    },
    getShortURL(socialMedia, token) {
      axios
        .post(
          "https://api-ssl.bitly.com/v4/shorten",
          {
            long_url: this.longUrl + socialMedia,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => (this.shortUrl[socialMedia] = response.data.link));
    },
    disableTooltip() {
      if (this.disableMenu) this.disableMenu = false;
      if (this.disableNoti) this.disableNoti = false;
    },
    resetBell() {
      this.bell = 0;
    },
    selectTab(tab) {
      this.tabSelected = tab;
			if (this.tabSelected != 'Loja')
				{
					this.cardControl.forEach((item) => {
						item.fillDiv = false;
					})
				}
    },
    updateData() {
      this.polling = setInterval(() => {
        axios
          .get(process.env.VUE_APP_API_IP + "/usersById/" + this.id)
          .then((response) => {
            if (response.data) {
              this.coin = response.data.wallet;
              this.bell = response.data.notification;
              this.converts = response.data.converted.total;
              this.lastConverted = response.data.converted.nameLastConverted;
              this.convertedStats = response.data.converted;
            }
          });
      }, 5000);
    },
    reclaimPrize() {
      this.prize = false;
    },
    switchMenu() {
      this.disableMenu = !this.disableMenu;
      if (this.disableNoti) this.disableNoti = false;
    },
    switchNoti() {
      this.disableNoti = !this.disableNoti;
      if (this.disableMenu) this.disableMenu = false;
    },
  },
  mounted() {
    this.updateData();
  },
};
</script>

<style>
#page {
  height: 100%;
}
#tutorial {
  position: fixed;
  background-color: rgba(0,0,0,0.9);
  width: 100%;
  height: 100%;
  z-index: 10;
  padding-top: 5%;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
}

#client {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#menu {
  display: flex;
  position: fixed;
  top: 0%;
  margin-top: 50px;
  z-index: 1;
  width: 100%;
  height: 40px;
}

.tab {
  font-weight: 400;
  font-size: 21px;
  display: flex;
  background-color: black;
  border-bottom: none;
  color: rgba(255, 255, 255, 0.6);
  width: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top: solid 2px #f2f2f2;
}
.tabShare {
  border: solid 2px #a3d3f7;
  box-shadow: 0 0 1em #1179de;
  color: white;
}
.tabLoja {
  border-bottom: solid 2px black;
  border: solid 2px #ff79fe;
  box-shadow: 0 0 1em #ff11fd;
  color: white;
}
#description {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 40px 0 50px 0;
  justify-content: space-evenly;
  flex-wrap: wrap;
  height: auto;
}

.box_description {
  margin: 15px 20px;
  width: 320px;
  height: 310px;
}

.imgDescription {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}

.descriptionText {
  font-weight: 300;
  text-align: center;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 20%;
}

@media screen and (max-width: 480px) {
  .tab {
    font-size: 18px;
  }
}
</style>