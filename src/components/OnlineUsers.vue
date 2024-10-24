<template>
  <div class="flex flex-col h-full gap-3">
    <div
      class="relative flex items-center justify-between gap-3 p-3 bg-indigo-500 rounded-md"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 rounded-full">
          <img
            class="rounded-full"
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        <div class="dark:text-gray-50 text-gray-50">
          <p class="font-bold">{{ authStore.currentUser?.fullName }}</p>
          <p class="inline-block py-1 text-xs underline rounded text-gray-50">
            Set Status
          </p>
        </div>
      </div>
      <i
        @click="isMenuShow = !isMenuShow"
        class="text-3xl cursor-pointer text-gray-50 bx bx-dots-vertical-rounded"
        :class="{ 'bg-indigo-400 rounded-md': isMenuShow }"
      ></i>
      <div
        
        :class="{'opacity-100 z-[9999]  translate-y-[20%] ': isMenuShow}"
        class="absolute flex flex-col w-48 z-[-999] opacity-0 p-3 ease-in-out delay-50 transition duration-100 bottom-[-100%] bg-gray-900 rounded-md shadow-md right-3"
      >
        <ul class="text-sm">
          <li
            class="flex items-center justify-between p-2 px-3 font-medium rounded-md cursor-pointer hover:bg-gray-600 dark:text-gray-50"
          >
            Settings<i class="bx bxs-cog"></i>
          </li>
          <li
            class="flex items-center justify-between p-2 px-3 font-medium rounded-md cursor-pointer hover:bg-gray-600 dark:text-gray-50"
            @click="logoutHandler"
          >
            Sign out<i class="bx bx-log-out-circle"></i>
          </li>
        </ul>
      </div>
    </div>
    <ul class="flex flex-col h-full gap-3 p-3 bg-indigo-600 rounded-md">
      <p class="text-center" v-if="props.users.length === 0">No online users</p>
      <li :class="{'bg-indigo-500': props.selectedUser === user._id}"
        class="flex items-center gap-3 p-3 font-bold transition-all rounded-md cursor-pointer hover:bg-indigo-500"
        v-else
        v-for="user in users"
        :key="user._id"
        @click="selectUserHandler(user)"
      >
        <div class="relative w-10 rounded-full">
          <img
            class="rounded-full"
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
          <p :class="{'bg-green-500': user.online, 'hidden': !user.online}" class="absolute bottom-[-5%] inline-block w-3 h-3 rounded-full right-[-1%]" >
          </p>
        </div>
        <div class="dark:text-gray-50">
          <p>{{ user.fullName }}</p>

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
const props = defineProps(["users",'selectedUser']);
const isMenuShow = ref(false);

const selectUserHandler = (userId) => {
  emit("selectUser", userId);
};
const logoutHandler = () => {
  emit("signOut");
};
</script>

<style scoped></style>
