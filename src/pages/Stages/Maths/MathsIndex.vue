<template>
  <GameLayout
    :completed="completed"
    :score="score"
    @popup-closed="onPopUpClosed"
    @time-taken="onTimeTaken"
  >
    <div class="row items-center justify-center">
      <div class="q-py-lg" style="width: 40%;max-height: 900px;overflow: scroll">
        <MathsQuiz @completed="onCompleted"/>
      </div>

      <p class="text-justify q-px-md" style="width: 20%;">
        This page consists of questions related to arithmetics( Addition, Subtraction, Division, Multiplication )
      </p>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GameLayout from 'components/GameLayout.vue';
import MathsQuiz from 'components/Parts/Maths/MathsQuiz.vue';
import { useScoreStore } from 'stores/score-store';

const completed = ref(false);
const router = useRouter();
const score = ref(null);
const scoreStore = useScoreStore();

function onCompleted() {
  completed.value = true;
}

function onTimeTaken(time) {
  scoreStore.calculateMathsScore(time);

  score.value = scoreStore.score.maths;
}

function onPopUpClosed() {
  router.push({name: 'app.home'});
}
</script>
