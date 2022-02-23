<template>
  <div id="share-space">
    <div id="short-link">{{ shortUrl['Link'] }}</div>
    <div id="share-items">
      <tooltip>
        <div class="share-link" @click="copyToClip()"></div>
      </tooltip>
      <div class="share-link" @click="twitter()"></div>
      <div class="share-link" @click="whatsapp()"></div>
    </div>
  </div>
</template>

<script>
import Tooltip from '../components/Tooltip.vue';

export default {
  name: "ClienteShare",
  props: ['username', 'shortUrl'],
	components: {Tooltip},
  methods: {
    copyToClip() {
      navigator.clipboard.writeText(this.shortUrl['Link']);
    },
    twitter() {
      window.open('https://twitter.com/share?ref_src=twsrc%5Etfw&url='
        + "Utilize meu link de indicação para ganhar benefícios na sua compra Vivo! "
        + this.shortUrl['Twitter'])
    },
    whatsapp() {
			let whatsLink = 'https://web.whatsapp.com/send?text='
			if (window.screen.width <= 480)
				whatsLink = 'whatsapp://send/?text='
			window.open(whatsLink
				+ "Parabéns! " + this.username
				+ " te convidou para ter acesso a planos bonificados da Vivo! confira: "
				+ this.shortUrl['Whatsapp'])
		}
	}
}
</script>

<style scoped>
#share-space {
  margin-top: 65px;
  padding-right: 3%;
  background-color: black;
  display: flex;
  justify-content: center;

  background-origin: content-box;
  background-repeat: no-repeat;
  background-position: center center;
}

@media screen and (min-width: 801px) {
  #share-space {
    height: 550px;
    background-image: url("../assets/artetop.png");
  }

  #short-link {
    width: 100px;
    height: 30px;
    position: absolute;
    display: flex;
    align-items: center;
    margin-top: 364px;
    margin-left: -540px;
    font-weight: 500;

    color: white;
  }

  #share-items {
    width: 100px;
    height: 30px;
    margin-top: 368px;
    display: flex;
    justify-content: space-between;
    margin-left: -162px;
  }

  .share-link {
    height: 28px;
    width: 28px;
  }
}

@media screen and (max-width: 800px) {
  #share-space {
    height: 500px;
    background-image: url("../assets/arte_mobile.png");
  }
  #short-link {
    display: none;
  }

  #share-items {
    width: 155px;
    height: 40px;
    margin-top: 362px;
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
  }
  .share-link {
    height: 40px;
    width: 40px;
  }
}
.share-link:hover {
  cursor: pointer;
}

</style>
