<template>
  <div class="tooltip-container" @click="clickadd()">
    <slot />
    <div class="tooltip" :style="{backgroundColor: backColor}">
      <span class="text"> {{ text }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  data() {
    return{
      text: "Copiar",
      backColor: "rgba(0,0,0,0.5)"
    }
  },
  methods:{
    clickadd(){
      this.text = "Copiado";
      this.backColor = '#68019a';
      setTimeout(() => {this.text = "Copiar"; this.backColor = "rgba(0,0,0,0.5)"}, 1500);
    }
  },
}
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-container:hover .tooltip {
  display: block;
}

.tooltip {
  display: none;
  width: 120px;
  position: absolute;
  top: 110%;
  left: 50%;
  margin-left: -60px;
  text-align: center;
  padding: 5px;
  color: #ffffff;
  border-radius: 5px;
  transition-timing-function: linear;
  z-index: 1;
}
</style>