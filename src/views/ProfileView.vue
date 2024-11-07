<template>
  <div class="flex items-center justify-center h-screen bg-gray-50">
    <div class="pb-16 shadow-xl card bg-base-500 w-96">
      <div class="flex items-center justify-between p-6 text-gray-900">
        <router-link :to="{ name: 'messenger' }">
          <i class="text-2xl bx bxs-chevron-left"></i
        ></router-link>
      </div>

      <div class="flex justify-center p-3 avatar">
        <div class="relative w-24">
          <!-- <img
            class="rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            :src="authStore.profileObj.imageUrl"
          /> -->
          <img class="rounded-full" :src="imageUrl" />
          <label
            for="file-upload"
            class="absolute flex items-center justify-center w-6 h-6 bg-gray-900 rounded-full cursor-pointer bottom-1 right-2"
          >
            <i class="bx bxs-camera"></i>
          </label>
          <input
            type="file"
            id="file-upload"
            accept=""
            class="hidden"
            @change="handleFileChange"
          />
        </div>
        <!-- <div class="upload-btn-wrapper">

        </div>
         -->
      </div>

      <div class="p-3 text-2xl font-bold text-center text-gray-900">
        <p>{{ authStore.profileObj.name }}</p>
        <div class="py-2 text-sm font-medium text-center text-gray-500">
          <p>Set Note</p>
        </div>
      </div>
      <button
        @click="editProfileToggle"
        v-if="!isEdit"
        class="inline-block w-32 mx-auto font-medium text-center hover:text-gray-50 btn btn-outline text-gray 500"
      >
        Edit Profile
      </button>
      <div
        :class="{ 'w-0 hidden': !isEdit, 'w-auto block': isEdit }"
        class="flex flex-col p-6 transistion-all"
      >
        <div class="flex flex-col gap-1">
          <label for=" " class="text-sm font-medium">Email Address</label>
          <input
            class="border border-gray-300 rounded-lg focus:outline-none focus:border-transparent"
            type="text"
            :placeholder="authStore.profileObj.username"
          />
        </div>
        <div class="flex flex-col gap-1 pt-3">
          <label for=" " class="text-sm font-medium">Password</label>
          <input
            class="border border-gray-300 rounded-lg focus:outline-none focus:border-transparent"
            type="password"
            placeholder="********"
          />
        </div>
        <div class="flex justify-end gap-3 pt-6">
          <button
            @click="editProfileToggle"
            class="inline-block w-32 font-medium text-center hover:text-gray-50 btn btn-outline text-gray 500"
          >
            Cancel
          </button>
          <button
            class="inline-block w-32 font-medium text-center text-gray-50 hover:text-gray-50 btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref, computed } from "vue";
const authStore = useAuthStore();
const isEdit = ref(false);
const isFileSizeExceed = ref(false);
const fileProfile = ref("");
const handleFileChange = async (event) => {
  fileProfile.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
  const formData = new FormData();
  formData.append("image", fileProfile.value);
  try {
    await authStore.uploadProfile(formData);
    await authStore.getProfile();
  } catch (err) {
    console.log(err);
  }
};

const editProfileToggle = () => {
  isEdit.value = !isEdit.value;
};

const imageUrl = computed(() => {
  return authStore.profileObj.imageUrl
    ? authStore.profileObj.imageUrl
    : "https://storage.googleapis.com/chissmax-avatar/no-image.png";
});

onMounted(() => {
  authStore.getProfile();
});
</script>

<style lang="scss" scoped></style>
