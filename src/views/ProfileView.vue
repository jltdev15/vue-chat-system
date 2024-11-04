<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="card bg-base-500 w-96 shadow-xl">
      <div class="justify-between p-6 items-center flex text-gray-900">
        <i class="bx bxs-chevron-left text-2xl"></i>
        <p class="text-center font-medium text-gray-50 btn">Edit Profile</p>
      </div>

      <div class="avatar flex justify-center p-3">
        <div class="w-24 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div class="p-3 text-center text-gray-900 font-bold text-2xl">
        <p>Lebron James</p>
        <div class="text-center text-gray-500 font-medium text-sm py-2">
          <p>Senior Developer</p>
        </div>
      </div>
      <div class="p-6">
        <div class="flex flex-col gap-1">
          <label for=" " class="text-sm font-medium">Email Address</label>
          <input
            class="rounded-lg border border-gray-300 focus:outline-none focus:border-transparent"
            type="text"
            placeholder="lebronjames@gmail.com"
          />
        </div>
        <div class="flex flex-col pt-3 gap-1">
          <label for=" " class="text-sm font-medium">Password</label>
          <input
            class="rounded-lg border border-gray-300 focus:outline-none focus:border-transparent"
            type="password"
            placeholder="********"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
