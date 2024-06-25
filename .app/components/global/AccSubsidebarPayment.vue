<script setup lang="ts">
const navigation = [
  {
    name: 'Payment Service',
    to: '/payment/payment-service',
  },
  {
    name: 'Business Payment',
    to: '/payment/business-payment',
  },
  {
    name: 'Customer Payment',
    to: '/payment/customer-payment',
  },
  {
    name: 'Prepayment',
    to: '/payment/pre-payment',
  },
  {
    name: 'Overpayment',
    to: '/payment/over-payment',
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
