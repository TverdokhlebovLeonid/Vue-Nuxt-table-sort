<template>
  <div class="container">
    <h1>Выбери свой продукт!</h1>
    <div class="container__sort">
      <div class="container__sort_btn">
        <h2>Сортировать по:</h2>
        <button
          class="btn mr10"
          v-for="(th, index) of productList"
          :key="th + index"
          :class="select[0] !== th.value ? 'btn_cancel' : 'btn_success'"
          @click="sortSelect(th)"
        >
          {{ th.th }}
        </button>
      </div>
      <button
        class="btn btn_success"
        @click="openModal"
        :disabled="deleteCheckboxs.length === 0"
      >
        Удалить {{ deleteCheckboxs.length }}
      </button>
      <div>
        <div class="container__sort_select">
          <button
            class="btn_sm btn-sm-page"
            :disabled="!hasPage(-1)"
            @click="prevPage"
          >
            &lt;
          </button>
          <div class="page_text">cтр-{{ page + 1 }}</div>
          <button
            class="btn_sm btn-sm-page"
            :disabled="!hasPage(1)"
            @click="nextPage"
          >
            &gt;
          </button>
        </div>
        <select v-model="pageSizeModel">
          <option v-for="num in pageSizeList" :key="num" :value="num">
            Кол-во прод. {{ num }}
          </option>
        </select>
      </div>
      <div class="show-block" v-if="isShowBlock" @click="setCorobShow"></div>
      <div>
        <div class="container__select" @click="setCorobShow">
          <div class="select-txt">Выбрать столбцы</div>
          <transition name="transition_img_icon" mode="out-in">
            <div class="string_img" v-if="!isShowBox" key="animation_stroca1">
              <img src="/images/icon/arrow_down.png" />
            </div>
            <div class="string_img" v-else key="animation_stroca2">
              <img src="/images/icon/arrow_up.png" />
            </div>
          </transition>
        </div>
        <transition name="corob_img_block">
          <div
            class="container__select_chec"
            v-show="isShowBlock"
            key="anim_text"
          >
            <label class="select_checkbox">
              <input
                type="checkbox"
                v-model="isSelectAll"
                @click="selectAllChec"
              />
              <span>Выбрать всё.</span>
            </label>
            <hr />
            <div
              v-for="(th, index) in productList"
              :key="index + 'list'"
              class="container__select_chec_lab"
            >
              <label class="select_checkbox">
                <input type="checkbox" v-model="select" :value="th.value" />
                <span>{{ th.th }}</span>
              </label>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="message_slide" v-if="isShowModal">
      <app-modal-message :is-slot="true">
        <h3>
          Вы уверенны что хотите удалить {{ deleteCheckboxs.length }} прод. ?
        </h3>
        <div class="modal_block-button">
          <button class="btn btn_cancel" @click="closeModal">Нет</button>
          <button class="btn btn_success" @click="consentDeletion">Да</button>
        </div>
      </app-modal-message>
    </transition>
    <AppMainTable
      :select="select"
      :is-select="isSelect"
      :sorted-products="sortedProducts"
      :delete-checkboxs="deleteCheckboxs"
      @sort-by="sortBy"
    >
      <app-selecting-table
        v-for="(prod, index) of sortedProducts"
        :key="prod + index"
        :product="prod"
        :index="index"
        v-model="deleteCheckboxs"
        :select="select"
      />
    </AppMainTable>
    <div class="container__select_page">
      <button class="btn btn-sm" :disabled="!hasPage(-1)" @click="prevPage">
        <b>←</b>
      </button>
      <div class="page_text_bold">Страница - {{ page + 1 }}</div>
      <button class="btn btn-sm" :disabled="!hasPage(1)" @click="nextPage">
        <b>→</b>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import AppSelectingTable from "@/components/SelectingTable";
