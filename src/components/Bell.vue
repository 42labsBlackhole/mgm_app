<template>
  <div>
    <notification :earnedCoins="coins" :converts="converts" :lastConverted="lastConverted" v-if="this.disableNoti" :prize="prize"/>
    <button v-if="bell"  @click="toggleBell()">
      <img class="icons" id="bell" alt="com notificação" src="../assets/belon.png">
    </button>
    <button v-else @click="toggleBox()">
      <img class="icons" id="bell" alt="sem notificação" src="../assets/beloff.png">
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import Notification from "@/components/Notification.vue";

export default {
  name: "Bell",
  data() {
    return {
      coins: 0,
      box: false,
    }
  },
  props: ['id', 'username', 'bell', 'converts', 'disableNoti', 'lastConverted', 'prize'],
  methods: {
    toggleBell() {
      this.$parent.$emit('resetBell');
      this.coins = this.bell
      this.$parent.$emit("switchNoti")
      axios
        .put(process.env.VUE_APP_API_IP + '/users/' + this.id, { notification: 0 })
    },
    toggleBox() {
      this.$parent.$emit("switchNoti")
      this.coins = 0
    }
  },
  components: {Notification},
  mounted() {
    this.coins = this.bell
  }
};
</script>

<style scoped>
#bell {
  margin: 0px;
}

button:hover{
  background-color: #66666621;
  transition: background-color 0.3s linear;
  border-radius: 50%;
  cursor: pointer;
}
</style>
