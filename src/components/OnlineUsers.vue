<template>
  <div class="bg-indigo-700">
    <UserHeader @sign-out="logoutHandler" />
    <ul class="flex flex-col gap-3 p-6 bg-indigo-700 rounded-md">
      <p class="text-center" v-if="props.users.length === 0">No online users</p>
      <li
        :class="{ 'bg-indigo-500': props.selectedUser === user._id }"
        class="flex items-center gap-3 p-3 font-bold transition-all rounded-md cursor-pointer hover:bg-indigo-500"
        v-else
        v-for="user in users"
        :key="user._id"
        @click="selectUserHandler(user)"
      >
        <div class="relative w-10 rounded-full">
          <!-- <img
            class="rounded-full"
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          /> -->
          <img
            class="rounded-full"
            alt="Tailwind CSS chat bubble component"
            :src="user.profileImageUrl"
          />
          <p
            :class="{
              'bg-green-500': user.online,
              hidden: !user.online,
            }"
            class="absolute bottom-[-5%] inline-block w-3 h-3 rounded-full right-[-1%]"
          ></p>
        </div>
        <div class="dark:text-gray-50">
          <p>{{ user.fullName }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import UserHeader from "./UserHeader.vue";

const emit = defineEmits(["selectUser", "signOut"]);
const props = defineProps(["users", "selectedUser"]);

const selectUserHandler = (userId) => {
  emit("selectUser", userId);
};
const logoutHandler = () => {
  emit("signOut");
};
</script>

<style scoped></style>
