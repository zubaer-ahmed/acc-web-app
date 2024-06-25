<script setup lang="ts">
definePageMeta({
  title: 'Feature',
  layout: 'landing',
  // preview: {
  //   title: ' Feature',
  //   description: 'Accounting System',
  //   categories: ['layouts'],
  //   src: '/img/screens/layouts-subpages-billing.png',
  //   srcDark: '/img/screens/layouts-subpages-billing-dark.png',
  //   order: 84,
  // },
})

const customRadio = ref('statement')

const plans = [
  {
    name: 'statement',
    description:
      'Financial Statement Modeling.',
    price: {
      onetime: 200,
    },
    features: ['P&L', 'Income', 'Balance Sheet'],
    benefits: [
      'Analysis of Historical Data',
      'Customer Support',
      'Data Migration Support',
    ],
  },
  {
    name: 'forecasting',
    description:
      'Business Forecasting to gain Insights.',
    price: {
      onetime: 500,
    },
    features: ['History', 'Present', 'Prediction'],
    benefits: [
      'Analysis of Historical Data',
      'Customer Support',
      'Data Migration Support',
    ],
  },
  {
    name: 'valuation',
    description:
      'Business Valuation for getting Leverage.',
    price: {
      onetime: 1000,
    },
    features: ['Performance', 'Valuation', 'Circumstances'],
    benefits: [
      'Analysis of Historical Data',
      'Customer Support',
      'Data Migration Support',
    ],
  },
  {
    name: 'uncertainty',
    description:
      'Sensitivity and Scenario Analysis.',
    price: {
      onetime: 2000,
    },
    features: ['Sensitivity', 'Scenario', 'Monte Carlo'],
    benefits: [
      'Analysis of Historical Data',
      'Customer Support',
      'Data Migration Support',
    ],
  },
]

const selectedPlan = computed(() => {
  return plans.find((plan) => plan.name === customRadio.value)
})

const planColor = computed(() => {
  switch (customRadio.value) {
    case 'statement':
      return 'text-success-500'
    case 'forecasting':
      return 'text-yellow-400'
    case 'valuation':
      return 'text-indigo-500'
    case 'uncertainty':
      return 'text-primary-500'
  }
})

const cardInfo = ref({
  name: undefined,
  number: undefined,
  expiryYear: undefined,
  expiryMonth: undefined,
  cvc: undefined,
})

const billingCycles = ref('monthly')
</script>

