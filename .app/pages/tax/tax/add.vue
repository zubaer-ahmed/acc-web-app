<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})

const item=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]

const authorityCode=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]

const exemptionCode=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]


const purchaseTaxRateCode=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]
const currencyCode=[
  {
    code: "USD",
    name: 'USD'
  },
  {
    code: "GBP",
    name: 'GBP'
  },
  {
    code: "BDT",
    name: 'BDT'
  },
]
const VALIDATION_TEXT = {
  ITEM_UID_REQUIRED: "Item UID is required.",
  AUTHORITY_CODE_REQUIRED: "Authority Code is required.",
  EXEMPTION_CODE_REQUIRED: "Exemption Code is required.",
  PURCHASE_TAX_RATE_CODE_REQUIRED: "Purchase Tax Rate Code is required.",
  SALE_TAX_RATE_CODE_REQUIRED: "Sale Tax Rate Code is required.",
  PURCHASE_TAX_PCT_REQUIRED: "Purchase Tax Pct is required.",
  SALE_TAX_PCT_REQUIRED: "Sale Tax Pct is required.",
  PURCHASE_TAX_AMOUNT_REQUIRED: "Purchase Tax Amount is required.",
  SALE_TAX_AMOUNT_REQUIRED: "Sale Tax Amount is required.",
  TAX_HEIGHT_REQUIRED: "Tax Height is required.",
}
const zodSchema = z
    .object({
      item_uid:z.string(),
      authority_code:z.string(),
      exemption_code:z.string(),
      purchase_tax_rate_code:z.string(),
      sale_tax_rate_code:z.string(),
      purchase_tax_pct:z.string(),
      sale_tax_pct:z.string(),
      purchase_tax_amount:z.string(),
      sale_tax_amount:z.string(),
      tax_height:z.string(),
    })
    .superRefine((data, ctx) => {
      if (!data.item_uid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.ITEM_UID_REQUIRED,
          path: ['item_uid'],
        })
      }
      if (!data.authority_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.AUTHORITY_CODE_REQUIRED,
          path: ['authority_code'],
        })
      }
      if (!data.exemption_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.EXEMPTION_CODE_REQUIRED,
          path: ['exemption_code'],
        })
      }
      if (!data.purchase_tax_rate_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.PURCHASE_TAX_RATE_CODE_REQUIRED,
          path: ['purchase_tax_rate_code'],
        })
      }
      if (!data.sale_tax_rate_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.SALE_TAX_RATE_CODE_REQUIRED,
          path: ['sale_tax_rate_code'],
        })
      }
      if (!data.purchase_tax_pct) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.PURCHASE_TAX_PCT_REQUIRED,
          path: ['purchase_tax_pct'],
        })
      }
      if (!data.sale_tax_pct) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.SALE_TAX_PCT_REQUIRED,
          path: ['sale_tax_pct'],
        })
      }
      if (!data.purchase_tax_amount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.PURCHASE_TAX_AMOUNT_REQUIRED,
          path: ['purchase_tax_amount'],
        })
      }
      if (!data.sale_tax_amount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.SALE_TAX_AMOUNT_REQUIRED,
          path: ['sale_tax_amount'],
        })
      }
    })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues:any = computed<FormInput>(() => ({
  item_uid:'',
  authority_code:'',
  exemption_code:'',
  purchase_tax_rate_code:'',
  sale_tax_rate_code:'',
  purchase_tax_pct:'',
  sale_tax_pct:'',
  purchase_tax_amount:'',
  sale_tax_amount:'',
  tax_height:'',
}))

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
  meta,
  values,
  errors,
  resetForm,
  setFieldValue,
  setErrors,
} = useForm({
  validationSchema,
  initialValues,
})

const success = ref(false)
const fieldsWithErrors = computed(() => Object.keys(errors.value).length)
onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    return confirm('You have unsaved changes. Are you sure you want to leave?')
  }
})
const toaster = useToaster()
const onSubmit = handleSubmit(
    async (values) => {
      success.value = false
      console.log('tax-create-success', values)
      try {
        await new Promise((resolve, reject) => {
          if (values.item_uid === '') {
            setTimeout(
                () => reject(new Error('Tax validation error')),
                2000,
            )
          }
          setTimeout(resolve, 4000)
        })

        toaster.clearAll()
        await toaster.show({
          title: 'Success',
          message: `Record has been created!`,
          color: 'success',
          icon: 'ph:check',
          closable: true,
        })
      } catch (error: any) {
        if (error.message === 'Tax validation error') {
          setFieldError('item_uid', 'This item is not allowed')

          document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
          })

          toaster.clearAll()
          toaster.show({
            title: 'Oops!',
            message: 'Please review the errors in the form',
            color: 'danger',
            icon: 'lucide:alert-triangle',
            closable: true,
          })
        }
        return
      }

      resetForm()

      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      success.value = true
      setTimeout(() => {
        success.value = false
      }, 3000)
    },
    (error) => {
      success.value = false
      console.log('tax-create-error', error)
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
)
</script>

