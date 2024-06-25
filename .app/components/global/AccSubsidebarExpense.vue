<script setup lang="ts">
const navigation = [
  {
    name: 'Expense',
    to: '/expense/expense',
  },
  {
    name: 'Expense Claim',
    to: '/expense/expense-claim',
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
