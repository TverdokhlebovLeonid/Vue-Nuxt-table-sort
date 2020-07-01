<template>
  <div>
    <transition name="mail_slide">
  	<div class="delete_div" v-show="errorDiv">
	   <div class="delete_div_mod">
            <div class="delete_div_x" 
                 @click="clearError"
                 >
               x
            </div> 
            <h3  style="color: red">{{ error }}</h3>
            <h3>Пожалуйста, попробуйте позже.</h3>
     </div>
    </div>
    </transition>
    <transition name="mail_slide"> 
    <div class="delete_div" v-show="messageDiv">
     <div class="delete_div_mod">
            <div class="delete_div_x" 
                 @click="clearMessage"
                 >
               x
            </div> 
            <h3>Удаление прошло успешно!</h3>
     </div>
    </div>
    </transition>
    <nuxt />
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  computed: {
    ...mapGetters({
        error:'products/error',
        errorDiv:'products/errorDiv',
        messageDiv:'products/messageDiv',
      })
  },
  methods: {
    ...mapMutations({
        clearError:'products/clearError',
        clearMessage:'products/clearMessage'
      })
  }
}
</script>

<style scoped>
.delete_div_x {
  margin-left: 100%;
  text-align: right;
  margin-right: 5px;
  color: black;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
}
.delete_div_mod {
  padding-top: 5px;
}
</style>
