<script setup lang="ts">
const navigation = [
  {
    name: 'Transaction',
    to: '/bank/bank-transaction',
  },
  {
    name: 'Transfer',
    to: '/bank/bank-transfer',
  },
  {
    name: 'Adjustment',
    to: '/bank/bank-adjustment',
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
