<template>
<!--<div   style="border: 1px solid red;" class="bg-white h-screen flex flex-col items-end">-->
<div  class="flex-1 mt-16 mr-4 w-96 bg-white shadow-xl rounded-lg relative overflow-hidden">
  <div class="bg-blue-700 h-64 rounded-t-lg absolute w-full"></div>
  <div class="flex flex-col overflow-y-auto h-full p-4 space-y-4">
    <div class="flex flex-col z-10 ml-4 text-white">
      <svg class="w-10 h-10 mb-3 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4">
        </path>
      </svg>
      <div class="text-3xl mb-2">Hi 👋</div>
      <div class="w-60 text-gray-200 text-sm mb-1">
        Please tell us what bugs you while using our system.
        </div>
    </div>
    <div class="border-0 border-t-4 border-blue-500 rounded z-10 shadow-md text-sm">
      <div class="bg-white border border-t-0 rounded-t-none rounded-b flex flex-col space-y-2">
        <div class="px-6 py-4 flex flex-col items-start gap-3">
          <div class="font-semibold ">Start a conversation</div>
          <div class="flex flex-row gap-3">
            <div class="flex flex-row -space-x-10">
              <img class="w-16 h-16 rounded-full border-2 border-white"
                   src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2" />
              <img class="w-16 h-16 rounded-full border-2 border-white"
                   src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2" />
              <img class="w-16 h-16 rounded-full border-2 border-white"
                   src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2" />
            </div>
            <div class="flex flex-col justify-center">
              <div class="text-gray-400">Our usual reply time</div>
              <div class="flex flex-row items-center gap-1 font-semibold">
                <svg class="w-4 h-4 text-blue-700" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                A few hours
              </div>
            </div>
          </div>
          <button type="button" @click="openBox()"
                  class="bg-blue-700 rounded-full text-white flex flex-row gap-2 py-3 px-5">
            <svg class="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            Send us a message

          </button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['change', 'update'])

function openBox() {
    emit('update', 1)
}
</script>
