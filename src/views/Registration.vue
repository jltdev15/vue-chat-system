<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
const fullName = ref("");
const username = ref("");
const password = ref("");
const error = ref("");
const authStore = useAuthStore();
const router = useRouter();

const registerUser = async () => {
  try {
    await authStore.register({
      fullName: fullName.value,
      username: username.value,
      password: password.value,
    });
    router.push("/");
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <TheHeader />
  <div class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
    <div class="text-center sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900 dark:text-gray-50"
      >
        Create an account
      </h2>
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="registerUser" class="space-y-3" action="#" method="POST">
        <div>
          <div class="flex items-center justify-between">
            <label
              for="fullName"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
              >Alias</label
            >
          </div>
          <div class="mt-2">
            <input
              placeholder="Display Name"
              v-model="fullName"
              id="fullName"
              name="fullName"
              type="text"
              autocomplete="confirm-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p v-if="error">{{ error }}</p>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >Email address</label
          >
          <div class="mt-2">
            <input
              placeholder="Email Address"
              v-model="username"
              id="email"
              name="email"
              type="text"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
              >New Password</label
            >
          </div>
          <div class="mt-2">
            <input
              placeholder="New password"
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p v-if="error">{{ error }}</p>
        </div>

        <div class="pt-3">
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create ChatMis Account
          </button>
        </div>
      </form>

      <p class="mt-10 text-sm text-center text-gray-500">
        Already member?
        {{ " " }}
        <router-link
          :to="{ name: 'home' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>