<template>
  <div>
    <div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
      <div class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full">
        <div>
          <BaseHeading as="h2" size="xl" weight="light" lead="tight" class="text-muted-800 dark:text-white">
            <span>New Tax</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Create a new  Tax record </span>
          </BaseParagraph>
        </div>
      </div>
      <div class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start">
        <BaseButtonAction @click.prevent="$router.back()">
          <Icon name="lucide:arrow-left" class="h-3 w-3" />
          <span>Cancel</span>
        </BaseButtonAction>
      </div>
    </div>
    <BaseCard>
      <form method="POST" action="" class="divide-muted-200 dark:divide-muted-700 grid divide-x sm:grid-cols-2" @submit.prevent="onSubmit">
        <div shape="curved" class="bg-muted-50 dark:bg-muted-800/60 space-y-8 p-10">
          <div class="mx-auto flex w-full max-w-[410px] flex-col">
            <div>
              <div>
                <div class="grid grid-cols-12 gap-4">
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="item_uid">
                      <BaseListbox
                          label="Item"
                          :items="item"
                          :properties="{
                                        value: 'uid',
                                        label: 'name',
                                      }"
                          :model-value="field.value"
                          :error="errorMessage"
                          :disabled="isSubmitting"
                          @update:model-value="handleChange"
                          @blur="handleBlur"
                      />
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="authority_code">
                      <BaseListbox
                          label="Authority Code"
                          :items="authorityCode"
                          :properties="{
                                        value: 'uid',
                                        label: 'name',
                                      }"
                          :model-value="field.value"
                          :error="errorMessage"
                          :disabled="isSubmitting"
                          @update:model-value="handleChange"
                          @blur="handleBlur"
                      />
                    </Field>
                  </div>

                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="exemption_code">
                      <BaseListbox
                          label="Exemption Code"
                          :items="exemptionCode"
                          :properties="{
                                        value: 'uid',
                                        label: 'name',
                                      }"
                          :model-value="field.value"
                          :error="errorMessage"
                          :disabled="isSubmitting"
                          @update:model-value="handleChange"
                          @blur="handleBlur"
                      />
                    </Field>
                  </div>

                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="purchase_tax_rate_code">
                      <BaseListbox
                          label="Purchase Tax Rate Code"
                          :items="purchaseTaxRateCode"
                          :properties="{
                                        value: 'uid',
                                        label: 'name',
                                      }"
                          :model-value="field.value"
                          :error="errorMessage"
                          :disabled="isSubmitting"
                          @update:model-value="handleChange"
                          @blur="handleBlur"
                      />
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="sale_tax_rate_code">
                      <BaseInput label="Sale Tax Rate Code" placeholder="Ex: 234" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="purchase_tax_pct">
                      <BaseInput label="Purchase Tax Pct" placeholder="Ex: 4" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="sale_tax_pct">
                      <BaseInput label="Sale Tax Pct" placeholder="Ex: 4" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="purchase_tax_amount">
                      <BaseInput label="Purchase Tax Amount" placeholder="Ex: IN-234" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="sale_tax_amount">
                      <BaseInput label="Sale Tax Amount" placeholder="Ex: 234" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div shape="curved" class="w-full space-y-8 p-10">
          <div class="mx-auto w-full max-w-[410px]">
            <div class="grid grid-cols-12 gap-4">

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="tax_height">
                  <BaseInput label="Tax Height" placeholder="Ex: 2" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
            </div>
            <div class="mt-5 flex flex-col-reverse text-right md:block md:space-x-3">
              <BaseButton type="submit" color="primary" class="!h-12 w-full sm:w-40"> Create</BaseButton>
            </div>
          </div>
        </div>
      </form>
    </BaseCard>
  </div>
</template>
