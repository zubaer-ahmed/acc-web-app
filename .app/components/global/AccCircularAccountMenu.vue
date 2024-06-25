<script setup lang="ts">
import { ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from "~/stores/auth/user";

const avatarMe = ref(null)
const nameMe = ref(null)
const emailMe = ref(null)
const menuItems = ref([]);

async function fetchUserData() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const uData = {}
    const userStore = useUserStore()
    const { getUs } = storeToRefs(userStore)
    const usData = await userStore.setUs(uData)

    if (usData.data && usData.data) {
      usData.data.filter(item => {
        if (item.me){
          avatarMe.value = item.avatar
          nameMe.value = item.name
          emailMe.value = item.email
          const index = usData.data.indexOf(item);
          if (index > -1) {
            usData.data.splice(index, 1);
          }
        }
      });
      // Setting menu items
      menuItems.value = usData.data.map(item => ({
        name: item.name,
        email: item.email,
        avatar: item.avatar
      }));
    }
  } catch (error) {
    useBugsnag().notify('Some Error')
  }
}

fetchUserData()

async function signout() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const router = useRouter()
    const toaster = useToaster()
    const uData = {}
    const userStore = useUserStore()
    const { getSignout } = storeToRefs(userStore)
    const signoutData = await userStore.setSignout(uData)

    if (signoutData.data && signoutData.data) {
      toaster.clearAll()
      if(signoutData.notification!==undefined){
        await toaster.show({
          title: 'Signout',
          message: ` ${signoutData.notification.message}`,
          color: 'danger',
          icon: 'ph:warning',
          closable: true,
        })
      }else{
        await toaster.show({
          title: 'Signout',
          // message: `Account signed out for ${values.email}`,
          message: `Account signed out`,
          color: 'success',
          icon: 'ph:check',
          closable: true,
        })
        await router.push('/')
      }
    }
  } catch (error) {
    useBugsnag().notify('Some Error')
  }
}
</script>

<template>
  <div class="group inline-flex items-center justify-center text-right">
    <Menu as="div" class="relative h-9 w-9 text-left" v-slot="{ close }">
      <MenuButton as="template">
        <button
          type="button"
          class="group-hover:ring-primary-500 dark:ring-offset-muted-900 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4"
        >
          <div
            class="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
          >
            <img
              :src="avatarMe"
              class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
              alt=""
            />
          </div>
        </button>
      </MenuButton>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute end-0 mt-2 w-64 origin-top-right divide-y rounded-md border bg-white shadow-lg focus:outline-none"
        >
          <div class="p-6 text-center">
            <div
              class="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full"
            >
              <img
                :src="avatarMe"
                class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                alt=""
              />
            </div>
            <div class="mt-3">
              <h6
                class="font-heading text-muted-800 text-sm font-medium dark:text-white"
              >
                {{ nameMe }}
              </h6>
              <p class="text-muted-400 mb-4 font-sans text-xs">
                {{ emailMe }}
              </p>
              <BaseButton
                to="/auth/profile"
                shape="curved"
                class="w-full"
                @click.passive="close"
              >
                Manage Account
              </BaseButton>
            </div>
          </div>
          <div v-for="(menuItem, index) in menuItems" :key="index" class="px-6 py-1.5">
            <MenuItem as="div" v-slot="{ active }">
              <NuxtLink
                to="#"
                class="group flex w-full items-center rounded-md p-2 text-sm transition-colors duration-300"
                :class="[
                  active
                    ? 'bg-muted-100 dark:bg-muted-700 text-primary-500'
                    : 'text-muted-500',
                ]"
                @click.passive="close"
              >
                <div
                  class="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
                >
                  <img
                    :src="menuItem.avatar"
                    class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                    alt=""
                  />
                </div>
                <div class="ms-2">
                  <h6
                    class="font-heading text-muted-800 text-xs font-medium leading-none dark:text-white"
                  >
                    {{ menuItem.name }}
                  </h6>
                  <p class="text-muted-400 font-sans text-xs">
                    {{ menuItem.email }}
                  </p>
                </div>
              </NuxtLink>
            </MenuItem>
          </div>

          <div class="p-6">
            <BaseButton
              @click="signout"
              shape="curved"
              class="w-full"
              @click.passive="close"
            >
              Signout
            </BaseButton>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>
