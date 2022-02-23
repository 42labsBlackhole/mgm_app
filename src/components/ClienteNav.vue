<template>
  <header>
    <div id="left" class="header-container" >
      <img
        class="icons"
        id="vivinho"
        alt="vivinho dando oi"
        src="../assets/vivinho.png"
        @click="goHome()"
      />
      <h3 id="username">Olá, {{ username }}</h3>
    </div>
    <div id="right" class="header-container">
      <h3>{{ coin }}</h3>
      <img class="icons" alt="icone moeda" src="../assets/wallet.png" />
      <bell
        class="icons"
        :id="id"
        :username="username"
        :bell="bell"
        :converts="converts"
		    :disableNoti="disableNoti"
		    :lastConverted="lastConverted"
        :prize="prize"
      />
      <button id="burgerMenu" @click="switchMenu()">
        <img class="icons" alt="botão sair" src="../assets/menu_purple.png" />
      </button>
      <Menu v-if="this.disableMenu"/>
    </div>
  </header>
</template>

<script>
import Bell from "./Bell.vue";
import axios from "axios";
import Menu from "./Menu.vue";

export default {
  name: "ClienteNav",
  components: { Bell, Menu },
  props: ["id", "username", "coin", "bell", "converts", "disableMenu", "disableNoti", "lastConverted", "prize"],
  methods: {
    goHome() {
      this.$emit("goHome");
    },
    toggleBell() {
      axios.put(process.env.VUE_APP_API_IP + "/users/" + this.id, {
        notification: 0,
      });
    },
    switchMenu() {
		this.$emit("switchMenu");
    }
  },
};
</script>

<style scoped>
#vivinho {
  cursor: pointer;
}
#burger_menu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  color: #68019a;
  border-radius: 5px;
}

@media screen and (max-width: 480px) {
  #vivinho {
    display: none;
  }
  #username {
    font-size: 20px;
    margin-left: 0px;
  }
}

#exit:hover {
  background-color: #e2e2e2;
  cursor: pointer;
}

#left {
  position: absolute;
  left: 5%;
}

#right {
  position: absolute;
  right: 5%;
}

#burgerMenu {
  cursor: pointer;
}

header{
	z-index: 2;
}

</style>
