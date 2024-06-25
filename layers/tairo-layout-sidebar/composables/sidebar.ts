export function useSidebar() {
  const app = useAppConfig()
  const route = useRoute()

  const sidebars = computed(() => {
    if (
      app.tairo.sidebar?.navigation?.enabled === false ||
      app.tairo.sidebar?.navigation?.items?.length === 0
    ) {
      return []
    }
    return app.tairo.sidebar?.navigation?.items
  })

  const currentName = useState('sidebar-name', () => '')
  const isOpen = useState<boolean | undefined>('sidebar-open', () => undefined)

  const hasSubsidebar = computed(() => {
    return sidebars.value?.some((sidebar) => sidebar.subsidebar?.component)
  })

  const current = computed(() => {
    if (!currentName.value) {
      return undefined
    }
    return sidebars.value?.find(({ title }) => title === currentName.value)
  })

  function toggle() {
    // If no sidebar item is selected, open the first one
    if (!currentName.value && !isOpen.value) {
      if (!sidebars.value?.[0]?.title) {
        // No sidebar items defined
        return
      }

      // Select the first sidebar item by default
      currentName.value = sidebars.value[0].title
    }

    isOpen.value = !isOpen.value
  }

  function close(unselect = false) {
    isOpen.value = false
    if (unselect) {
      currentName.value = ''
    }
  }

  function open(name: string) {
    currentName.value = name
    isOpen.value = true
  }

  function detect() {
    if (!app.tairo.sidebar?.navigation?.startOpen) {
      isOpen.value = false
      return
    }

    const item = sidebars.value?.find(
      (bar) => bar?.activePath && route.fullPath.startsWith(bar.activePath),
    )
    if (item) {
      currentName.value = item.title
      if (!process.client) {
        isOpen.value = Boolean(currentName.value)
      } else {
        const isXl = useTailwindBreakpoints().xl.value
        isOpen.value = Boolean(currentName.value) && isXl
      }
    }
    return
  }

  function setup() {
    // Detect sidebar item on server page load
    if (!process.client) {
      detect()
      return
    }

    // Detect sidebar item on client page change
    // page:finish allow to wait for the page to be fully loaded before detecting the sidebar item
    const nuxtApp = useNuxtApp()
    const removeHook = nuxtApp.hook('page:finish', (e) => {
      detect()
      removeHook()
      return
    })

    // register a watcher to close sidebar when screen become extra large
    const { xl } = useTailwindBreakpoints()
    // close sidebar when screen become extra large
    watch(xl, (isXl) => {
      if (!isXl) {
        isOpen.value = false
      }
    })

    // register a watcher to open sidebar when a sidebar item is selected
    watch(
      () => currentName,
      (value) => {
        if (value) {
          // only open sidebar if it's not already open
          // and the screen is not extra large
          if (xl.value) {
            isOpen.value = true
          }
        } else {
          isOpen.value = false
        }
      },
    )
  }

  return {
    sidebars,
    hasSubsidebar,
    current,
    currentName,
    isOpen,
    toggle,
    close,
    open,
    detect,
    setup,
  }
}
