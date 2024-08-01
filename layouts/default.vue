<template>
  <div>
    <transition name="message_slide">
      <app-modal-message />
    </transition>
    <nuxt />
  </div>
</template>

<script>
import AppModalMessage from "@/components/ModalMessage";
export default {
  components: {
    AppModalMessage,
  },
};
</script>
