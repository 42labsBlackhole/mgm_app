<template>
  <div>
    <span>Notificações</span>
    <p>{{msg_convert}}</p>
		<p>{{msg_coin}}</p>
  </div>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return{
      msg_convert: "",
	    msg_coin: ""
    }
  },
  props: ['earnedCoins', 'converts', 'lastConverted', 'prize']
  ,
  methods: {
    setMsg() {
      if (this.earnedCoins === 0)
        this.msg_coin = "Você não possui notificações."
      else if (this.converts === 0)
        this.msg_coin = "Você ganhou " + this.earnedCoins + " moedas."
      else if (this.earnedCoins === 1)
        this.msg_coin = this.lastConverted[0].toUpperCase() + this.lastConverted.slice(1) + " acabou de se tornar cliente Vivo!"
      else
        this.msg_coin = this.lastConverted + " e mais " + (this.converts - 1) + " pessoas já se tornaram clientes Vivo!"
	    this.msg_convert = "Total de conversões: " + this.converts
    }
  },
  beforeMount() {
		this.setMsg();
  }
}

</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 3;
  width: 300px;
  top: 100%;
  right: 0%;
  border: 2px solid #4e4e4e;
  background-color:  #f2f2f2;
  border-radius: 5px;
}

span {
  top: 100%;
  display: flex;
  justify-content: center;
  color: #68019a;
  padding: 8px;
  background-color:  #e2e2e2;
}

p{
  padding: 20px;
}
</style>