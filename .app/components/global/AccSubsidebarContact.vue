<script setup lang="ts">
const navigation = [
  {
    name: 'Contact',
    to: '/contact/contact',
  },
]
</script>

<template>
  <TairoSubsidebar>
    <template #header>
      <TairoSubsidebarHeader/>
    </template>

    <TairoSubsidebarMenu :navigation="navigation"/>
  </TairoSubsidebar>
</template>
