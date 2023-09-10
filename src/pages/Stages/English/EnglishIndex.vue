<template>
  <GameLayout
    :completed="completed"
    :score="score"
    @time-taken="onTimeTaken"
    @next="onNext"
  >
    <component
      :is="components[currentIndex]"
      @completed="onStageCompleted"
    />
  </GameLayout>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import GameLayout from 'components/GameLayout.vue';
import { useRouter } from 'vue-router';
import { useScoreStore } from 'stores/score-store';

const components = [
  defineAsyncComponent(() => import( 'components/Parts/English/GameWordSearch.vue')),
  defineAsyncComponent(() => import( 'components/Sections/Maze/Maze.vue')),
];

const currentIndex = ref(0);
const completed = ref(false);

const scoreStore = useScoreStore();
const router = useRouter();
const score = ref(null);

function onStageCompleted() {
  completed.value = true;

  if (currentIndex.value === components.length) {
    scoreStore.calculateEnglishScore();
    score.value = scoreStore.score.english;
  }
}

function onPopUpClosed() {
  router.push({name: 'app.home'});
}

function onTimeTaken(time) {
  scoreStore.addAnswer('english', {game: currentIndex.value, time: time});
}

function onNext() {
  if (currentIndex.value < components.length) {
    completed.value = false;
    currentIndex.value += 1;

    return;
  }
}
</script>
