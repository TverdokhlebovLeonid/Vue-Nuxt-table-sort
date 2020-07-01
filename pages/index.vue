<template>
  <div class="container">
    <h1>Выбери свой продукт!</h1>
    <div class="sort_osn">
      <div class="sort_but_osn">
        <h2>Сортировать по: </h2>
          <button class="btn2"
                  v-for="(th, index) of productThs"
                  :key="th + index"
                  :class="(select[0] !== th.value)? 'btn_n': 'btn_y'"
                  @click="sortSelect(th)"
          >
            {{ th.th }}
          </button>
      </div> 
      <button class="btn2 btn_y" 
              @click='deleteProductsGroupDiv()' 
              :disabled="deleteCheckboxs.length === 0"
              >
            Удалить {{ deleteCheckboxs.length }}
      </button>
      <div class="select_page_div">
            <div class="prev_pade_div">
                <button class="btn2_sm btn-sm2" :disabled="!hasPage(-1)" @click="prevPage">&lt;</button> 
                <div class="prev_pade_text_sm">cтр-{{ page + 1 }}</div>
                <button class="btn2_sm btn-sm2" :disabled="!hasPage(1)"  @click="nextPage">&gt;</button>
            </div>
            <select v-model="pageSizeModel">
                <option value="10">Кол-во прод. 10</option>
                <option value="15">Кол-во прод. 15</option>
                <option value="20">Кол-во прод. 20</option>
            </select>
      </div>
      <div class="show_fon" v-show="corob_show2" @click="corobShow"></div>
      <div>
          <div class="select_div" @click="corobShow">
             <div class="stroca_txt"> Выбрать столбцы </div>
              <transition name="stroca_img_icon" mode="out-in">
                  <div class="stroca_img" v-if="!corob_show" key="anim_stroca1"><img src="/images/icon/str_niz.png"></div>
                  <div class="stroca_img" v-else key="anim_stroca2"><img src="/images/icon/str_ver.png"></div>
              </transition>

          </div>
            <transition name="corob_img_block">
              <div class="select_div_chec" 
                   v-show="corob_show2"
                   key="anim_text"
                   >
                   <label class="select_checkbox"> 
                    <input type="checkbox"
                           v-model="selectAll"
                           @click="selectAllChec"
                        >
                     <span>Выбрать всё.</span>
                   </label>
                   <hr>
                <div v-for="th of productThs"
                     class="select_div_chec_lab" 
                     >
                    <label class="select_checkbox">
                      <input type="checkbox"
                             v-model="select"
                             :value="th.value"
                          >
                       <span>{{ th.th }}</span>
                    </label>
                </div>
              </div>
            </transition>
        </div>
    </div> 
    <transition name="mail_slide">
    <div class="delete_div" v-show="show_delete_gr">
          <div class="delete_div_mod">
              <h3>Вы уверенны что хотите удалить {{ deleteCheckboxs.length }} прод. ?</h3>
              <div class="delete_div_but">
                  <button class="btn btn_n" @click='show_delete_gr = false' >Нет</button>
                  <button class="btn btn_y" @click='deleteProductsGroupPush(deleteCheckboxs)'>Да</button>
              </div>
          </div>
    </div>
   </transition>
    <div class="tab_osn" >
      <table class="tabl_osn">
        <thead>
          <tr>
            <th></th>
            <th  v-for="(th, index) of select"
                  > 
                  <div class="select_hr_st">
                    {{ selectThs[th] }}
                    <div v-show="index === 0">
                     <transition name="stroca_img_icon" mode="out-in">
                          <div class="stroca_img"
                               v-if="select_st"
                               key="anim1_str" 
                               @click="sortBy(th)" 
                               >
                               <img src="/images/icon/str_niz.png">
                          </div>
                          <div class="stroca_img"
                               v-else
                               key="anim2_str"
                               @click="sortBy(th)"
                                >
                                <img src="/images/icon/str_ver.png">
                          </div>
                     </transition>
                    </div>
                  </div>   
            </th>
          </tr>
        </thead>
         <tbody>
                <app-tablcomp 
                          v-for="(prod, index) of sortedProducts"
                          :key="prod + index"
                          :product="prod.product"
                          :calories="prod.calories"
                          :fat="prod.fat"
                          :carbs="prod.carbs"
                          :protein="prod.protein"
                          :iron="prod.iron"
                          :index="index"
                          v-model="deleteCheckboxs"
                          :val="prod"
                          :select="select"
                          :prod="prod"
                        />
        </tbody>
      </table>
    </div>
    <div class="prev_pade_div">
        <button class="btn2 btn-sm" :disabled="!hasPage(-1)" @click="prevPage"><b>←</b></button> 
        <div class="prev_pade_text">Страница - {{ page + 1 }}</div>
        <button class="btn2 btn-sm" :disabled="!hasPage(1)"  @click="nextPage"><b>→</b></button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppTablcomp from '@/components/Tablcomp';
