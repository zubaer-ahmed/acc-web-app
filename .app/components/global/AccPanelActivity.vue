<script setup lang="ts">
const { close } = usePanels()
const activeTab = ref('tab-1')
</script>

<template>
  <div
    class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 border bg-white"
  >
    <div class="flex h-16 w-full items-center justify-between px-10">
      <h2
        class="font-heading text-muted-700 text-lg font-semibold dark:text-white"
      >
        Activity
      </h2>
      <button
        type="button"
        class="text-muted-400 hover:bg-muted-100 hover:text-muted-600 dark:hover:bg-muted-700 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 dark:hover:text-white"
        @click="close"
      >
        <Icon name="feather:chevron-right" class="h-6 w-6" />
      </button>
    </div>

    <div class="flex h-16 items-center px-10">
      <!-- Tabs -->
      <div
        class="bg-muted-100 dark:bg-muted-700 relative flex h-10 w-full items-center rounded-lg font-sans text-sm"
      >
        <button
          type="button"
          class="relative z-20 flex h-full flex-1 items-center justify-center"
          :class="activeTab === 'tab-1' ? 'text-white' : 'text-muted-400'"
          @click="activeTab = 'tab-1'"
        >
          <span>Vendor</span>
        </button>
        <button
          type="button"
          class="relative z-20 flex h-full flex-1 items-center justify-center"
          :class="activeTab === 'tab-2' ? 'text-white' : 'text-muted-400'"
          @click="activeTab = 'tab-2'"
        >
          <span>Client</span>
        </button>
        <button
          type="button"
          class="relative z-20 flex h-full flex-1 items-center justify-center"
          :class="activeTab === 'tab-3' ? 'text-white' : 'text-muted-400'"
          @click="activeTab = 'tab-3'"
        >
          <span>Business</span>
        </button>
        <div
          class="bg-primary-600 absolute start-0 top-0 z-10 h-full w-1/3 rounded-lg transition-all duration-300"
          :class="[
            activeTab === 'tab-1' && 'ms-0',
            activeTab === 'tab-2' && 'ms-[33.3%]',
            activeTab === 'tab-3' && 'ms-[66.6%]',
          ]"
        ></div>
      </div>
    </div>

    <div
      class="nui-slimscroll relative h-[calc(100%_-_128px)] w-full overflow-y-auto px-10"
    >
      <div class="py-6">
        <!-- Vendor tab content -->
        <div v-if="activeTab === 'tab-1'" class="space-y-4">
          <!-- Vendor -->
          <div
            class="border-muted-200 dark:border-muted-600 dark:bg-muted-700 flex items-center rounded-lg border bg-white p-4"
          >
            <div
              class="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
            >
              <img
                src="/img/avatars/2.svg"
                class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                alt=""
              />
            </div>
            <div class="ms-3">
              <h6
                class="font-heading text-muted-800 text-sm font-semibold dark:text-white"
              >
                You
              </h6>
              <p class="text-muted-400 font-sans text-xs">Product Manager</p>
            </div>
            <NuxtLink
              to="#"
              class="border-muted-200 text-muted-400 hover:border-primary-500 hover:text-primary-500 dark:border-muted-500 dark:hover:border-primary-500 ms-auto flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300"
            >
              <Icon name="feather:arrow-right" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- Client tab content -->
        <div v-else-if="activeTab === 'tab-2'" class="space-y-4">
          <!-- Client -->
          <div
            class="border-muted-200 dark:border-muted-600 dark:bg-muted-700 flex items-center rounded-lg border bg-white p-4"
          >
            <div
              class="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
            >
              <img
                src="/img/avatars/2.svg"
                class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                alt=""
              />
            </div>
            <div class="ms-3">
              <h6
                class="font-heading text-muted-800 text-sm font-semibold dark:text-white"
              >
                You
              </h6>
              <p class="text-muted-400 font-sans text-xs">Product Manager</p>
            </div>
            <NuxtLink
              to="#"
              class="border-muted-200 text-muted-400 hover:border-primary-500 hover:text-primary-500 dark:border-muted-500 dark:hover:border-primary-500 ms-auto flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300"
            >
              <Icon name="feather:arrow-right" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- Business tab content -->
        <div v-else-if="activeTab === 'tab-3'" class="space-y-4">
          <!-- Business -->
            <div
              class="after:border-muted-300 dark:after:border-muted-600 relative flex pb-8 after:absolute after:start-4 after:top-10 after:h-[calc(100%_-_36px)] after:w-px after:border-l after:content-['']"
            >
              <div
                class="border-muted-200 text-muted-400 after:border-muted-300 dark:border-muted-600 dark:bg-muted-700 dark:after:border-muted-600 relative flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-lg after:absolute after:-end-8 after:top-4 after:h-px after:w-5 after:border-t after:content-['']"
              >
                <Icon name="ph:note-duotone" class="" />
              </div>
              <div class="ms-10">
                <h6
                  class="font-heading text-muted-800 text-sm font-semibold dark:text-white"
                >
                  Write proposal for Andy
                </h6>
                <p class="text-muted-400 font-sans text-xs">Today - 06:30pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
