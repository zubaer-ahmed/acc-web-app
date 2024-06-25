<script setup lang="ts">
const workspaces = ref([
  {
    id: 1,
    name: 'Accounting System',
    logo: '/img/icons/logos/flashlite.svg',
  },
  {
    id: 2,
    name: 'Financial Model',
    logo: '/img/icons/logos/flashlite.svg',
  },
  {
    id: 3,
    name: 'Marketplace',
    logo: '/img/icons/logos/flashlite.svg',
  },
  {
    id: 4,
    name: 'ECommerce',
    logo: '/img/icons/logos/flashlite.svg',
  },
])

const selectedWorkspace = ref(workspaces.value[0])
const target = ref(null)
const open = ref(false)

function openDropdown() {
  open.value = true
}

onClickOutside(target, () => (open.value = false))

function setWorkspace(workspace: any) {
  selectedWorkspace.value = workspace
  open.value = false
}
</script>

<template>
<!--  <div-->
<!--    ref="target"-->
<!--    class="relative w-full z-10 group/workspace max-w-[170px] md:max-w-[240px] ms-auto md:ms-0"-->
<!--  >-->
<!--    <button-->
<!--      type="button"-->
<!--      class="w-full py-2 ps-2 pe-3 group-hover/workspace:bg-muted-100 dark:group-hover/workspace:bg-muted-900/60 rounded-xl max-w-[170px] md:max-w-[240px] transition-colors duration-300"-->
<!--      :class="open && 'bg-muted-100 dark:bg-muted-900/60'"-->
<!--      @click="openDropdown()"-->
<!--    >-->
<!--      <span class="w-full flex items-center gap-3 text-start">-->
<!--&lt;!&ndash;        <BaseAvatar size="xxs" :src="selectedWorkspace.logo" />&ndash;&gt;-->
<!--        <div>-->
<!--          <BaseText-->
<!--            size="sm"-->
<!--            class="block text-muted-800 dark:text-muted-200 line-clamp-1"-->
<!--          >-->
<!--            {{ selectedWorkspace.name }}-->
<!--          </BaseText>-->
<!--        </div>-->
<!--        <Icon-->
<!--          name="lucide:chevrons-up-down"-->
<!--          class="w-4 h-4 ms-auto text-muted-400 transition-transform duration-300"-->
<!--          :class="open && 'rotate-180'"-->
<!--        />-->
<!--      </span>-->
<!--    </button>-->
<!--    <Transition-->
<!--      enter-active-class="transition duration-100 ease-out"-->
<!--      enter-from-class="transform scale-95 opacity-0"-->
<!--      enter-to-class="transform scale-100 opacity-100"-->
<!--      leave-active-class="transition duration-75 ease-in"-->
<!--      leave-from-class="transform scale-100 opacity-100"-->
<!--      leave-to-class="transform scale-95 opacity-0"-->
<!--    >-->
<!--      &lt;!&ndash;Menu&ndash;&gt;-->
<!--      <div-->
<!--        v-if="open"-->
<!--        class="absolute overflow-hidden min-w-[280px] md:min-w-[575px] top-12 end-0 md:start-0 w-full rounded-xl border border-muted-200 dark:border-muted-800 bg-white dark:bg-muted-950 shadow-xl shadow-muted-400/10 dark:shadow-muted-800/10"-->
<!--      >-->
<!--        <div-->
<!--          class="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-muted-200 md:dark:divide-muted-700"-->
<!--        >-->
<!--          <div>-->
<!--&lt;!&ndash;            <div&ndash;&gt;-->
<!--&lt;!&ndash;              class="flex items-center border-b border-muted-200 dark:border-muted-700"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--              &lt;!&ndash;              <BaseInput&ndash;&gt;-->
<!--              &lt;!&ndash;                icon="lucide:search"&ndash;&gt;-->
<!--              &lt;!&ndash;                placeholder="Find a team..."&ndash;&gt;-->
<!--              &lt;!&ndash;                :classes="{&ndash;&gt;-->
<!--              &lt;!&ndash;                  input: 'border-none !outline-none !bg-transparent',&ndash;&gt;-->
<!--              &lt;!&ndash;                }"&ndash;&gt;-->
<!--              &lt;!&ndash;              />&ndash;&gt;-->
<!--              &lt;!&ndash;              <button&ndash;&gt;-->
<!--              &lt;!&ndash;                type="button"&ndash;&gt;-->
<!--              &lt;!&ndash;                class="px-2 py-1 rounded-lg border border-muted-200 dark:border-muted-700 ms-auto me-2"&ndash;&gt;-->
<!--              &lt;!&ndash;              >&ndash;&gt;-->
<!--              &lt;!&ndash;                <BaseText size="xs">Esc</BaseText>&ndash;&gt;-->
<!--              &lt;!&ndash;              </button>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--                        <div class="p-3 flex flex-col h-[calc(100%_-_2.5rem)]">-->