export default {
  async fetch({store, error}) {
    try {
      if (store.getters['products/products'].length === 0) {
        await store.dispatch('products/getProducts')
      }
    } catch (e) {
        store.commit('products/setError', e)
      throw e
    }
  },
  data () {
      return {
        deleteCheckboxs: [],
        productsSelect: [],
        show_delete_gr: false,
        corob_show: false,
        corob_show2: false,
        selectAll: true,
        select_st: true,
        sort: 'id',
        sortDir:'asc',
        page: 0,
        pageSize: 10,
        productThs: [
          { th: 'Product(100g serving)', value: 'product'},
          { th: 'Calories', value: 'calories' },
          { th: 'Fat(g)', value: 'fat' },
          { th: 'Carbs(g)', value: 'carbs' },
          { th: 'Protein(g)', value: 'protein' },
          { th: 'Iron(%)', value: 'iron' },
        ],
        selectThs: { product: 'Product(100g serving)', calories: 'Calories', fat: 'Fat(g)', carbs: 'Carbs(g)', protein: 'Protein(g)', iron: 'Iron(%)'},
        select: ['product', 'calories', 'fat', 'carbs', 'protein', 'iron'],
        }
    },
  components: {
    AppTablcomp,
  },
  computed: {
    ...mapGetters({
        products:'products/products',
      }),
    sortedProducts() {
      this.productsSelect = this.products.slice();
      return this.productsSelect.sort((a, b) => {
            let dir = (this.sortDir === 'asc') ? 1 : -1;
            if (a[this.sort] < b[this.sort]) { return -1 * dir;
            } else if (a[this.sort] > b[this.sort]) { return  1 * dir;
            } else { return 0;
            }
          }).filter((row, idx) => {
        let s = this.page*this.pageSize;
        let e = (this.page+1)*this.pageSize;
        return (idx >= s && idx < e);
      }); 
    },
    pageSizeModel: {
      get() {
        return this.pageSize;
      },
      set(v) {
        this.pageSize = v;
        this.page = 0;
      }
    }
  },
  methods: {
    deleteProductsGroupDiv() {
      this.show_delete_gr = true;
    },
    deleteProductsGroupPush(deleteCheckboxs) {
      this.$store.dispatch('products/deleteProducts', deleteCheckboxs);
      this.deleteCheckboxs = [];
      this.show_delete_gr = false;
    },
    corobShow() {
      this.corob_show = !this.corob_show;
      this.corob_show2 = !this.corob_show2;
    },
    sortSelect(th) {
      let index = this.select.indexOf(th.value);
      if (index === -1) return;
      let deletProd = this.select.splice(index, 1);
      this.select.unshift(deletProd[0]);
    },
    selectAllChec() {
      this.select = [];
      if (!this.selectAll) {
        for (let th in this.productThs) {
          this.select.push(this.productThs[th].value);
        }
      }
    },
    sortBy(s) {
      this.select_st = !this.select_st;
      if (s === this.sort) { this.sortDir = (this.sortDir === 'asc') ? 'desc' : 'asc';
      } else { this.sortDir = 'asc';
      }
      this.sort = s;
    },
    isActiveSort(s) { 
      return this.sort === s; 
    },
    hasPage(dir) {
      if (dir === -1 && (this.page > 0)) return true;
      if (dir ===  1 && (((this.page+1)*this.pageSize) < this.productsSelect.length)) return true;
      return false;
    },
    prevPage() {
      if (this.hasPage(-1)) this.page--;
    },
    nextPage() {
      if (this.hasPage(1)) this.page++;
    }
}
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  color: #10077b;
  min-width: 1100px;
}
.show_fon {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: 0;
  z-index: 500;
}
.sort_osn {
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sort_but_osn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.select_div{
  margin-top: 8px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.stroca_img {
  width: 24px;
  height: 24px;
  margin-left: 5px;
}
.stroca_txt {
  width: 100%;
  font-size: 14px;
}
.select_div_chec {
  position: absolute;
  margin-left: -70px;
  padding: 20px;
  display: inline-block;
  border-radius: 4px;
  width: 200px;
  height: 250px;
  background-color: white;
  box-shadow: -10px 15px 15px 1px rgba(168, 164, 164, 0.64);
  z-index: 1000;
}
.select_div_chec_lab {
  margin-bottom: 10px;
  font-size: 16px;
}
.tabl_osn {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-collapse: collapse;
  background-color: transparent;
  text-align: left;
  font-size: 15px;
}
.tabl_osn td, .tabl_osn th {
  padding: 2.0rem;
  vertical-align: top;
  border-top: 1px solid #eceeef;
}
.tabl_osn tr:nth-of-type(2n+2) {
  background-color: rgba(0, 0, 0, 0.05);
}
h1 {
  text-align: center;
  padding: 20px;
  background-color: #f5fbf5;
  font-size: 24px;
  color: #0808ae;
  letter-spacing: 0.2rem;
}
h2 {
  font-size: 12px;
  margin-right: 5px;
  margin-top: 17px;
}
hr {
  border: none; 
  background-color: #04ca48; 
  color: #04ca48; 
  height: 1px;
}
b {
  font-size: 25px;
  font-weight: bold;
}
.btn2[disabled]{
  background-color: #f4f9fb;
  border-color: #888b8c;
  cursor: not-allowed;
  box-shadow: none;
  opacity: .65;
  color: #10077b;
}
.select_checkbox>input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.select_checkbox>span {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
.select_checkbox>span::before {
  content: '';
  display: inline-block;
  width: 1.3em;
  height: 1.3em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 2px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  cursor: pointer;
}
.select_checkbox>input:checked+span::before {
  border-color: #04ca48;
  background-color: #04ca48;
  transition: 0.7s;
  background-image:url(../static/images/icon/checkbox.png);
}
.select_checkbox>input:not(:disabled):not(:checked)+span:hover::before {
  border-color: #04ca48;
  transition: 0.7s;
}
select {
  margin-top: 3px;
  padding: 1px;
  padding-right: 25px;
  font: inherit;
  font-size: 13px;
  border: 1px solid #04ca48;
  border-right: none;
  border-radius: 2px;
  color: #10077b;
  appearance: none;
  background:url(../static/images/icon/str_niz.png) no-repeat right;
}
.btn-sm {
  display: inline-block;
  width: 10rem;
  margin: 1rem;
}
.btn-sm:visited  { 
  color: #111; 
}
.btn-sm:disabled, .btn-sm:disabled:hover { 
  color: rgba(0, 0, 0, 0.1); 
  border: 2px solid rgba(0, 0, 0, 0.1);
  cursor: initial;
 }
.btn-sm:hover, .btn-sm:focus {
  border: 2px solid #04ca48;
  color: #04ca48; 
}
.btn-sm2 {
  display: inline-block;
  margin: 0.1rem; 
}
.btn-sm2:visited  { 
  color: #111;
}
.btn-sm2:disabled, .btn-sm2:disabled:hover { 
  color: rgba(0, 0, 0, 0.1); 
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: initial;
 }
.btn-sm2:hover, .btn-sm2:focus {
  border: 1px solid #04ca48;
  color: #04ca48; 
}
.prev_pade_div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.prev_pade_text {
  font-size: 18px;
  font-weight: bold;
}
.select_page_text {
  font-size: 14px;
  font-weight: 300;
}
.prev_pade_text_sm {
  font-size: 13px;
  font-weight: 300;
}
.select_hr_st {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
    .stroca_img_icon-enter-active{
      animation: stroca_img_icon-In 0.4s;
    }
    .stroca_img_icon-leave-active{
      animation: stroca_img_icon-Out 0.4s;
    }
    @keyframes stroca_img_icon-In {
      from{transform: rotateX(90deg);}
      to{transform: rotateX(0deg);}
    }
    @keyframes stroca_img_icon-Out {
      from{transform: rotateX(0deg);}
      to{transform: rotateX(90deg);}
    }
    .mail_slide-enter-active {
        animation: mail_slide-in .6s;
    }

    .mail_slide-leave-active {
        animation: mail_slide-out .5s;
    }
    @keyframes mail_slide-in {
        0% { transform: scale(0);}
        100% {transform: scale(1);}
    }
    @keyframes mail_slide-out {
        0% { transform: scale(1);}
        50% { transform: scale(1.05);}
        100% { transform: scale(0);}
    }
    .corob_img_block-enter-active, .corob_img_block-leave-active {
      overflow: hidden;
      transition: all 0.7s;
      max-height: 250px;
    }

    .corob_img_block-enter, .corob_img_block-leave-to {
      max-height: 0;
    }
</style>
