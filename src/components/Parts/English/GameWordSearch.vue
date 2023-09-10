<template>
  <div
    class="row q-py-md"
    id="game-words"
  >
    <div class="col col-3 has-text-centered-mobile q-pa-md">
      <h4>Find the following words.</h4>

      <ul>
        <li
          v-for="(word, index) in wordsArray"
          :key="`word-${index}`"
          :class="{'done':( typeof word.letters !== 'undefined' && word.letters instanceof Array )}"
        >
          {{ word.word }}
        </li>
      </ul>
    </div>

    <div class="col"></div>
    <div class="col col-7">
      <div class="letters">
        <div
          class="row q-gutter-x-lg "
          v-for="(row, index) in letters"
          :key="`row-${index}`"
        >
          <p
            v-for="(col, index) in row"
            :key="`col-${index}`"
            :class="[{ word: col.reserved } ,{ clicked :col.clicked } , 'cursor-pointer']"
            @click="selectLetter(col.row,col.col)"
          >
            {{ col.letter }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { useRandomNumbers } from 'src/composables/useRandomNumbers';

export default {
  name: 'GameWords',

  props: {
    size: {
      default: 15,
    }
  },

  setup() {
    const {randomNumber} = useRandomNumbers();

    return {
      randomNumber
    }
  },

  data() {
    return {
      time: 0,
      timeInterval: null,
      total: 0,
      modal: false,
      letters: [],
      wordsList: [
        'Aardvark',
        'Antelope',
        'Armadillo',
        'Baboon',
        'Badger',
        'Barracuda',
        'Bat',
        'Bear',
        'Beaver',
        'Bison',
        'Boar',
        'Buffalo',
        'Camel',
        'Cheetah',
        'Chimpanzee',
        'Cobra',
        'Coyote',
        'Crab',
        'Crocodile',
        'Deer',
        'Dolphin',
        'Eagle',
        'Elephant',
        'Falcon',
        'Ferret',
        'Fox',
        'Gazelle',
        'Giraffe',
        'Gorilla',
        'Grizzly',
        'Hedgehog',
        'Hippopotamus',
        'Horse',
        'Hyena',
        'Iguana',
        'Impala',
        'Jaguar',
        'Kangaroo',
        'Koala',
        'Komodo',
        'Leopard',
        'Lion',
        'Lizard',
        'Lynx',
        'Marmoset',
        'Meerkat',
        'Mongoose',
        'Monkey',
        'Moose',
        'Mouse',
        'Ocelot',
        'Opossum',
        'Orangutan',
        'Ostrich',
        'Otter',
        'Owl',
        'Panda',
        'Panther',
        'Parrot',
        'Penguin',
        'Puma',
        'Rabbit',
        'Raccoon',
        'Rat',
        'Rhinoceros',
        'Salamander',
        'Seahorse',
        'Seal',
        'Shark',
        'Sheep',
        'Sloth',
        'Snake',
        'Squirrel',
        'Tiger',
        'Toucan',
        'Turtle',
        'Vulture',
        'Wallaby',
        'Walrus',
        'Warthog',
        'Weasel',
        'Whale',
        'Wolf',
        'Wombat',
        'Zebra'
      ],
      wordsArray: []
    }
  },

  emits: ['completed'],

  watch: {
    completed(value) {
      if (value) {
        this.$emit('completed')
      }
    }
  },

  computed: {
    completed() {
      return this.total === this.words.length;
    },

    words() {
      return this.wordsList.slice(this.randomNumber(10), this.randomNumber(30))
    }
  },

  methods: {
    selectLetter(indexX, indexY) {
      if (this.letters[indexX][indexY].reserved === true) {
        this.letters[indexX][indexY].clicked = true;
        for (let w = 0; w < this.wordsArray.length; w++) {
          if (typeof this.wordsArray[w].letters !== 'undefined' && this.wordsArray[w].letters instanceof Array) {
            for (let l = 0; l < this.wordsArray[w].letters.length; l++) {
              if (this.wordsArray[w].letters[l] === this.letters[indexX][indexY].id) {
                this.wordsArray[w].letters.splice(l, 1);
              }
            }
            if (this.wordsArray[w].letters.length === 0) {
              delete this.wordsArray[w].letters;
              this.total++;
            }

          }
        }
      }
    },
    putWord(word) {
      let collision, start, end, direction, x, pos1, pos2, secondPosition, col;
      col = 0;
      do {
        collision = false;
        let length = word.length;
        direction = (Math.floor(Math.random() * 2) === 0);
        let startEnd = this.size - length;
        start = Math.floor(Math.random() * startEnd);
        end = start + length;
        secondPosition = Math.floor(Math.random() * this.size);
        for (x = start; x < end; x++) {
          pos1 = direction ? x : secondPosition;
          pos2 = direction ? secondPosition : x;
          if (this.letters[pos1][pos2].reserved === true && this.letters[pos1][pos2].letter !== word[x - start]) {
            collision = true;
            col++;
          }
        }
      } while (collision === true && col < 20);
      if (col >= 20) {
        console.error('Initialization error');
      }
      this.wordsArray.push({word: word, letters: []});
      for (x = start; x < end; x++) {
        pos1 = direction ? x : secondPosition;
        pos2 = direction ? secondPosition : x;
        this.letters[pos1][pos2].letter = word[x - start];
        this.letters[pos1][pos2].reserved = true;
        this.wordsArray[this.wordsArray.length - 1].letters.push(this.letters[pos1][pos2].id)
      }
    }
  },
  created() {
    let possible = 'abcdefghijklmnopqrstuvwxyz';
    this.letters = [];
    for (let x = 0; x < this.size; x++) {
      let row = [];
      for (let y = 0; y < this.size; y++) {
        row.push({
          letter: possible.charAt(Math.floor(Math.random() * possible.length)),
          id: ((x * this.size) + y),
          reserved: false,
          clicked: false,
          selected: false,
          row: x,
          col: y
        });
      }

      this.letters.push(row);
    }
    for (let w = 0; w < this.words.length; w++) {
      this.putWord(this.words[w]);
    }
  }
}
</script>
