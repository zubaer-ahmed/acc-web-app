<script setup lang="ts">
const navigation = [
  {
    name: 'Item',
    to: '/item/item',
  },
  {
    name: 'Price List',
    to: '/item/price-list',
  },
  {
    name: 'Inventory Adjustment',
    to: '/item/inventory-adjustment',
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
