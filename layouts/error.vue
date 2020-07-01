<template>
  <div class="text">
      <h1>Ошибка 404</h1>
      <h2>Страница не найдена</h2>
<h2>К сожалению, такой страницы больше нет, или она никогда не существовала.</h2>
    <h3><nuxt-link to="/">Вернуться на главную</nuxt-link></h3>

  </div>
</template>
<script>
export default {
  head: {
    title: 'Ошибка 404'
  },
 
  }
</script>
<style scoped>
h1 {
  font-size: 35px;
}
h2 {
  margin-top: 10px;
  text-align: center;
}
h3 {
  margin-top: 20px;
  margin-bottom: 20px
}


</style>