<!--              <BaseHeading-->
<!--                as="h4"-->
<!--                size="sm"-->
<!--                weight="medium"-->
<!--                class="text-muted-400"-->
<!--              >Services-->
<!--              </BaseHeading-->
<!--              >-->
<!--              <div class="my-3">-->
<!--                <ul class="space-y-1">-->
<!--                  <li v-for="workspace in workspaces" :key="workspace.id">-->
<!--                    <button-->
<!--                      type="button"-->
<!--                      class="flex items-center gap-2 py-2 ps-2 pe-4 rounded-lg hover:bg-muted-100 dark:hover:bg-muted-800 w-full transition-colors duration-200"-->
<!--                      @click="setWorkspace(workspace)"-->
<!--                    >-->
<!--                      <BaseAvatar size="xxs" :src="workspace.logo"/>-->
<!--                      <BaseText size="sm">{{ workspace.name }}</BaseText>-->
<!--                      <Icon-->
<!--                        v-if="selectedWorkspace === workspace"-->
<!--                        name="lucide:check"-->
<!--                        class="w-4 h-4 text-primary-500 ms-auto"-->
<!--                      />-->
<!--                    </button>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--              &lt;!&ndash;              <div class="mt-auto">&ndash;&gt;-->
<!--              &lt;!&ndash;                <BaseButton shape="smooth" class="w-full">&ndash;&gt;-->
<!--              &lt;!&ndash;                  <Icon name="lucide:plus" class="w-4 h-4" />&ndash;&gt;-->
<!--              &lt;!&ndash;                  <span>Create Workspace</span>&ndash;&gt;-->
<!--              &lt;!&ndash;                </BaseButton>&ndash;&gt;-->
<!--              &lt;!&ndash;              </div>&ndash;&gt;-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="hidden md:block">-->
<!--            &lt;!&ndash;            <div&ndash;&gt;-->
<!--            &lt;!&ndash;              class="flex items-center border-b border-muted-200 dark:border-muted-700"&ndash;&gt;-->
<!--            &lt;!&ndash;            >&ndash;&gt;-->
<!--            &lt;!&ndash;              <BaseInput&ndash;&gt;-->
<!--            &lt;!&ndash;                icon="lucide:search"&ndash;&gt;-->
<!--            &lt;!&ndash;                placeholder="Find project..."&ndash;&gt;-->
<!--            &lt;!&ndash;                :classes="{&ndash;&gt;-->
<!--            &lt;!&ndash;                  input: 'border-none !outline-none !bg-transparent',&ndash;&gt;-->
<!--            &lt;!&ndash;                }"&ndash;&gt;-->
<!--            &lt;!&ndash;              />&ndash;&gt;-->
<!--            &lt;!&ndash;              <button&ndash;&gt;-->
<!--            &lt;!&ndash;                type="button"&ndash;&gt;-->
<!--            &lt;!&ndash;                class="px-2 py-1 rounded-lg border border-muted-200 dark:border-muted-700 ms-auto me-2"&ndash;&gt;-->
<!--            &lt;!&ndash;              >&ndash;&gt;-->
<!--            &lt;!&ndash;                <BaseText size="xs">Esc</BaseText>&ndash;&gt;-->
<!--            &lt;!&ndash;              </button>&ndash;&gt;-->
<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--            &lt;!&ndash;            <div class="p-3 flex flex-col h-[calc(100%_-_2.5rem)]">&ndash;&gt;-->
<!--            &lt;!&ndash;              <BaseHeading&ndash;&gt;-->
<!--            &lt;!&ndash;                as="h4"&ndash;&gt;-->
<!--            &lt;!&ndash;                size="sm"&ndash;&gt;-->
<!--            &lt;!&ndash;                weight="medium"&ndash;&gt;-->
<!--            &lt;!&ndash;                class="text-muted-400"&ndash;&gt;-->
<!--            &lt;!&ndash;                >Projects</BaseHeading&ndash;&gt;-->
<!--            &lt;!&ndash;              >&ndash;&gt;-->
<!--            &lt;!&ndash;              <div class="my-3">&ndash;&gt;-->
<!--            &lt;!&ndash;                <ul>&ndash;&gt;-->
<!--            &lt;!&ndash;                  <li>&ndash;&gt;-->
<!--            &lt;!&ndash;                    <div>&ndash;&gt;-->
<!--            &lt;!&ndash;                      <BaseHeading size="sm" weight="medium"&ndash;&gt;-->
<!--            &lt;!&ndash;                        >No projects yet</BaseHeading&ndash;&gt;-->
<!--            &lt;!&ndash;                      >&ndash;&gt;-->
<!--            &lt;!&ndash;                      <BaseParagraph size="xs" class="text-muted-400"&ndash;&gt;-->
<!--            &lt;!&ndash;                        >This workspace has no projects.</BaseParagraph&ndash;&gt;-->
<!--            &lt;!&ndash;                      >&ndash;&gt;-->
<!--            &lt;!&ndash;                    </div>&ndash;&gt;-->
<!--            &lt;!&ndash;                  </li>&ndash;&gt;-->
<!--            &lt;!&ndash;                </ul>&ndash;&gt;-->
<!--            &lt;!&ndash;              </div>&ndash;&gt;-->
<!--            &lt;!&ndash;              <div class="mt-auto">&ndash;&gt;-->
<!--            &lt;!&ndash;                <BaseButton shape="smooth" class="w-full">&ndash;&gt;-->
<!--            &lt;!&ndash;                  <Icon name="lucide:plus" class="w-4 h-4" />&ndash;&gt;-->
<!--            &lt;!&ndash;                  <span>Create Project</span>&ndash;&gt;-->
<!--            &lt;!&ndash;                </BaseButton>&ndash;&gt;-->
<!--            &lt;!&ndash;              </div>&ndash;&gt;-->
<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </Transition>-->
<!--  </div>-->
</template>
