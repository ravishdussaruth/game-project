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


const divisor = ref(0);
const quotient = ref(0);
const dividend = ref(0);

const {randomNumber, generateNumberOtherThan} = useRandomNumbers();
const {template} = useTemplateString();

const question = computed(() => template(dividend.value, '÷', divisor.value));
const answers = ref([]);

function findDivisionNumbers() {
  divisor.value = randomNumber(5);
  quotient.value = randomNumber(30);

  dividend.value = quotient.value * divisor.value;
}

onMounted(() => {
  findDivisionNumbers();

  answers.value = shuffle([
    {
      correct: true,
      selected: false,
      type: 'division',
      value: quotient.value
    },
    {
      selected: false,
      value: generateNumberOtherThan(quotient.value, 20),
      type: 'division',
    },
    {
      selected: false,
      value: generateNumberOtherThan(quotient.value, 30),
      type: 'division',
    },
    {
      selected: false,
      value: generateNumberOtherThan(quotient.value, 50),
      type: 'division',
    },
    {
      selected: false,
      value: generateNumberOtherThan(quotient.value, 150)
    }
  ]);
});
</script>
