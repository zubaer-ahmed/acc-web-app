

export default defineAppConfig({
  nuxtIcon: {},
  nui: {
    defaultShapes: {},
  },
  tairo: {
    title: 'Accomium',
    sidebar: {
      toolbar: {
        showNavBurger: true,
        tools: [
          {
            component: 'AccThemeToggle',
            props: {
              disableTransitions: true,
            },
          },
          {
            component: 'AccToolbarActivity',
          },
          {
            component: 'AccToolbarAccountMenu',
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'AccThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'AccCircularActivity',
          },
          {
            component: 'AccCircularAccountMenu',
          },
        ],
      },
      navigation: {
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-10' },
        },
        items: [
          {
            title: 'Account',
            icon: { name: 'ph:balloon-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarAccount' },
            activePath: '/account',
          },
          {
            title: 'Bank',
            icon: { name: 'ph:basketball-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarBank' },
            activePath: '/bank',
          },
          {
            title: 'Item',
            icon: { name: 'ph:airplane-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarItem' },
            activePath: '/item',
          },
          {
            title: 'Contact',
            icon: { name: 'ph:user-circle-plus-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarContact' },
            activePath: '/contact',
          },

          {
            title: 'Tax',
            icon: { name: 'ph:unite-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarTax' },
            activePath: '/tax',
          },
          {
            title: 'Journal',
            icon: { name: 'ph:traffic-cone-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarJournal' },
            activePath: '/journal',
          },
          {
            title: 'Payment',
            icon: { name: 'ph:tennis-ball-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarPayment' },
            activePath: '/payment',
          },
          {
            title: 'Expense',
            icon: { name: 'ph:bathtub-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarExpense' },
            activePath: '/expense',
          },
          {
            title: 'Sale',
            icon: { name: 'ph:sunglasses-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarSale' },
            activePath: '/sale',
          },
          {
            title: 'Purchase',
            icon: { name: 'ph:suitcase-duotone', class: 'w-5 h-5' },
            subsidebar: { component: 'AccSubsidebarPurchase' },
            activePath: '/purchase',
          },
          {
            title: 'Setting',
            icon: { name: 'ph:gear-six-duotone', class: 'w-5 h-5' },
            to: '/setting/list',
            position: 'end',
          },
        ],
      },
      business: {
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-10' },
        },
        items: [
          {
            title: 'Company',
            icon: { name: 'ph:balloon-duotone', class: 'w-5 h-5' },
            // subsidebar: { component: 'AccSubsidebarAccount' },
            activePath: '/management/company',
          },
          {
            title: 'Cost',
            icon: { name: 'ph:basketball-duotone', class: 'w-5 h-5' },
            // subsidebar: { component: 'AccSubsidebarBank' },
            activePath: '/management/cost',
          },
          {
            title: 'Service',
            icon: { name: 'ph:airplane-duotone', class: 'w-5 h-5' },
            // subsidebar: { component: 'AccSubsidebarItem' },
            activePath: '/management/service',
          },
        ],
      },
    },
    collapse: {
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: true,
        tools: [
          {
            component: 'AccThemeToggle',
          },
          {
            component: 'AccToolbarActivity',
          },
          {
            component: 'AccToolbarAccountMenu',
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'AccThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'AccCircularMenuActivity',
          },
          {
            component: 'AccCircularMenuNotifications',
          },
        ],
      },
      navigation: {
        enabled: true,
        header: {
          component: 'AccCollapseNavigationHeader',
        },
        footer: {
          component: 'AccCollapseNavigationFooter',
        },
        items: [
          {
            name: 'Account',
            icon: { name: 'ph:sidebar-duotone', class: 'w-5 h-5' },
            activePath: '/account',
            children: [
              {
                name: 'Account',
                to: '/account',
                icon: { name: 'ph:coffee-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Account Type',
                to: '/account/account-type',
                icon: { name: 'ph:chart-pie-slice-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Bank Account',
                to: '/account/bank-account',
                icon: { name: 'ph:cactus-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Current Asset',
                to: '/account/current-asset',
                icon: { name: 'ph:gauge-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Budget',
                to: '/account/budget',
                icon: { name: 'ph:coin-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Exchange Rate',
                to: '/account/exchange-rate',
                icon: { name: 'ph:shopping-cart-duotone', class: 'w-4 h-4' },
              },
            ],
          },

          {
            name: 'Divider',
            divider: true,
          },
          {
            name: 'Charts',
            icon: { name: 'ph:chart-pie-slice-duotone', class: 'w-5 h-5' },
            to: '/dashboards/charts',
          },
        ],
      },
    },
    //the below is for landing page topnav
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-10 w-10' },
        },
        header: {
          component: 'AccTopnavWorkspaceDropdown',
        },
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'AccThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'AccCircularMenuLanguage',
          },
          {
            component: 'AccCircularMenuNotifications',
          },
          {
            component: 'AccCircularMenuActivity',
          },
        ],
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: [
          {
            component: 'AccThemeToggle',
            props: {
              disableTransitions: true,
            },
          },
          {
            component: 'AccToolbarSearch',
          },
          {
            component: 'AccToolbarCustomize',
          },
          {
            component: 'AccToolbarNotifications',
          },
          {
            component: 'AccAccountMenu',
            props: {
              horizontal: true,
            },
          },
        ],
      },
    },
    error: {
      logo: {
        component: 'img',
        props: {
          src: '/img/illustrations/system/404-1.svg',
          class: 'relative z-20 w-full max-w-lg mx-auto',
        },
      },
    },
  },
})
