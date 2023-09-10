<template>
  <GameDialog
    :opened="score !== null"
    card-classes="bg-transparent"
  >
    <template #content>
      <ConfettiExplosion :particleCount="500" :force="0.3"/>

      <div class="row items-center justify-center bg-secondary rounded-borders q-pa-md">
        <p class="text-h1 text-white">Yaay ! Your score is {{ score }}</p>
      </div>

      <ConfettiComponent/>

      <div class="row justify-end" style="margin-top: -900px;">
        <GameButton text="OK" @click="emit('popup-closed')"/>
      </div>
    </template>
  </GameDialog>

  <q-page class="q-px-lg">
    <div class="column full-width full-height q-py-lg">
      <div class="info row items-center justify-between q-b-sm" style="height: 70px">
        <div
          class="column items-center justify-center bg-positive q-pa-sm rounded-borders answer-button" style="width: 60px; height: 60px;"
          @click="goHome"
        >
          <img
            :src="HomeSvg"
            style="height: 40px; width: 40px;"
          />
        </div>

        <div>
          <span class="label">Time: </span>
          <span class="value">{{ time }}</span>
        </div>
      </div>
      <q-separator/>

      <div
        class="bg-white q-mt-md full-width column items-center justify-center"
        style="opacity: 0.75;"
      >
        <slot/>
      </div>

      <div class="row justify-center q-pt-lg" v-if="completed">
        <GameButton
          text="Next"
          @click="onNext"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import moment from 'moment/moment';
import { useRouter } from 'vue-router';
import HomeSvg from 'src/assets/home.svg';
import { useTime } from 'src/composables/useTime';
import GameButton from 'components/GameButton.vue';
import GameDialog from 'components/GameDialog.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useBackgroundSoundStore } from 'stores/background-sounds';
import ConfettiExplosion from 'vue-confetti-explosion';
import ConfettiComponent from 'components/ConfettiComponent.vue';

const props = defineProps({
  completed: {
    type: Boolean,
    default: false
  },

  score: {
    type: [Number, null],
    default: null
  }
});

const timer = ref(0);
const time = ref(0);
const startTime = ref(0);

const store = useBackgroundSoundStore();
const router = useRouter();

const emit = defineEmits(['time-taken', 'popup-closed']);

const completed = computed(() => props.completed);
const {convert} = useTime();

watch(completed, (value) => {
  if (value) {
    emit('time-taken', convert(time.value));
  }
});

function startGame() {
  startTime.value = moment();

  store.play('mountain');
  timer.value = setInterval(() => {
    time.value = moment(moment().diff(startTime.value)).format('mm:ss');
  }, 1000);
}

function stopGame() {
  clearInterval(timer.value);
}

function onNext() {
  stopGame();
}

function goHome() {
  store.buttonClick();

  setTimeout(() => {
    router.push({name: 'app.home'});
  }, 500);
}

onMounted(() => {
  startGame();
});
</script>
