<script setup lang="ts">
const navigation = [
  {
    name: 'Bill',
    to: '/purchase/bill',
  },
  {
    name: 'Vendor Credit',
    to: '/purchase/vendor-credit',
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