<template>
  <form
    action=""
    method="POST"
    @submit.prevent
    class="mx-auto w-full max-w-4xl pb-16"
  >
    <!-- Header -->
    <div class="mb-8 flex flex-col justify-between md:flex-row md:items-center">
      <div
        class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full"
      >
        <BaseAvatar src="/img/avatars/2.svg" size="lg" />
        <div>
          <BaseHeading
            as="h2"
            size="xl"
            weight="light"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>Financial Modeling</span>
          </BaseHeading>
          <BaseParagraph>
            <span class="text-muted-500">
              Select that fits your need
            </span>
          </BaseParagraph>
        </div>
      </div>
      <div
        class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start"
      >
        <BaseButton type="submit" color="primary">
          <span>Pay </span>
          <span class="font-semibold">${{ selectedPlan?.price.onetime }}</span>
          <span> one time</span>
        </BaseButton>
      </div>
    </div>
    <!-- plans -->
    <div
      class="dark:border-muted-800 mb-10 grid gap-4 border-b border-gray-200 pb-10 md:grid-cols-2 xl:gap-8"
    >
      <div class="grid grid-cols-2 gap-2 xl:gap-6">
        <BaseRadioHeadless
          v-model="customRadio"
          name="radio_custom"
          value="statement"
        >
          <BaseCard
            shape="rounded"
            class="text-muted-400/50 peer-checked:!border-success-500 peer-checked:text-success-500 group relative p-6 text-center peer-checked:[&_.child]:!opacity-100"
          >
            <div
              class="child border-muted-200 dark:border-muted-700 dark:bg-muted-800 absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border bg-white opacity-0"
            >
              <Icon name="lucide:check" class="h-3 w-3 text-current" />
            </div>
            <TairoLogo class="mx-auto mb-2 h-9 w-9" />
            <BaseHeading
              as="h4"
              size="sm"
              weight="medium"
              class="text-muted-800 dark:text-white"
            >
              Statement
            </BaseHeading>
            <BaseText size="xs" lead="tight" class="text-muted-400"
            >A necessary thing  for  SME(Small and Medium Enterprise)</BaseText
            >
          </BaseCard>
        </BaseRadioHeadless>
        <BaseRadioHeadless
          v-model="customRadio"
          name="radio_custom"
          value="forecasting"
        >
          <BaseCard
            shape="rounded"
            class="text-muted-400/50 group relative p-6 text-center peer-checked:!border-yellow-400 peer-checked:text-yellow-400 peer-checked:[&_.child]:!opacity-100"
          >
            <div
              class="child border-muted-200 dark:border-muted-700 dark:bg-muted-800 absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border bg-white opacity-0"
            >
              <Icon name="lucide:check" class="h-3 w-3 text-current" />
            </div>
            <TairoLogo class="mx-auto mb-2 h-9 w-9" />
            <BaseHeading
              as="h4"
              size="sm"
              weight="medium"
              class="text-muted-800 dark:text-white"
            >
              Forecasting
            </BaseHeading>
            <BaseText size="xs" lead="tight" class="text-muted-400"
            >A necessary thing for all sort of Businesses</BaseText
            >
          </BaseCard>
        </BaseRadioHeadless>
        <BaseRadioHeadless
          v-model="customRadio"
          name="radio_custom"
          value="valuation"
        >
          <BaseCard
            shape="rounded"
            class="text-muted-400/50 group relative p-6 text-center peer-checked:!border-indigo-500 peer-checked:text-indigo-500 peer-checked:[&_.child]:!opacity-100"
          >
            <div
              class="child border-muted-200 dark:border-muted-700 dark:bg-muted-800 absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border bg-white opacity-0"
            >
              <Icon name="lucide:check" class="h-3 w-3 text-current" />
            </div>
            <TairoLogo class="mx-auto mb-2 h-9 w-9" />
            <BaseHeading
              as="h4"
              size="sm"
              weight="medium"
              class="text-muted-800 dark:text-white"
            >
              Valuation
            </BaseHeading>
            <BaseText size="xs" lead="tight" class="text-muted-400"
            >A necessary thing for all medium kind of Businesses</BaseText
            >
          </BaseCard>
        </BaseRadioHeadless>
        <BaseRadioHeadless
          v-model="customRadio"
          name="radio_custom"
          value="uncertainty"
        >
          <BaseCard
            shape="rounded"
            class="text-muted-400/50 peer-checked:!border-primary-500 peer-checked:text-primary-500 group relative p-6 text-center peer-checked:[&_.child]:!opacity-100"
          >
            <div
              class="child border-muted-200 dark:border-muted-700 dark:bg-muted-800 absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border bg-white opacity-0"
            >
              <Icon name="lucide:check" class="h-3 w-3 text-current" />
            </div>
            <TairoLogo class="mx-auto mb-2 h-9 w-9" />
            <BaseHeading
              as="h4"
              size="sm"
              weight="medium"
              class="text-muted-800 dark:text-white"
            >
              Uncertainty
            </BaseHeading>
            <BaseText size="xs" lead="tight" class="text-muted-400"
            >A necessary thing for all large kind of Businesses</BaseText
            >
          </BaseCard>
        </BaseRadioHeadless>
      </div>
      <div>
        <BaseCard shape="rounded" class="p-8">
          <div class="flex gap-12">
            <TairoLogo class="h-12 w-12 shrink-0" :class="planColor" />
            <div>
              <BaseText size="md" lead="tight" weight="semibold"
              >${{ selectedPlan?.price.onetime }}
                <span class="text-muted-400 font-normal"
                >one  time</span
                ></BaseText
              >
