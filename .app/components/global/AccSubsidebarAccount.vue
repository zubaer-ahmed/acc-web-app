<script setup lang="ts">
const navigation = [
  {
    name: 'Account',
    to: '/account/account',
  },
  {
    name: 'Account Type',
    to: '/account/account-type',
  },
  {
    name: 'Account Type Locking',
    to: '/account/account-type-locking',
  },
  {
    name: 'Bank Account',
    to: '/account/bank-account',
  },
  {
    name: 'Current Asset',
    to: '/account/current-asset',
  },
  {
    name: 'Fixed Asset',
    to: '/account/fixed-asset',
  },
  {
    name: 'Budget',
    to: '/account/budget',
  },
  {
    name: 'Exchange Rate',
    to: '/account/exchange-rate',
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
