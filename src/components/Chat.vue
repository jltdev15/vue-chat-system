<template>
  <div class="h-dvh p-3">
    <!-- Show only when the user not select a conversation -->
    <div
      v-if="!props.selectedChat"
      class="h-full justify-center flex items-center bg-gray-200 rounded-md"
    >
      <div>
        <p class="text-5xl font-bold">Select Conversation</p>
        <p class="py-2 font-medium text-center text-gray-400">No selected conversation</p>
      </div>
    </div>
    <!-- Header showing the name of selected user -->
    <div
      v-if="props.selectedChat"
      class="flex flex-col bg-gray-200 rounded-md h-[98dvh] overflow-hidden"
    >
      <header class="flex items-center justify-between gap-3 p-3 bg-indigo-700 shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-10 rounded-full">
            <img
              class="rounded-full"
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
          <p class="text-xl font-bold text-gray-50">{{ props.selectedUserName }}</p>
        </div>
        <div class="text-2xl flex gap-4 text-gray-50">
          <i class="bx bx-phone"></i>
          <i class="bx bx-video"></i>
          <i class="bx bx-info-circle"></i>
        </div>
      </header>
      <!-- Chat bubbles -->
      <section ref="messageList" class="overflow-y-auto h-full p-3 dark:text-gray-900">
        <div
          class="flex items-center justify-center h-full"
          v-if="props.messagesList.length === 0"
        >
          <p class="text-5xl font-bold">Start sending message</p>
        </div>
        <ul v-if="props.messagesList.length">
          <li
            v-for="item in messagesList"
            :key="item._id"
            class="chat flex flex-col px-3"
            :class="{
              'chat-end': item.senderId._id == authStore.currentUser?._id,
              'chat-start': item.senderId._id !== authStore.currentUser?._id,
            }"
          >
            <div class="chat-bubble bg-indigo-900 dark:text-gray-50">
              {{ item.content }}
            </div>
            <p class="text-xs text-gray-600">{{ format(item.createdAt) }}</p>
          </li>
        </ul>
      </section>
      <!-- Input box -->
      <div class="flex gap-3 p-3" v-if="props.selectedChat">
        <textarea
          class="w-full rounded-xl dark:text-gray-800 h-12 resize-none border border-gray-300 overflow-hidden"
          v-model.trim="newMessage"
          placeholder="Aa"
          @keyup.enter="sendMessageHandler"
        />
        <button v-if="newMessage" @click="sendMessageHandler" class="flex items-center">
          <i class="bx bxs-send text-4xl text-indigo-500"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from "timeago.js";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const emit = defineEmits(["sendMessage"]);
const props = defineProps([
  "selectedChat",
  "selectedUserName",
  "messagesList",
  "receiverId",
  "senderId",
]);
const authStore = useAuthStore();
const { conversationId } = storeToRefs(authStore);
const newMessage = ref("");
const messageList = ref(null);
// Send a new message using emit
const sendMessageHandler = () => {
  if (newMessage.value === "") {
    return console.log("No message input");
  }
  const message = {
    content: newMessage.value,
    conversationId: conversationId.value,
    senderId: authStore.currentUser._id,
    receiverId: props.receiverId,
  };
  emit("sendMessage", message);
  newMessage.value = "";
};
</script>
