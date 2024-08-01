<template>
  <tr>
    <td>
      <label class="select_checkbox">
        <input type="checkbox" :value="product" v-model="model" />
        <span />
      </label>
    </td>
    <td v-for="(sel, index) in select" :key="index">
      {{ product[sel] }}
    </td>
    <td>
      <button class="btn btn_success" @click="openModal">Удалить</button>
    </td>
    <transition name="message_slide" v-if="isShowModal">
      <app-modal-message :is-slot="true">
        <h3>Вы уверенны что хотите удалить<br />{{ product.product }} ?</h3>
        <div class="modal_block-button">
          <button class="btn btn_cancel" @click="closeModal">Нет</button>
          <button class="btn btn_success" @click="consentDeletion(product)">
            Да
          </button>
        </div>
      </app-modal-message>
    </transition>
  </tr>
</template>
<script>
import AppModalMessage from "@/components/ModalMessage";
import { mapMutations, mapActions } from "vuex";
export default {
  props: ["product", "value", "select"],
  components: {
    AppModalMessage,
  },
  data() {
    return {
      isShowModal: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
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
    consentDeletion(prod) {
      this.closeModal();
      this.deleteFetchProducts(prod);
    },
  },
};
</script>
