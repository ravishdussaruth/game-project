<template>
  <GameDialog
    :opened="!userStore.read"
    card-classes="bg-secondary"
  >
    <template #title>
      <span>Instructions</span>
    </template>

    <template #content>
      <div class="column text-justify full-height">
        <p style="color: silver; font-weight: 600;font-size: 24px;">Welcome to a mind-bending journey of intellect and language! Get ready to embark on a captivating adventure that seamlessly blends three distinct worlds - English, French, and Mathematics - into an exciting puzzle game. In this unique and immersive experience, you will find yourself traversing the realms of languages and numbers, solving intricate puzzles, and unlocking the secrets of each stage.</p>
        <p style="color: silver; font-weight: 600;font-size: 24px;">With each stage offering its own set of intriguing puzzles and mysteries, this game promises to be an educational and entertaining journey that will sharpen your linguistic and mathematical abilities. Are you up for the challenge? Prepare to explore, learn, and conquer the world of language and numbers in a way like never before. Let the adventure begin!</p>

        <p class="text-h6">Press on start to start the game.</p>

        <div style="margin-top: 20%;" class="row justify-end">
          <GameButton text="start" @click="onStart"/>
        </div>
      </div>
    </template>
  </GameDialog>

  <q-page class="row items-center justify-evenly">
    <div
      class="flex column items-center justify-center q-gutter-md full-width"
    >
      <GameButton
        style="width: 30%;"
        text="English"
        @mouseenter="mouseOver"
        @click="mouseClick('app.english')"
      />

      <GameButton
        style="width: 30%;"
        text="French"
        @mouseenter="mouseOver"
        @click="mouseClick('app.french')"
      />

      <GameButton
        style="width: 30%;"
        text="Maths"
        @mouseenter="mouseOver"
        @click="mouseClick('app.maths')"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import GameButton from 'components/GameButton.vue';
import { useBackgroundSoundStore } from 'stores/background-sounds';
import GameDialog from 'components/GameDialog.vue';
import { useUserStore } from 'stores/user-store';

export default defineComponent({
  name: 'IndexPage',

  components: {
    GameButton,
    GameDialog
  },

  setup() {
    const store = useBackgroundSoundStore();
    const userStore = useUserStore();

    const quasar = useQuasar();

    return {
      store,
      quasar,
      userStore
    };
  },

  methods: {
    async playMusic() {
      await this.store.play('menu');
    },

    async mouseOver() {
      await this.store.buttonHover();
    },

    async mouseClick(routeName: string) {
      await this.store.buttonClick();

      setTimeout(() => {
        this.$router.push({name: routeName});
      }, 200);
    },

    onStart() {
      this.userStore.userReadInstructions();
      this.playMusic();
    }
  },
});
</script>
