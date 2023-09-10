<template>
  <GameLayout
    :completed="completed"
    :score="score"
    @popup-closed="onPopUpClosed"
    @time-taken="onTimeTaken"
  >
    <FlashCard @completed="onCompleted"/>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GameLayout from 'components/GameLayout.vue';
import FlashCard from 'components/Parts/French/FlashCard.vue';
import { useScoreStore } from 'stores/score-store';

const completed = ref(false);
const router = useRouter();

const scoreStore = useScoreStore();
const score = ref(null)

function onTimeTaken(time) {
  scoreStore.addAnswer('french', {game: 'flashcard', time: time});
  score.value = scoreStore.score.maths;
}

function onCompleted() {
  completed.value = true;
}

function onPopUpClosed() {
  router.push({name: 'app.home'});
}
</script>
