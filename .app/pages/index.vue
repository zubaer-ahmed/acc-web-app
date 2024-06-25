<script setup lang="ts">
const show=ref(false);

function changeShow() {
  show.value =true;
}

definePageMeta({
  title: 'Accomium',
  layout: 'landing',
  description:
    'SME Accounting System.',
  breadcrumb: {
    label: 'accomium',
  },
})

</script>

<template>
  <div>
    <LandingHero />
    <LandingLayers />
    <LandingCta @update="changeShow" />
<!--    <ChatBox  v-if="show"/>-->
    <LandingFooter />
  </div>
</template>
