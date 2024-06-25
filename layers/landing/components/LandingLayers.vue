<template>
  <div class="dark:bg-muted-900 bg-white py-24">
    <div class="mx-auto w-full max-w-7xl px-4">
<!--      <div class="mb-10 max-w-2xl">-->
<!--        <BaseText class="text-primary-500 mb-2 text-[0.65rem] uppercase tracking-wider">Made for SME</BaseText>-->
      <div class="text-center">
        <BaseHeading as="h4" size="2xl" weight="light" lead="tight" class="text-muted-800 mx-auto mb-4 dark:text-white"> A versatile experience </BaseHeading>
<!--        <BaseParagraph size="lg" class=" dark:text-muted-100 mx-auto mb-4"> Accomium is built on top on our experience to manage small and medium businesses.-->
<!--          <br>This Accounting System is completely free to use and we are here to help you satisfy your custom demands. </BaseParagraph>-->
<!--      </div>-->
        </div>
      <div class="ptablet:grid-cols-2 grid gap-6 sm:grid-cols-2">
        <LandingLayersBox title="Accounting System" icon="ph:rocket-duotone" to="/accounting-system" color="indigo">
          <BaseParagraph size="sm" class="text-muted-500 dark:text-muted-100 mx-auto mb-4 max-w-2xl">

          Accomium serves as an accounting system, which means it helps businesses and individuals keep track of their financial activities.
          It likely includes features such as ledger management, journal entries, balance sheets, and income statements.
          Accomium is a free Accounting System with all types of forms and reports.
          </BaseParagraph>
        </LandingLayersBox>
        <LandingLayersBox title="Financial Model" icon="ph:sparkle-duotone" to="/financial-model" color="purple">
          <BaseParagraph size="sm" class="text-muted-500 dark:text-muted-100 mx-auto mb-4 max-w-2xl">
          Financial modeling empowers organizations to make informed decisions by projecting future financial outcomes.
          Whether it’s valuing a business, planning growth, or analyzing performance, a well-constructed financial model is an invaluable too.
          We are hoping to build  Financial Models.This is coming soon.
          </BaseParagraph>
        </LandingLayersBox>
        <LandingLayersBox title="Marketplace" icon="ph-sparkle-duotone" to="/marketplace" color="indigo">
          <BaseParagraph size="sm" class="text-muted-500 dark:text-muted-100 mx-auto mb-4 max-w-2xl">
          Marketplace integration refers to the process of connecting your virtual store on an eCommerce platform with various online marketplaces.
          Essentially, it bridges the gap between your store and external marketplaces, enabling seamless interactions.
          We are hoping to integrate all sorts of marketplaces.This is coming soon.
          </BaseParagraph>
        </LandingLayersBox>
        <LandingLayersBox title="ECommerce" icon="ph:rocket-duotone" to="/ecommerce" color="purple">
          <BaseParagraph size="sm" class="text-muted-500 dark:text-muted-100 mx-auto mb-4 max-w-2xl">
          Building an e-commerce system is a comprehensive task, and each step requires careful planning and execution.
          Feel free to ask for more specific guidance, and I’ll be happy to assist.
          We are eager to build your ECommerce. System. We can develop your System and deploy in AWS.
          </BaseParagraph>
        </LandingLayersBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
