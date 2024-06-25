<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})
const assetType=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]
const averagingMethod=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]

const VALIDATION_TEXT = {
  NAME_REQUIRED: "Name is required.",
  FA_NUMBER_REQUIRED: "FA Number is required.",
  PURCHASE_DATE_REQUIRED: "Purchase Date is required.",
  PURCHASE_PRICE_REQUIRED: "Purchase Price is required.",
  WARRANTY_EXPIRY_DATE_REQUIRED: "Warranty Expiry Date is required.",
  SERIAL_NUMBER_REQUIRED: "Serial Number is required.",
  ASSET_TYPE_REQUIRED: "Asset Type is required.",
  AVERAGING_METHOD_REQUIRED: "Averaging Method is required.",
  RATE_REQUIRED: "Rate is required.",
  EFFECTIVE_LIFE_IN_YEARS_REQUIRED: "Effective Life In Years is required.",
  COST_LIMIT_REQUIRED: "Cost Limit is required.",
  DEPRECIATION_CODE_REQUIRED: "Depreciation Code is required.",
  DISPOSAL_CODE_REQUIRED: "Disposal Code is required.",
}
const zodSchema = z
  .object({
    name: z.string(),
    fa_number: z.string(),
    purchase_date: z.string(),
    purchase_price: z.coerce.number(),
    warranty_expiry_date: z.string(),
    serial_number: z.string(),
    asset_type: z.string(),
    averaging_method: z.string(),
    rate:  z.coerce.number(),
    effective_life_in_years:  z.coerce.number(),
    cost_limit:  z.coerce.number(),
    depreciation_code: z.string(),
    disposal_code: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.NAME_REQUIRED,
        path: ['name'],
      })
    }
    if (!data.fa_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.FA_NUMBER_REQUIRED,
        path: ['fa_number'],
      })
    }
    if (!data.purchase_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PURCHASE_DATE_REQUIRED,
        path: ['purchase_date'],
      })
    }
    if (!data.purchase_price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PURCHASE_PRICE_REQUIRED,
        path: ['purchase_price'],
      })
    }
    if (!data.asset_type) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ASSET_TYPE_REQUIRED,
        path: ['asset_type'],
      })
    }
    if (!data.averaging_method) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.AVERAGING_METHOD_REQUIRED,
        path: ['averaging_method'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  name: '',
  fa_number: '',
  purchase_date: '',
  purchase_price: 0.00,
  warranty_expiry_date:'',
  serial_number:'',
  asset_type: '',
  averaging_method: '',
  rate: 0.00,
  effective_life_in_years: 0.00,
  cost_limit: 0.00,
  depreciation_code:'',
  disposal_code: '',
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
    console.log('fixed-asset-create-success', values)
    try {
      await new Promise((resolve, reject) => {
        if (values.name === '') {
          setTimeout(
            () => reject(new Error('Fixed Asset validation error')),
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
      if (error.message === 'Fixed Asset validation error') {
        setFieldError('name', 'This name is not allowed')

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
    console.log('fixed-asset-create-error', error)
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
            <span> Fixed Asset</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Edit a new  Fixed Asset record </span>
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
            <div class="grid grid-cols-12 gap-4">
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="name">
                  <BaseInput label="Name" placeholder="Ex: Acme Inc." :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="fa_number">
                  <BaseInput label="FA Number" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="purchase_date">
                  <BaseInput label="Purchase Date" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="purchase_price">
                  <BaseInput label="Purchase Price" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="asset_type">
                  <BaseListbox
                    label="Asset Type"
                    :items="assetType"
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
              <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="averaging_method">
                  <BaseListbox
                    label="Averaging Method"
                    :items="averagingMethod"
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
            </div>
          </div>
        </div>

        <div shape="curved" class="w-full space-y-8 p-10">
          <div class="mx-auto w-full max-w-[410px]">
            <div class="grid grid-cols-12 gap-4">
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="warranty_expiry_date">
                  <BaseInput label="Warranty Expiry Date" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="serial_number">
                  <BaseInput label="Serial Number" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="rate">
                  <BaseInput label="Rate" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="effective_life_in_years">
                  <BaseInput label="effective Life In Years" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="cost_limit">
                  <BaseInput label="Cost Limit" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="depreciation_code">
                  <BaseInput label="Depreciation Code" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="disposal_code">
                  <BaseInput label="Disposal Code" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
            </div>
            <div class="mt-5 flex flex-col-reverse text-right md:block md:space-x-3">
              <BaseButton type="submit" color="primary" class="!h-12 w-full sm:w-40"> Edit</BaseButton>
            </div>
          </div>
        </div>
      </form>
    </BaseCard>
  </div>
</template>
