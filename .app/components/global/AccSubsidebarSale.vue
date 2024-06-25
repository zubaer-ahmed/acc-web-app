<script setup lang="ts">
const navigation = [
  {
    name: 'Order',
    to: '/sale/order',
  },
  {
    name: 'Estimate',
    to: '/sale/estimate',
  },
  {
    name: 'Invoice',
    to: '/sale/invoice',
  },
  {
    name: 'Credit Note',
    to: '/sale/credit-note',
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
