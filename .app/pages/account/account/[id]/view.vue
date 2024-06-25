<script setup lang="ts">
definePageMeta({title: 'Read Account'})
const route = useRoute()
const segments = route.path.split('/');
const uid=segments[segments.length-2]
const tokenCookie = useCookie('token')
const query = computed(() => {
  return {
    token: tokenCookie.value,
    uid: uid,
  }
})

//OBJECT TRAVERSAL AND CONVERSION
const {data, pending, error, refresh} = await useFetch('/api/core/account/account/read', {query})
let keys: any=[];
let vals: any=[];
if(data.value!==null){
  Object.keys(data.value?.data).forEach(function(key: any) {
    keys.push(key.replaceAll("do_", " ").replaceAll("is_", " ").replaceAll("_", " ").toUpperCase())
    vals.push(data.value?.data[key])
  });
}
</script>

<template>
  <div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
    <div class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full">
      <BaseHeading as="h2" size="xl" weight="light" lead="bold" class="text-muted-800 dark:text-white">
        <span>Account</span>
      </BaseHeading>
      <NuxtLink to="" class="rounded-lg bg-sky-500/50 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> <span>Info </span> </NuxtLink>
    </div>
    <div class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start">
      <BaseButtonAction @click.prevent="$router.back()">
        <Icon name="lucide:arrow-left" class="h-3 w-3" />
        <span>Cancel</span>
      </BaseButtonAction>
    </div>
  </div>
  <TairoTable shape="rounded" class="border-separate">
    <template #header>
      <TairoTableHeading uppercase spaced>Attribute</TairoTableHeading>
      <TairoTableHeading uppercase spaced>Value</TairoTableHeading>
    </template>
    <TairoTableRow v-for="(item, index) in keys" class="even:bg-white-200 odd:bg-gray-200">
      <TairoTableCell spaced> {{item}}</TairoTableCell>
      <TairoTableCell spaced> {{vals[index]}}</TairoTableCell>
    </TairoTableRow>
  </TairoTable>
</template>
