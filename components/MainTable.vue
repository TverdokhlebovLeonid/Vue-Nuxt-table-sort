<template>
  <div>
    <table class="main-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="(header, index) of select" :key="header">
            <div class="main-table__select">
              {{ selectHeaders[header] }}
              <div v-if="index === 0">
                <transition name="transition_img_icon" mode="out-in">
                  <div
                    class="string_img"
                    v-if="isSelect"
                    key="animation_str_select"
                    @click="sortBy(header)"
                  >
                    <img src="/images/icon/arrow_down.png" />
                  </div>
                  <div
                    class="string_img"
                    v-else
                    key="animation_str"
                    @click="sortBy(header)"
                  >
                    <img src="/images/icon/arrow_up.png" />
                  </div>
                </transition>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["select", "isSelect", "sortedProducts", "deleteCheckboxs"],
  data() {
    return {
      selectHeaders: {
        product: "Product(100g serving)",
        calories: "Calories",
        fat: "Fat(g)",
        carbs: "Carbs(g)",
        protein: "Protein(g)",
        iron: "Iron(%)",
      },
    };
  },
  methods: {
    sortBy(header) {
      this.$emit("sort-by", header);
    },
  },
};
</script>

<style scoped>
.main-table {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-collapse: collapse;
  background-color: transparent;
  text-align: left;
  font-size: 15px;
}
.main-table td,
.main-table th {
  padding: 2rem;
  vertical-align: top;
  border-top: 1px solid #eceeef;
}
.main-table tr:nth-of-type(2n + 2) {
  background-color: rgba(0, 0, 0, 0.05);
}
.main-table__select {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
