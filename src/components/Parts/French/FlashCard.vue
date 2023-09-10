<template>
  <div class="row">
    <div class="col-md-6 col-lg-6 col-xl-5 q-mx-auto">
      <div class="row justify-content-md-center">
        <div class="cards">
          <div
            class="card cursor-pointer"
            v-for="(card,index) in cards" :class="{ flipped: card.flipped, found: card.found }"
            :key="`index-card-${index}`"
            @click="flipCard(card)"
          >
            <div class="back"></div>
            <div class="front" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import shuffle from 'lodash/shuffle';
import each from 'lodash/each';
import filter from 'lodash/filter';
import map from 'lodash/map';
import moment from 'moment';
import { useRandomNumbers } from 'src/composables/useRandomNumbers';

let cardList = [
  {'name': 'Animals Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/cropped-animals-name-logo.png'}, {'name': 'Animals Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/cropped-animals-name-logo.png'}, {'name': 'Animals name', 'image': 'https://animalsname.in/wp-content/uploads/2022/03/Animals-Name.jpg'}, {'name': 'Elephant', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Elephant.png'}, {'name': 'horse', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/horse.jpg'}, {'name': '', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/dog-1.jpg'}, {'name': '', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/cat-1.jpg'}, {'name': 'Monkey', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Monkey.png'}, {'name': 'Gorilla', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Gorilla.png'}, {'name': 'Rhinoceros', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Rhinoceros.png'}, {'name': '', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/lion.png'}, {'name': 'Capybara', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Capybara.png'}, {'name': 'Crocodile', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Crocodile.png'}, {'name': 'Llama', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Llama.png'}, {'name': 'Squirrel', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Squirrel.png'}, {'name': 'Hamster', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Hamster.png'}, {'name': 'Raccoon', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Raccoon.png'}, {'name': 'Meerkat', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Meerkat.png'}, {'name': 'Ferret', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Ferret.png'}, {'name': 'Hippo', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/hippo.png'}, {'name': 'sheep', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/sheep.png'}, {'name': 'donkey', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/donkey.png'}, {'name': 'goat', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/goat.png'}, {'name': 'Quokka', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Quokka.png'}, {'name': 'leopard', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/leopard.png'}, {'name': 'cheetah', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/cheetah.png'}, {'name': 'sloths', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/sloths.png'}, {'name': 'turtle', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/turtle.png'}, {'name': 'bear', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/bear.png'}, {'name': 'koala', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/koala.png'}, {'name': 'panda', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/panda.png'}, {'name': 'deer', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/deer.png'}, {'name': 'giraffe', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/giraffe.png'}, {'name': 'wolf', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/wolf.png'}, {'name': 'snake', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/snake.png'}, {'name': 'Cow', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/cow.png'}, {'name': 'Tiger', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/tiger.png'}, {'name': 'Jaguar', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Jaguar.png'}, {'name': 'Spider', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Spider.png'}, {'name': 'Cobra', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Cobra.png'}, {'name': 'Butterfly', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Butterfly.png'}, {'name': 'Bison', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Bison.png'}, {'name': 'Buffalo', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Buffalo.png'}, {'name': 'Camel', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Camel.png'}, {'name': 'Fox', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Fox.png'}, {'name': 'Hedgehog', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Hedgehog.png'}, {'name': 'Hyena', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Hyena.png'}, {'name': 'Ibex', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Ibex.png'}, {'name': 'Jackal', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Jackal.png'}, {'name': 'Kangaroo', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Kangaroo.png'}, {'name': 'Mink', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Mink.png'}, {'name': 'Mole', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Mole.png'}, {'name': 'Moose', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Moose.png'}, {'name': 'Nilgai', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Nilgai.png'}, {'name': 'Okapi', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Okapi.png'}, {'name': 'Opossum', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Opossum.png'}, {'name': 'Orangutan', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Orangutan.png'}, {'name': 'Oryx', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Oryx.png'}, {'name': 'Ox', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Ox.png'}, {'name': 'Penguin', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Penguin.png'}, {'name': 'Pig', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Pig-.png'}, {'name': 'Polar bear', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Polar-bear.png'}, {'name': 'Porcupine', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Porcupine.png'}, {'name': 'Prairie dog', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Prairie-dog.png'}, {'name': 'Rabbit', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Rabbit.png'}, {'name': 'Rat', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Rat.png'}, {'name': 'Reindeer', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Reindeer.png'}, {'name': 'Saki', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Saki.png'}, {'name': 'Serval', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Serval.png'}, {'name': 'Shark', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Shark.png'}, {'name': 'Siamang', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Siamang.png'}, {'name': 'Skunk', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Skunk.png'}, {'name': 'Tamarin', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Tamarin.png'}, {'name': 'Tapir', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Tapir.png'}, {'name': 'Tarsier', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Tarsier.png'}, {'name': 'Topi', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Topi.png'}, {'name': 'Vicuna', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Vicuna.png'}, {'name': 'Walrus', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Walrus.png'}, {'name': 'Weasel', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Weasel.png'}, {'name': 'Whale', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Whale.png'}, {'name': 'Yak', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Yak.png'}, {'name': 'Zebra', 'image': 'https://animalsname.in/wp-content/uploads/2022/06/Zebra.png'}, {'name': 'lion', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/lion-g343c59b4e_640.jpg'}, {'name': 'Tiger', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/Tiger.jpg'}, {'name': 'Dog', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/Dog.jpg'}, {'name': 'cat', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/cat.jpg'}, {'name': 'horse', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/horse.jpg'}, {'name': 'snake', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/snake.jpg'}, {'name': 'giraffe', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/giraffe.jpg'}, {'name': 'camel', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/camel.jpg'}, {'name': 'cow', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/cow.jpg'}, {'name': 'deer', 'image': 'https://animalsname.in/wp-content/uploads/2022/02/deer.jpg'}, {'name': 'Wild Animals Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/Wild-Animals-Name-2-2.jpg'}, {'name': 'Domestic Animals Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/Domestic-Animals-Name-2.jpg'}, {'name': 'Pet Animals Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/Pet-animals-name-1.jpg'}, {'name': 'Mammals Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/Mammals-Name.jpg'}, {'name': 'Insects Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/Insects-Name.jpg'}, {'name': 'Water Animals Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/Water-Animals-Name.jpg'}, {'name': 'Birds Name', 'image': 'https://animalsname.in/wp-content/uploads/2022/07/Birds-Name.jpg'}
];

const {randomNumber} = useRandomNumbers();

let CardTypes = cardList.slice(randomNumber(3), randomNumber(15));

let shuffleCards = () => {
  let cards = [].concat(cloneDeep(CardTypes), cloneDeep(CardTypes));
  return shuffle(cards);
};

const showSplash = ref(false);
const cards = ref([]);
const started = ref(false);
const startTime = ref(0);
const turns = ref(0);
const flipBackTimer = ref(null);
const timer = ref(null);
const time = ref('--:--');
const score = ref(0);

const emit = defineEmits(['completed']);

function resetGame() {
  showSplash.value = false;
  let shuffleCardsList = shuffleCards();
  turns.value = 0;
  score.value = 0;
  started.value = false;
  startTime.value = 0;

  each(shuffleCardsList, (card) => {
    card.flipped = false;
    card.found = false;
  });


  cards.value = shuffleCardsList;
}

function flippedCards() {
  return filter(cards.value, card => card.flipped);
}

function sameFlippedCard() {
  let flippedCard = flippedCards();
  if (flippedCard.length == 2) {
    if (flippedCard[0].name == flippedCard[1].name)
      return true;
  }
}

function setCardFounds() {
  each(cards.value, (card) => {
    if (card.flipped)
      card.found = true;
  });
}

function checkAllFound() {
  let foundCards = filter(cards.value, card => card.found);
  if (foundCards.length == cards.value.length)
    return true;
}

function startGame() {
  started.value = true;
  startTime.value = moment();

  timer.value = setInterval(() => {
    time.value = moment(moment().diff(startTime.value)).format('mm:ss');
  }, 1000);
}

function finishGame() {
  started.value = false;
  clearInterval(timer.value);

  emit('completed');
}

function flipCard(card) {
  if (card.found || card.flipped) return;

  if (!started.value) {
    startGame();
  }

  let flipCount = flippedCards().length;
  if (flipCount == 0) {
    card.flipped = !card.flipped;
  } else if (flipCount == 1) {
    card.flipped = !card.flipped;
    turns.value += 1;

    if (sameFlippedCard()) {
      // Match!
      flipBackTimer.value = setTimeout(() => {
        clearFlipBackTimer();
        setCardFounds();
        clearFlips();

        if (checkAllFound()) {
          finishGame();
        }

      }, 200);
    } else {
      // Wrong match
      flipBackTimer.value = setTimeout(() => {
        clearFlipBackTimer();
        clearFlips();
      }, 1000);
    }
  }
}

function clearFlips() {
  map(cards.value, (card: { flipped: boolean; }) => card.flipped = false);
}

function clearFlipBackTimer() {
  clearTimeout(flipBackTimer.value);
  flipBackTimer.value = null;
}

onMounted(() => {
  resetGame();
});
</script>
