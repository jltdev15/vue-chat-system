<template>
  <div class="flex flex-col gap-3 h-full">
    <div class="bg-gray-50 rounded-md p-3 flex items-center justify-between gap-3">
      <div class="flex gap-3 items-center">
        <div class="w-10 rounded-full">
          <img
            class="rounded-full"
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        <div class="dark:text-gray-800">
          <p class="font-bold">Juan Dela Cruz</p>
          <p class="bg-green-600 inline-block px-2 py-1 rounded text-gray-50 text-xs">
            Admin
          </p>
        </div>
      </div>

      <p
        class="cursor-pointer dark:text-gray-50 p-2 px-3 rounded-md font-medium bg-red-600"
        @click="logoutHandler"
      >
        Sign out
      </p>
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
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["selectUser"]);
const props = defineProps(["users"]);

const selectUserHandler = (userId) => {
  emit("selectUser", userId);
};
const logoutHandler = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style scoped></style>
