<template>
  <div class="h-dvh">
    <!-- Show only when the user not select a conversation -->
    <div
      v-if="!props.selectedChat"
      class="h-[100dvh] justify-center flex items-center p-4 bg-gray-200 rounded-md"
    >
      <div>
        <p class="text-5xl font-bold">Select Conversation</p>
        <p class="text-center py-2 font-medium text-gray-400">No selected conversation</p>
      </div>
    </div>
    <!-- Header showing the name of selected user -->
    <div v-if="props.selectedChat" class="flex flex-col gap-3">
      <header
        class="flex items-center gap-3 shadow-md bg-gray-200 rounded-md p-4 justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 rounded-full">
            <img
              class="rounded-full"
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
          <p class="font-bold text-xl text-gray-800">{{ props.selectedUserName }}</p>
        </div>
      </header>
      <!-- Chat bubbles -->
      <section
        ref="messageList"
        class="bg-gray-50 h-[82dvh] rounded-md overflow-y-auto p-3 dark:text-gray-900"
      >
        <div
          class="h-full flex justify-center items-center"
          v-if="props.messagesList.length === 0"
        >
          <p class="text-5xl font-bold">Start sending message</p>
        </div>
        <ul v-if="props.messagesList.length">
          <li
            v-for="item in messagesList"
            :key="item._id"
            class="chat"
            :class="{
              'chat-end': item.senderId._id == authStore.currentUser?._id,
              'chat-start': item.senderId._id !== authStore.currentUser?._id,
            }"
          >
            <div class="chat-bubble dark:text-gray-50">
              {{ item.content }}
            </div>
          </li>
        </ul>
      </section>
      <!-- Input box -->
      <div class="flex gap-3" v-if="props.selectedChat">
        <textarea
          class="w-full rounded-md dark:text-gray-800"
          v-model.trim="newMessage"
          placeholder="Type a message"
          @keyup.enter="sendMessageHandler"
        />
        <button
          v-if="newMessage"
          @click="sendMessageHandler"
          class="btn-primary w-32 rounded-md font-bold text-base bg-gray-50 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
