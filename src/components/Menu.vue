<template>
  <div id="boxBurgerMenu">
    <span>Menu</span>
    <div class="menuItens" @click="changeView()">
      <img src="../assets/cups.png" width="20" height="20" />
      <p class="tittleItens">Meus Vouchers</p>
    </div>
    <div class="menuItens" @click="openTutorial()">
      <img src="../assets/tutorial.png" width="20" height="20" />
      <p class="tittleItens">Tutorial</p>
    </div>
    <div class="menuItens" @click="soon()">
      <img src="../assets/statistics.png" width="20" height="20" />
      <p class="tittleItens">Estatísticas</p>
    </div>
    <div class="menuItens" @click="exit()">
      <img src="../assets/sair.png" width="20" height="20" />
      <p class="tittleItens">Sair</p>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Menu",
  methods: {
    openTutorial() {
      this.$parent.$emit("openTutorial");
      this.$parent.$emit("switchMenu");
    },
    exit() {
      this.$cookies.remove("id");
      router.push({ name: "Login" });
    },
	  soon() {
		  this.$parent.$emit("goToSoon")
		  this.$parent.$emit("switchMenu")
	  },
	  changeView() {
		  this.$parent.$emit("goToVouchers")
		  this.$parent.$emit("switchMenu")
	  }
  },
};
</script>

<style scoped>
#boxBurgerMenu {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 3;
  width: 300px;
  top: 100%;
  right: 0%;
  border: 2px solid #4e4e4e;
  background-color: #f2f2f2;
  border-radius: 5px;
}

span {
  top: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(95, 93, 95, 0.63);
  color: #68019a;
  font-weight: 500;
  padding: 8px;
  font-size: 20px;
  background-color: #e2e2e29d;
}

.menuItens {
  cursor: pointer;
  display: flex;
  height: 50px;
  align-items: center;
  padding-left: 15px;
}

.menuItens:hover {
  background-color: #9493934d;
}

.tittleItens {
  margin-left: 15px;
  font-weight: 500;
  font-size: 17px;
}
</style>