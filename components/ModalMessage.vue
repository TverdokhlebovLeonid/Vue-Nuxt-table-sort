<template>
  <div class="modal-message" v-if="isModalMessage">
    <div class="modal-message__window">
      <template v-if="!isSlot">
        <button class="btn-close" @click="clearWrongMessage">x</button>
        <h3>
          <b>{{ wrongMessage }}</b>
        </h3>
        <h3>{{ textMessage }}</h3>
      </template>

      <slot v-else />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["isSlot"],
  computed: {
    ...mapGetters({
      wrongMessage: "products/wrongMessage",
      isModalMessage: "products/isModalMessage",
    }),
    textMessage() {
      return this.wrongMessage
        ? "Пожалуйста, попробуйте позже."
        : "Удаление прошло успешно!";
    },
  },
  methods: {
    ...mapMutations({
      clearWrongMessage: "products/clearWrongMessage",
    }),
  },
};
</script>
<style>
.modal-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modal-message__window {
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
  & .btn-close {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 25px;
    font-weight: 500;
    cursor: pointer;
    font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
    border: 0;
    background-color: #fff;
  }
  & b {
    color: red;
  }
}
</style>
