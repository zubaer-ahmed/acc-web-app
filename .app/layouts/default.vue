<script setup lang="ts">/**
 * Here we use the useLayoutSwitcher() composable to dynamically insert the selected layout component.
 * In this template, the collpase layout is the default layout.
 * We use the vue :is="" feature to render the layout component dynamically.
 */

import { SpeedInsights } from "@vercel/speed-insights/nuxt"
const { activeLayoutComponent } = useLayoutSwitcher()
</script>

<template>
  <SpeedInsights />
  <component :is="activeLayoutComponent">

    <slot />
  </component>
</template>
