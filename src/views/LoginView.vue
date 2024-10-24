<script setup>
import TheHeader from "@/components/TheHeader.vue";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const authStore = useAuthStore();
const router = useRouter();

const loginUser = async () => {
  try {
    await authStore.login({ username: username.value, password: password.value });
    router.push({name:'messenger'});
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <TheHeader />
  <div class="flex flex-col items-center justify-center flex-1 px-6 py-12 h-[70dvh]  lg:px-8">
    <i class='text-[12rem] bx bx-message-square-dots' ></i>
    <div class="text-center sm:mx-auto sm:w-full sm:max-w-sm">
    </div>

    <div class="w-full mt-6 sm:mx-auto sm:max-w-sm">
      <form @submit.prevent="loginUser" class="space-y-6" action="#" method="POST">
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
              >Password</label
            >
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              placeholder="Password"
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

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-sm text-center text-gray-500">
        Not a member?
        {{ " " }}
        <router-link
          :to="{ name: 'register' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Create an Account</router-link
        >
      </p>
    </div>
  </div>
  <Footer />
</template>
