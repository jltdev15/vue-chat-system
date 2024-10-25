<template>
  <header class="p-3 md:p-6 bg-neutral">
    <nav class="mx-auto text-gray-50">
      <div class="text-center">
        <p class="flex items-center justify-center gap-3 text-5xl font-bold">
          ChissMaxx <i class="bx bx-game"></i>
        </p>
        <p class="text-sm text-gray-200 px-6">
          Your tsismis chat application. Start you chismiss adventure now!
        </p>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
</script>

<style lang="scss" scoped></style>
