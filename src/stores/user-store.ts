import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    currentGame: '',
    readInstructions: false
  }),

  getters: {
    read: (state) => state.readInstructions
  },

  actions: {
    setUser(user: object) {
      this.user = user;
    },

    userReadInstructions() {
      this.readInstructions = true;
    }
  },
});
