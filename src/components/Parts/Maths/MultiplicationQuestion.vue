<template>
  <MathsQuestion
    v-if="answers.length > 0"
    :question="question"
    :answers="answers"
  />
</template>

<script setup lang="ts">
import { useTemplateString } from 'src/composables/useTemplateString';
import { useRandomNumbers } from 'src/composables/useRandomNumbers';
import MathsQuestion from 'components/Parts/Maths/MathsQuestion.vue';
import { computed, onMounted, ref } from 'vue';
import shuffle from 'lodash/shuffle';

const firstNumber = ref(0);
const answer = ref(0);
const secondNumber = ref(0);

const {randomNumber, generateNumberOtherThan} = useRandomNumbers();
const {template} = useTemplateString();

const question = computed(() => template(firstNumber.value, 'x', secondNumber.value));
const answers = ref([]);

function findMultiplicationNumber() {
  firstNumber.value = randomNumber(8);
  secondNumber.value = randomNumber(8);

  answer.value = firstNumber.value * secondNumber.value;
}

onMounted(() => {
  findMultiplicationNumber();

  answers.value = shuffle([
    {
      correct: true,
      selected: false,
      type: 'multiplication',
      value: answer.value
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 20),
      type: 'multiplication',
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 30),
      type: 'multiplication',
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 50),
      type: 'multiplication',
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 150),
      type: 'multiplication',
    }
  ]);
});
</script>
