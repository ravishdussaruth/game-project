<template>
  <div
    :class="['rounded-borders q-pa-lg flex game-button', defaultClasses, `bg-${type} text-${type}`]"
  >
    <span
      class="text-white text-capitalize text-h2 fit text-center text-bold"
      v-text="text"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'positive'
  },

  text: {
    type: String
  },

  defaultClasses: {
    type: String,
    default: 'col-2'
  }
});
</script>