<!--              <BaseText size="xs" lead="tight" class="mb-2" :class="planColor"-->
<!--              >Billed ${{ selectedPlan?.price.yearly }} yearly</BaseText-->
<!--              >-->
              <BaseParagraph
                size="xs"
                class="text-muted-500 dark:text-muted-400"
              >
                {{ selectedPlan?.description }}
              </BaseParagraph>
            </div>
          </div>
          <div class="my-4">
            <BaseParagraph
              size="sm"
              lead="tight"
              class="text-muted-500 dark:text-muted-400"
            >
              Accomium has incredible features and each plan perfectly adapts to
              your company, whether it is a small business or a bigger one. Accomium
              can also scale smoothly with you, as your business grows.
            </BaseParagraph>
          </div>
          <div class="grid grid-cols-2 gap-6 font-sans text-xs">
            <div>
              <ul>
                <li
                  v-for="item in selectedPlan?.features"
                  :key="item"
                  class="flex items-center gap-2"
                  :class="planColor"
                >
                  <Icon name="lucide:check" class="h-3 w-3 text-current" />
                  <span class="text-muted-400">{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li
                  v-for="item in selectedPlan?.benefits"
                  :key="item"
                  class="flex items-center gap-2"
                  :class="planColor"
                >
                  <Icon name="lucide:check" class="h-3 w-3 text-current" />
                  <span class="text-muted-400">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
    <!-- Controls -->
    <div class="grid grid-cols-12 gap-6">
      <div class="ltablet:col-span-7 col-span-12 sm:col-span-6 lg:col-span-7">
        <div class="flex flex-col gap-6">
          <!--          <BaseCard class="p-6">-->
          <!--            <div class="mb-4 flex items-center justify-between">-->
          <!--              <BaseHeading as="h4" size="sm" weight="semibold">-->
          <!--                Used seats-->
          <!--              </BaseHeading>-->
          <!--              <div>-->
          <!--                <BaseText size="xs" lead="tight" class="text-muted-400"-->
          <!--                >6/8 remaining</BaseText-->
          <!--                >-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div-->
          <!--              class="xs:flex-wrap ptablet:flex-wrap ltablet:justify-between flex items-center gap-2 lg:justify-between"-->
          <!--            >-->
          <!--              <div-->
          <!--                class="xs:flex-wrap ptablet:flex-wrap flex items-center gap-2"-->
          <!--              >-->
          <!--                <BaseAvatar-->
          <!--                  src="/img/avatars/2.svg"-->
          <!--                  size="sm"-->
          <!--                  data-nui-tooltip="Maya R."-->
          <!--                />-->
          <!--                <BaseAvatar-->
          <!--                  src="/img/avatars/10.svg"-->
          <!--                  size="sm"-->
          <!--                  data-nui-tooltip="Kendra W."-->
          <!--                />-->
          <!--                <BaseAvatar-->
          <!--                  size="sm"-->
          <!--                  text="OD"-->
          <!--                  data-nui-tooltip="Oliver D."-->
          <!--                  :class="getRandomColor()"-->
          <!--                />-->
          <!--                <BaseAvatar-->
          <!--                  src="/img/avatars/16.svg"-->
          <!--                  size="sm"-->
          <!--                  data-nui-tooltip="Hermann M."-->
          <!--                />-->
          <!--                <BaseAvatar-->
          <!--                  size="sm"-->
          <!--                  text="MC"-->
          <!--                  data-nui-tooltip="Matteus C."-->
          <!--                  :class="getRandomColor()"-->
          <!--                />-->
          <!--                <BaseAvatar-->
          <!--                  size="sm"-->
          <!--                  text="GM"-->
          <!--                  data-nui-tooltip="Gorav M."-->
          <!--                  :class="getRandomColor()"-->
          <!--                />-->
          <!--              </div>-->
          <!--              <div>-->
          <!--                <button-->
          <!--                  type="button"-->
          <!--                  class="border-muted-200 dark:border-muted-700 hover:border-primary-500 dark:hover:border-primary-500 text-muted-400 dark:text-muted-600 hover:text-primary-500 dark:hover:text-primary-500 h-10 w-10 rounded-full border-2 border-dashed transition-all duration-300 hover:border-solid"-->
          <!--                  data-nui-tooltip="Manage plan seats"-->
          <!--                >-->
          <!--                  <Icon name="lucide:edit-3" class="h-4 w-4" />-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </BaseCard>-->
          <BaseCard class="p-6">
            <div class="mb-8 flex items-center justify-between">
              <BaseHeading as="h4" size="sm" weight="semibold">
                Billing options
              </BaseHeading>
              <div>
                <BaseText
                  size="xs"
                  lead="tight"
                  class="text-muted-400"
                ></BaseText>
              </div>
            </div>
            <div class="space-y-6">
              <BaseSwitchBall
                id="billing-ball-1"
                :model-value="false"
                label="Invoicing"
                sublabel="Send new invoices to my inbox"
                color="primary"
              />
            </div>
          </BaseCard>
        </div>
      </div>
      <div class="ltablet:col-span-5 col-span-12 sm:col-span-6 lg:col-span-5">
        <BaseCard class="p-6">
          <div class="mb-4">
            <BaseHeading as="h4" size="sm" weight="semibold">
              Payment information
            </BaseHeading>
          </div>
          <DemoCreditCardReal
            :name="cardInfo.name"
            :number="cardInfo.number"
            :expiry-month="cardInfo.expiryMonth"
            :expiry-year="cardInfo.expiryMonth"
            :cvc="cardInfo.cvc"
          />
          <div class="mt-5">
            <form>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12">
                  <BaseInput
                    v-model="cardInfo.name"
                    label="Name on card"
                    placeholder="ex: John Doe"
                  />
                </div>
                <div class="col-span-12">
                  <BaseInput
                    v-model="cardInfo.number"
                    label="Card number"
                    placeholder="ex: 4242 4242 4242 4242"
                  />
                </div>
                <div class="col-span-12">
                  <div class="grid gap-4 sm:grid-cols-3">
                    <div>
                      <BaseSelect
                        v-model="cardInfo.expiryMonth"
                        label="Exp. month"
                      >
                        <option value="">Month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </BaseSelect>
                    </div>
                    <div>
                      <BaseSelect
                        v-model="cardInfo.expiryYear"
                        label="Exp. month"
                      >
                        <option value="">Year</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                      </BaseSelect>
                    </div>
                    <div>
                      <BaseInput
                        v-model="cardInfo.cvc"
                        label="CVC"
                        placeholder="ex: 239"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </BaseCard>
      </div>
    </div>
    <TairoFormSave>
      <BaseButton type="submit" color="primary" class="w-full">
        <span>Pay </span>
        <span class="font-semibold">${{ selectedPlan?.price.onetime }}</span>
        <span> one time</span>
      </BaseButton>
    </TairoFormSave>
  </form>
</template>
