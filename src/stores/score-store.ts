import { defineStore } from 'pinia';
import isArray from 'lodash/isArray';

export const useScoreStore = defineStore('score', {
  state: () => ({
    maths: [],
    english: [],
    french: null,
    score: {
      maths: 0,
      english: 0,
      french: 0
    }
  }),

  getters: {
    mathAnswers: state => state.maths
  },

  actions: {
    addAnswer(lang: string, answer: any) {
      if (isArray(this[lang])) {
        this[lang].push(answer);

        return;
      }

      this[lang] = answer;
    },

    calculateMathsScore(timeTaken: number) {
      const correct = this.maths.filter(answer => answer.correct)?.length ?? 0;

      this.score.maths = 1000 - (timeTaken) - (correct * 5);
    },

    calculateEnglishScore() {
      const timeTaken = this.english.reduce((a, b) => a.time + b.time);

      this.score.english = 1000 - (timeTaken * 3);
    },

    calculateFrenchScore() {
      this.score.french = 1000 - (this.french.time * 3);
    }
  }
});
