<template>
  <div class="row wrap q-gutter-y-lg scroll q-py-lg">
    <div
      v-for="index in numberOfQuestions"
      :key="`question-${index}`"
    >
      <component :is="componentName()"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import { useRandomNumbers } from 'src/composables/useRandomNumbers';
import { useScoreStore } from 'stores/score-store';

const scoreStore = useScoreStore();
const {randomNumber} = useRandomNumbers();

const components = [
  defineAsyncComponent(() => import( 'components/Parts/Maths/DivisionQuestion.vue')),
  defineAsyncComponent(() => import( 'components/Parts/Maths/AdditionQuestion.vue')),
  defineAsyncComponent(() => import( 'components/Parts/Maths/SubtractionQuestion.vue')),
  defineAsyncComponent(() => import( 'components/Parts/Maths/MultiplicationQuestion.vue')),
];

const numberOfQuestions = randomNumber(20) + randomNumber(20);

const isCompleted = computed(() => scoreStore.mathAnswers.length === numberOfQuestions);

const emit = defineEmits(['completed']);

watch(isCompleted, (value) => {
  if (value) {
    emit('completed');
  }
});

function componentName() {
  return components[randomNumber(components.length)];
}
</script>
