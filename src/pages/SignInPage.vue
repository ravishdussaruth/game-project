<template>
  <q-page class="row items-center justify-evenly full-width">
    <q-form @submit.prevent="signIn">
      <div class="flex column q-col-gutter-y-md items-center justify-center">
        <h3 class="text-uppercase text-primary">Welcome to my Game</h3>

        <q-input
          filled
          dense
          borderless
          bg-color="white"
          placeholder="Email"
          v-model="email"
        />

        <q-input
          filled
          dense
          borderless
          bg-color="white"
          placeholder="Password"
          v-model="password"
          type="password"
        />

        <q-btn
          class="col-5 q-mt-md text-center"
          color="white"
          text-color="black"
          filled
          type="submit"
        >
          Sign in
        </q-btn>

        <router-link to="/register">Create an account here!</router-link>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from 'stores/user-store';

const email = ref(null);
const password = ref(null);
const store = useUserStore();

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
  .then(data => {
    store.setUser(data.user);
  });
};
</script>
