<template>
  <q-page class="row items-center justify-evenly full-width">
    <q-form @submit.prevent="register">
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
          :loading="isRegistering"
        >
          Register
        </q-btn>

        <router-link to="/login">Already have an account ? Log in here.</router-link>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'stores/user-store'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const email: string = ref<string>('');
const password: string = ref<string>('');
const isRegistering: boolean = ref<boolean>(false);

const store = useUserStore();

const register = () => {
  isRegistering.value = true;
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then(data => {
    store.setUser(data.user)
  }).finally(() => {
    isRegistering.value = false;
  });
};
</script>
