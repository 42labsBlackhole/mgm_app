<template>
	<div id="footer">
		<a target="_blank" href="https://www.42sp.org.br/"><img tabindex="4" alt="Link para o site da 42 São Paulo" class="logo" src="../assets/42sp_logo.png"/></a>
		<a target="_blank" href="https://www.vivo.com.br/"><img tabindex="4" alt="Link para o site da Vivo" class="logo" src="../assets/Vivo_logo.png"/></a>
		<a target="_blank" href="https://github.com/42labsBlackhole"><img tabindex="4" alt="Link para o repositório do Blackhole no Guítirrãb" id="blackhole" class="logo" src="../assets/blackhole_logo.png"/></a>
	</div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
#footer {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #F2F2F2;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
}
.logo {
  width: 180px;
}
#blackhole {
	width: 150px;
}
@media screen and (max-width: 800px){
	#footer {
		height: 300px;
		flex-direction: column;
	}
	.logo {
		width: 142px;
	}
}
</style>