<script setup lang="ts">
const navigation = [
  {
    name: 'Tax',
    to: '/tax/tax',
  },
  {
    name: 'Tax Authority',
    to: '/tax/tax-authority',
  },
  {
    name: 'Tax Rate',
    to: '/tax/tax-rate',
  },
  {
    name: 'Tax Exemption',
    to: '/tax/tax-exemption',
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
