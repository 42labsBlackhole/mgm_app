<template>
  <div id="stats">
		<div id="tittle">Minhas conversões</div>
    <div id="space" :class="{ noGraphicsSpace: this.convertedStats.total == 0 }">
      <div id="donuts" v-if="this.convertedStats.total != 0">
        <DonutChart :convertedStats="convertedStats" />
      </div>
      <!-- <div id="iDontKnow" v-else>Sem usuários convertidos</div> -->
      <div id="plusInfos" :class="{ noGraphicsInfo: this.convertedStats.total == 0 }">
        <div class="placeInfo" style="border-color: #68019a">
          <div class="txtPlace">
            <p>Pessoas convertidas pelo Link</p>
          </div>
          <div class="placeNumber">
            {{ this.convertedStats.fromLink.length }}
          </div>
        </div>
        <div class="placeInfo" style="border-color: #25d366">
          <div class="txtPlace">
            <p>Pessoas convertidas pelo WhatsApp</p>
          </div>
          <div class="placeNumber">
            {{ this.convertedStats.fromWhatsapp.length }}
          </div>
        </div>
        <div class="placeInfo" style="border-color: #00acee">
          <div class="txtPlace">
            <p>Pessoas convertidas pelo Twitter</p>
          </div>
          <div class="placeNumber">
            {{ this.convertedStats.fromTwitter.length }}
          </div>
        </div>
        <div class="placeInfo">
          <div class="txtPlace">
            <p>Total de pessoas convertidas</p>
          </div>
          <div class="placeNumber">{{ this.convertedStats.total }}</div>
        </div>
        <div class="placeInfo" style="border-color: #da9506">
          <div class="txtPlace">
            <p>Total de moedas ganhas</p>
          </div>
          <div class="placeNumber">{{ moedas }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonutChart from "./DonutChart.vue";

export default {
  name: "Statistics",
  data() {
    return {
      moedas: 0,
    };
  },
  components: {
    DonutChart,
  },
  props: ["convertedStats", "prize"],
  beforeMount() {
    this.moedas = this.convertedStats.total;
    if (this.prize == false) this.moedas += 5;
  },
};
</script>

<style scoped>
#stats{
  height:100%;
}

#tittle{
	text-align: center;
	font-weight: 300;
	font-size: 35px;
	margin-top: 100px;
	width: 100%;
	height: 50px;
}

#iDontKnow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  width: 50%;
  text-align: center;
}

#space {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 20px 0px;
}

.noGraphicsSpace {
  justify-content: center;
}

.noGraphicsInfo {
  align-items: center;
}

#plusInfos {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
}
#donuts {
  width: 60%;
  min-width: 100px;
  height: 72vh;
  max-width: 1000px;
}
p {
  font-size: 14px;
  font-weight: 300;
}

.placeNumber {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}
.txtPlace {
  margin: 5px 0 5px 5px;
}

.placeInfo {
  background-color: #f2f2f2;
  border: 2px solid rgba(168, 168, 168, 0.52);
  border-radius: 5px;
  width: 250px;
  height: 90px;
  margin: 1%;
}

@media screen and (max-width: 710px) {
  #space {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  #donuts {
    height: 35vh;
    width: 500px;
  }
  #plusInfos {
    align-items: center;
  }
  .placeInfo {
    margin: 10px 0px;
  }
}
</style>
