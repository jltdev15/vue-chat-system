<template>
  <div class="">
    <header class="p-6 bg-black">
      <nav class="w-9/12 mx-auto text-gray-50">
        <div class="text-center">
          <p class="text-5xl font-bold">ChatMis</p>
          <p class="text-sm text-gray-200">Spread the news</p>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
</script>

<style lang="scss" scoped></style>
