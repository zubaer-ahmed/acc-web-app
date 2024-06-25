<script setup lang="ts">

definePageMeta({title: 'Budget Category'})
const route = useRoute()
const router = useRouter()
const tokenCookie = useCookie('token')
const page = computed(() => parseInt((route.query.page as string) ?? '1'))
const filter = ref('')
const perPage = ref(10)
watch([filter, perPage], () => {
  router.push({
    query: {
      page: undefined,
    },
  })
})

const query = computed(() => {
  return {
    filter: filter.value,
    perPage: perPage.value,
    page: page.value,
    token: tokenCookie.value,
  }
})
const {data, pending, error, refresh} = await useFetch(
    '/api/core/account/budget-category/list',
    {
      query,
    },
)
const selected = ref<number[]>([])

const isAllVisibleSelected = computed(() => {
  return selected.value.length === data.value?.data.length
})

function toggleAllVisibleSelection() {
  if (isAllVisibleSelected.value) {
    selected.value = []
  } else {
    selected.value = data.value?.data.map((item: any) => item.uid) ?? []
  }
}
</script>

<template>
  <div>
    <TairoContentWrapper>
      <template #left>
        <BaseInput
            v-model="filter"
            icon="lucide:search"
            placeholder="Filter records..."
            :classes="{
            wrapper: 'w-full sm:w-auto',
          }"
        />
      </template>
      <template #right>
        <BaseButton color="primary" class="w-full sm:w-32" to="/account/budget-category/add">
          <Icon name="lucide:plus" class="h-4 w-4"/>
          <span>Add</span>
        </BaseButton>
        <BaseButton class="w-full sm:w-32">Export</BaseButton>
        <BaseButton class="w-full sm:w-32">Import</BaseButton>

        <BaseSelect
            v-model="perPage"
            placeholder="Items per page"
            label=""
            :classes="{
                  wrapper: 'w-full sm:w-40',
                }"
        >
          <option :value="10">10 per page</option>
          <option :value="25">25 per page</option>
          <option :value="50">50 per page</option>
          <option :value="100">100 per page</option>
        </BaseSelect>
      </template>
      <div>
        <div v-if="!pending && data?.data.length === 0">
          <BasePlaceholderPage title="No matching results"
                               subtitle="Looks like we couldn't find any matching results for your search terms. Try other search terms.">
            <template #image>
              <img class="block dark:hidden" src="/img/illustrations/placeholders/flat/placeholder-search-4.svg"
                   alt="Placeholder image"/>
              <img class="hidden dark:block" src="/img/illustrations/placeholders/flat/placeholder-search-4-dark.svg"
                   alt="Placeholder image"/>
            </template>
          </BasePlaceholderPage>
        </div>
        <div v-else>
          <div class="w-full">
           <TairoTable shape="rounded" class="border-separate">
              <template #header>
                <TairoTableHeading uppercase spaced class="p-4">
                  <BaseCheckbox
                      :model-value="isAllVisibleSelected"
                      :indeterminate="
                        selected.length > 0 && !isAllVisibleSelected"
                      name="table-list"
                      shape="full"
                      class="text-primary-500"
                      @click="toggleAllVisibleSelection"
                  />
                </TairoTableHeading>
                <TairoTableHeading uppercase spaced>Name</TairoTableHeading>
                <TairoTableHeading uppercase spaced>Period</TairoTableHeading>
              </template>

             <!--              selected header start-->
             <TairoTableRow v-if="selected.length==1">
               <div class="w-full">
               <TairoTableCell colspan="12" class="bg-success-100 text-success-700 dark:bg-success-700 dark:text-success-100 p-4">
                  <span>You can either view in full or edit the selected item. You have selected {{ selected.length }} item of the total {{ data?.total }} items.</span>
               </TairoTableCell>
               <TairoTableCell colspan="12" class="bg-success-100 text-success-700 dark:bg-success-700 dark:text-success-100 p-4">
                 <NuxtLink :to="`/account/budget-category/${selected[0]}/view`" class="rounded-lg bg-sky-500/50 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> <span>View </span> </NuxtLink>
               </TairoTableCell>
               <TairoTableCell colspan="12" class="bg-success-100 text-success-700 dark:bg-success-700 dark:text-success-100 p-4">
                 <NuxtLink :to="`/account/budget-category/${selected[0]}/edit`" class="rounded-lg bg-sky-500/50 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> <span>Edit </span> </NuxtLink>
               </TairoTableCell>
               </div>
             </TairoTableRow>
             <TairoTableRow v-if="selected.length>1">
               <div class="w-full">
                 <TairoTableCell colspan="12" class="bg-success-100 text-success-700 dark:bg-success-700 dark:text-success-100 p-4">
                   <span>You can either remove or reinstate all the selected items. You have selected {{ selected.length }} items of the total {{ data?.total }} items.</span>
                 </TairoTableCell>
                 <TairoTableCell colspan="12" class="bg-success-100 text-success-700 dark:bg-success-700 dark:text-success-100 p-4">
                   <BaseButton type="submit" color="primary" class="!h-12 w-full sm:w-40"> <span>Remove </span></BaseButton></TairoTableCell>
                 <TairoTableCell colspan="12" class="bg-success-100 text-success-700 dark:bg-success-700 dark:text-success-100 p-4">
                   <BaseButton type="submit" color="primary" class="!h-12 w-full sm:w-40"> <span>Reinstate </span></BaseButton>
                 </TairoTableCell>
               </div>
             </TairoTableRow>
             <!--              selected header end-->

             <TairoTableRow v-for="item in data?.data" :key="item.uid" class="even:bg-white-200 odd:bg-gray-200">
                <TairoTableCell spaced>
                    <BaseCheckbox v-model="selected" :value="item.uid" :name="`item-checkbox-${item.uid}`" shape="full" class="text-primary-500" />
                </TairoTableCell>
                <TairoTableCell spaced> {{ item.name }}</TairoTableCell>
                <TairoTableCell spaced> {{ item.period }}</TairoTableCell>
              </TairoTableRow>
            </TairoTable>
          </div>
          <div class="mt-6">
            <BasePagination :total-items="data?.total ?? 0" :item-per-page="perPage" :current-page="page"
                            shape="curved"/>
          </div>
        </div>
      </div>
    </TairoContentWrapper>
  </div>
</template>
