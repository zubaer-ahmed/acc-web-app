/**
 * This composable is used in conjunction with the LayoutSwitcher component.
 * It provides a simple way to switch between different layouts, for demo purposes.
 * Layout components are imported below to be made available to the composable.
 */

import {
  TairoCollapseLayout,
  TairoSidebarLayoutBusiness,
  TairoTopnavLayout,
} from '#components'

export function useLayoutBusiness() {
  console.log('i am in business useLayoutBusiness')
  const layouts = [
    {
      name: 'sidebar',
      label: 'Sidebar',
      component: TairoSidebarLayoutBusiness,
    },
    {
      name: 'collapse',
      label: 'Collapse',
      component: TairoCollapseLayout,
    },
    {
      name: 'topnav',
      label: 'Top navigation',
      component: TairoTopnavLayout,
    },
  ] as const

  const activeLayoutName = useState('layout-business-active', () => 'sidebar')
  const activeLayout = computed(() => {
    return layouts.find((layout) => layout.name === activeLayoutName.value)
  })
  const activeLayoutComponent = computed(() => {
    return activeLayout.value?.component || TairoSidebarLayoutBusiness
  })

  return {
    layouts,
    activeLayout,
    activeLayoutName,
    activeLayoutComponent,
  }
}
