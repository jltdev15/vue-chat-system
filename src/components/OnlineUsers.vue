<template>
  <div class="flex flex-col gap-3 h-full">
    <div
      class="bg-gray-50 relative rounded-md p-3 flex items-center justify-between gap-3"
    >
      <div class="flex gap-3 items-center">
        <div class="w-10 rounded-full">
          <img
            class="rounded-full"
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        <div class="dark:text-gray-800">
          <p class="font-bold">{{ authStore.currentUser?.fullName }}</p>
          <p class="bg-green-600 inline-block px-2 py-1 rounded text-gray-50 text-xs">
            Admin
          </p>
        </div>
      </div>
      <i
        @click="isMenuShow = !isMenuShow"
        class="bx bx-dots-vertical-rounded text-3xl text-gray-800 cursor-pointer"
        :class="{ 'bg-gray-200 rounded-md': isMenuShow }"
      ></i>
      <div
        v-if="isMenuShow"
        class="absolute w-48 bg-gray-900 shadow-md bottom-[-130%] right-8 p-3 rounded-md flex flex-col"
      >
        <ul>
          <li
            class="cursor-pointer hover:bg-gray-600 flex items-center justify-between dark:text-gray-50 p-2 px-3 rounded-md font-medium"
          >
            Settings<i class="bx bxs-cog"></i>
          </li>
          <li
            class="cursor-pointer flex items-center hover:bg-gray-600 justify-between dark:text-gray-50 p-2 px-3 rounded-md font-medium"
            @click="logoutHandler"
          >
            Sign out<i class="bx bx-log-out-circle"></i>
          </li>
        </ul>
      </div>
    </div>
    <ul class="bg-gray-100 h-full rounded-md p-3 flex flex-col gap-3">
      <p class="text-center" v-if="props.users.length === 0">No online users</p>
      <li
        class="font-bold hover:bg-gray-300 cursor-pointer p-3 flex items-center gap-3 rounded-md bg-gray-100"
        v-else
        v-for="user in users"
        :key="user._id"
        @click="selectUserHandler(user)"
      >
        <div class="w-10 rounded-full">
          <img
            class="rounded-full"
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        <div class="dark:text-gray-800">
          <p>{{ user.fullName }}</p>
          <p class="text-xs bg-green-600 inline-block text-gray-50 px-2 py-1 rounded-md">
            Verified
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["selectUser", "signOut"]);
const props = defineProps(["users"]);
const isMenuShow = ref(false);

const selectUserHandler = (userId) => {
  emit("selectUser", userId);
};
const logoutHandler = () => {
  emit("signOut");
};
</script>

<style scoped></style>
