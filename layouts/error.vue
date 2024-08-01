<template>
  <div class="page-404">
    <h1>Ошибка 404</h1>
    <h2>Страница не найдена</h2>
    <h2>
      К сожалению, такой страницы больше нет, или она никогда не существовала.
    </h2>
    <h3><nuxt-link to="/">Вернуться на главную</nuxt-link></h3>
  </div>
</template>
<script>
export default {
  head: {
    title: "Ошибка 404",
  },
};
</script>
<style scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
