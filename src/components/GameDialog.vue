<template>
  <q-dialog
    full-width
    full-height
    persistent
    :model-value="opened"
  >
    <q-card :class="cardClasses" :style="cardStyle">
      <q-card-section>
        <div class="text-h6">
          <slot name="title"/>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="content"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
defineProps<{
  opened: {
    type: boolean,
    default: false
  },

  transparent: {
    type: boolean,
    default: false
  },

  cardClasses: {
    type: string,
    default: () => ''
  },

  cardStyle: {
    type: string,
    default: () => ''
  }
}>();
</script>
