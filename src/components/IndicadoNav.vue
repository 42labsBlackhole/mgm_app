<template>
  <header>
    <div id="left" class="header-container">
      <h3 id="username" tabindex="1">Você foi indicado por: {{ username }}</h3>
    </div>
  </header>
</template>

<script>
  export default{
    name: "IndicadoNav",
    props: ['username']
  }
</script>
