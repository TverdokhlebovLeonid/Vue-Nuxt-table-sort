<template>
	 <tr>
        <td>
          <label class="select_checkbox">
              <input type="checkbox"
                     :value="val"
                     v-model="model"
                     >
              <span></span>
            </label>
        </td>
        <td v-for="sel in select"> 
               {{ prod[sel] }} 
        </td>
        <td><button class="btn2 btn_y" @click='deleteProductsDelDiv'>Удалить</button></td>
        <transition name="mail_slide">
        <td class="delete_div" v-show="show_delete">
          <div class="delete_div_mod">
              <h3>Вы уверенны что хотите удалить<br>{{product}} ?</h3>
              <div class="delete_div_but">
                  <button class="btn btn_n" @click='show_delete = false' >Нет</button>
                  <button class="btn btn_y" @click='deleteProductsDel(prod)'>Да</button>
              </div>
          </div>
        </td>
        </transition>
    </tr>
</template>
<script>
	export default {
	props: ['product', 'calories', 'fat', 'carbs', 'protein', 'iron', 'index', 'value', 'val', 'select', 'prod'],
	data () {
      return {
      	 show_delete: false
      	}
      },
    computed: {
      model: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    methods: {
    deleteProductsDelDiv(){
      this.show_delete = true;
    },
    deleteProductsDel(prod) {
      this.$store.dispatch('products/deleteProducts', prod);
      this.show_delete = false;
    },
	}
  }
</script>
<style>
.delete_div {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; 
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.delete_div_mod {
  position: absolute;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
}
.delete_div_but {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
h3 {
  color: #10077b;
  font-size: 14px;
  text-align: center;
}
.btn {
  display: inline-block;
  font-weight: normal;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1.9rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  transition: 0.7s;
}
.btn2 {
  margin-right: 10px;
  display: inline-block;
  font-weight: normal;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  transition: 0.7s;
}
.btn2_sm {
  user-select: none;
  border: 1px solid transparent;
  padding: 0rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 0.25rem;
  transition: 0.7s;
}

.btn_n { 
  background-color: #fffbfb;
  border-color: #a8a5a5;
  color: #10077b;
}
.btn_n:hover { 
  background-color: #e6e6e6;
}
.btn_y {
  background-color: #04ca48;
  border-color: #04ca48;
  color: white;
  opacity: 1;
}
.btn_y:hover { 
  background-color: #02a63b;
}
</style>