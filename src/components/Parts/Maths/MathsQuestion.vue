<template>
  <div class="flex column full-width">
    <span class="text-h4 text-uppercase" v-text="question"/>

    <div class="flex row items-center justify-between q-pt-md q-gutter-x-md">
      <div
        v-for="(answer, index) in availableAnswers"
        :key="`answer-${index}`"
        class="text-center row items-center justify-center cursor-pointer"
        :class="{'border-selected': answer.selected}"
        style="width: 50px; height: 50px;"
        @click="onAnswerSelected(answer)"
      >
        <span v-text="`${alphabets[index]}.`"/>
        <span class="q-ml-sm" v-text="answer.value"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useBackgroundSoundStore } from 'stores/background-sounds';
import cloneDeep from 'lodash/cloneDeep';
import { useScoreStore } from 'stores/score-store';

const store = useBackgroundSoundStore();

const props = defineProps({
  question: {
    type: String,
    required: true
  },

  answers: {
    type: Array,
    default: () => []
  }
});

const scoreStore = useScoreStore();

const alphabets = ['A', 'B', 'C', 'D', 'E'];

const hasSelectedAnswer = computed(() => availableAnswers.value.some(answer => answer.selected === true));

const availableAnswers = ref([]);

function onAnswerSelected(answer: object) {
  if (hasSelectedAnswer.value) {
    return;
  }

  store.buttonClick();
  answer.selected = true;

  scoreStore.addAnswer('maths', answer);
}

onMounted(() => {
  availableAnswers.value = cloneDeep(props.answers);
});
</script>
