<template>
  <div
    class="relative flex items-center justify-between gap-3 p-3 bg-indigo-600 shadow-md"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 rounded-full">
        <!-- <img
          class="rounded-full"
          alt="Tailwind CSS chat bubble component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        /> -->
        <img class="rounded-full" :src="imageUrl" />
      </div>
      <div class="relative dark:text-gray-50 text-gray-50">
        <p class="font-bold">{{ authStore.currentUser?.fullName }}</p>
        <p
          @click="toggleVisibility"
          class="inline-block py-1 text-xs underline rounded cursor-pointer text-gray-50"
        >
          Set Visibility
        </p>
        <ul
          :class="{ 'opacity-0': !isVisibility, 'opacity-100': isVisibility }"
          class="absolute right-[-20%] top-7 p-2 transition-all bg-gray-50 text-sm duration-50 text-gray-900 rounded-md"
        >
          <li
            class="p-2 transition-all rounded-md cursor-pointer hover:bg-gray-600 hover:text-gray-50"
          >
            Inactive
          </li>
          <li
            class="p-2 transition-all rounded-md cursor-pointer hover:bg-green-600 hover:text-gray-50"
          >
            Active
          </li>
        </ul>
      </div>
    </div>
    <i
      @click="isMenuShow = !isMenuShow"
      class="text-3xl cursor-pointer text-gray-50 bx bx-dots-vertical-rounded"
      :class="{ 'bg-indigo-400 rounded-md': isMenuShow }"
    ></i>
    <div
      :class="{ 'opacity-100 z-[9999]  translate-y-[20%] ': isMenuShow }"
      class="absolute flex flex-col w-48 z-[-999] opacity-0 p-3 ease-in-out delay-50 transition duration-100 bottom-[-100%] bg-gray-900 rounded-md shadow-md right-3"
    >
      <ul class="text-sm">
        <li>
          <router-link
            :to="{ name: 'profile' }"
            class="flex items-center justify-between p-2 px-3 font-medium rounded-md cursor-pointer hover:bg-gray-600 dark:text-gray-50"
          >
            Profile<i class="bx bx-user-circle"></i>
          </router-link>
        </li>

        <li
          class="flex items-center justify-between p-2 px-3 font-medium rounded-md cursor-pointer hover:bg-red-600 dark:text-gray-50"
          @click="logoutHandler"
        >
          Sign out<i class="bx bx-log-out-circle"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref, computed, onMounted } from "vue";
const authStore = useAuthStore();
const isMenuShow = ref(false);
const isVisibility = ref(false);
const emit = defineEmits(["signOut"]);
const logoutHandler = () => {
  emit("signOut");
};

const imageUrl = computed(() => {
  return authStore.profileObj.imageUrl
    ? authStore.profileObj.imageUrl
    : "https://storage.googleapis.com/chissmax-avatar/no-image.png";
});
const toggleVisibility = () => {
  isVisibility.value = !isVisibility.value;
};

onMounted(() => {
  authStore.getProfile();
});
</script>

<style scoped></style>