import AppModalMessage from "@/components/ModalMessage";
import AppMainTable from "@/components/MainTable";
export default {
  async fetch({ store }) {
    try {
      if (store.getters["products/products"].length === 0) {
        await store.dispatch("products/getFetchProducts");
      }
    } catch (e) {
      store.commit("products/setWrongMessage", e);
      throw e;
    }
  },
  data() {
    return {
      deleteCheckboxs: [],
      productsSelect: [],
      isShowBox: false,
      isShowBlock: false,
      isSelectAll: true,
      isSelect: true,
      sort: "id",
      sortProducts: "asc",
      page: 0,
      pageSize: 10,
      isShowModal: false,
      productList: [
        { th: "Product(100g serving)", value: "product" },
        { th: "Calories", value: "calories" },
        { th: "Fat(g)", value: "fat" },
        { th: "Carbs(g)", value: "carbs" },
        { th: "Protein(g)", value: "protein" },
        { th: "Iron(%)", value: "iron" },
      ],
      select: ["product", "calories", "fat", "carbs", "protein", "iron"],
      pageSizeList: [10, 15, 20],
    };
  },
  components: {
    AppSelectingTable,
    AppModalMessage,
    AppMainTable,
  },
  computed: {
    ...mapGetters({
      products: "products/products",
    }),
    sortedProducts() {
      this.productsSelect = [...this.products];
      return this.productsSelect
        .sort((a, b) => {
          const dir = this.sortProducts === "asc" ? 1 : -1;
          if (a[this.sort] < b[this.sort]) {
            return -1 * dir;
          } else if (a[this.sort] > b[this.sort]) {
            return 1 * dir;
          } else {
            return 0;
          }
        })
        .filter((row, idx) => {
          const s = this.page * this.pageSize;
          const e = (this.page + 1) * this.pageSize;
          return idx >= s && idx < e;
        });
    },
    pageSizeModel: {
      get() {
        return this.pageSize;
      },
      set(v) {
        this.pageSize = v;
        this.page = 0;
      },
    },
  },
  methods: {
    ...mapMutations({
      clearWrongMessage: "products/clearWrongMessage",
      setWrongMessage: "products/setWrongMessage",
    }),
    ...mapActions({
      deleteFetchProducts: "products/deleteFetchProducts",
    }),
    setCorobShow() {
      this.isShowBox = !this.isShowBox;
      this.isShowBlock = !this.isShowBlock;
    },
    sortSelect(th) {
      const index = this.select.indexOf(th.value);
      if (index === -1) return;
      const deletProd = this.select.splice(index, 1);
      this.select.unshift(deletProd[0]);
    },
    selectAllChec() {
      this.select = [];
      if (!this.isSelectAll) {
        for (const th in this.productList) {
          this.select.push(this.productList[th].value);
        }
      }
    },
    sortBy(s) {
      this.isSelect = !this.isSelect;
      if (s === this.sort) {
        this.sortProducts = this.sortProducts === "asc" ? "desc" : "asc";
      } else {
        this.sortProducts = "asc";
      }
      this.sort = s;
    },
    isActiveSort(s) {
      return this.sort === s;
    },
    hasPage(step) {
      if (step === -1 && this.page > 0) return true;
      if (
        step === 1 &&
        (this.page + 1) * this.pageSize < this.productsSelect.length
      )
        return true;
      return false;
    },
    prevPage() {
      if (this.hasPage(-1)) this.page--;
    },
    nextPage() {
      if (this.hasPage(1)) this.page++;
    },
    openModal() {
      this.isShowModal = true;
      this.$nextTick(() => {
        this.setWrongMessage();
      });
    },
    closeModal() {
      this.isShowModal = false;
      this.$nextTick(() => {
        this.clearWrongMessage();
      });
    },
    consentDeletion() {
      this.closeModal();
      this.deleteFetchProducts(this.deleteCheckboxs);
      this.deleteCheckboxs = [];
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  color: #10077b;
  min-width: 1100px;
}
.container__sort {
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.container__sort_btn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.container__sort_select {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.show-block {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: 0;
  z-index: 500;
}
.container__select {
  margin-top: 8px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.container__select_chec {
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
.container__select_chec_lab {
  margin-bottom: 10px;
  font-size: 16px;
}
.container__select_page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
