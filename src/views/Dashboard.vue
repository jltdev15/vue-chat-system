<template>
  <div class="grid grid-cols-[25%_75%] h-dvh">
    <div class="bg-gray-800 p-2 h-full">
      <OnlineUsers :users="currentOnlineUsers" @select-user="selectUser" />
    </div>
    <div class="bg-gray-800 p-2">
      <!-- 70% width column content -->
      <Chat
        :selectedChat="isUserSelected"
        :selectedUserName="userFullName"
        :messagesList="messages"
        :receiverId="receiverId"
        :senderId="authStore.currentUser._id"
        @sendMessage="sendMessage"
      />
    </div>
  </div>
</template>

<script setup>
import Chat from "@/components/Chat.vue";
import OnlineUsers from "@/components/OnlineUsers.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { io } from "socket.io-client";
import axios from "axios";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const router = useRouter();
const authStore = useAuthStore();
const { conversationId } = storeToRefs(authStore);
const onlineUsers = ref([]);
const selectedUser = ref(null);
const messages = ref([]);
const newMessage = ref("");
const socket = io("http://localhost:3000");
const isUserSelected = ref(false);
const userFullName = ref(null);
const receiverId = ref(null);
// Fetch online users
onMounted(async () => {
  if (authStore.currentUser) {
    socket.emit("joinRoom", {
      userId: authStore.currentUser._id,
    });
  }
  socket.on("onlineUsers", (users) => {
    console.log(users);
    onlineUsers.value = users;
  });
});
// Handle user selection and conversation retrieval
const selectUser = async (user) => {
  try {
    const response = await axios.post("/api/chat/conversations", {
      userId1: authStore.currentUser._id,
      userId2: user._id,
    });
    console.log(response);
    console.log(response.data.conversationId);
    conversationId.value = response.data.conversationId;
    router.push({ name: "conversation-details", params: { id: conversationId.value } });
    await fetchMessages(conversationId.value);
    isUserSelected.value = true;
    receiverId.value = user._id;
    setUserFullName(user.fullName);
  } catch (err) {
    console.log(err);
  }
};
const fetchMessages = async (conversationId) => {
  const messagesResponse = await axios.get(
    `/api/chat/conversations/${conversationId}/messages`
  );
  messages.value = messagesResponse.data;
};

const setUserFullName = (fullName) => {
  userFullName.value = fullName;
};

// // Send a new message
const sendMessage = (message) => {
  socket.emit("sendMessage", message);
  fetchMessages(message.conversationId);
  socket.on("newMessage", async (message) => {
    if (message.conversationId === conversationId.value) {
      fetchMessages(conversationId.value);
    }
  });
};

const currentOnlineUsers = computed(() => {
  return onlineUsers.value.filter((item) => item._id !== authStore.currentUser._id);
});
</script>

<style scoped></style>
