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

const question = computed(() => template(firstNumber.value, '-', secondNumber.value));
const answers = ref([]);

function findSubtractionNumber() {
  firstNumber.value = randomNumber(50);
  secondNumber.value = randomNumber(30);

  if (firstNumber.value < secondNumber.value) {
    console.log('recursive')
    findSubtractionNumber();

    return;
  }

  answer.value = firstNumber.value - secondNumber.value;
}

onMounted(() => {
  findSubtractionNumber();

  answers.value = shuffle([
    {
      correct: true,
      selected: false,
      type: 'subtraction',
      value: answer.value
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 20),
      type: 'subtraction',
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 30),
      type: 'subtraction',
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 50),
      type: 'subtraction',
    },
    {
      selected: false,
      value: generateNumberOtherThan(answer.value, 150),
      type: 'subtraction',
    }
  ]);
});
</script>
