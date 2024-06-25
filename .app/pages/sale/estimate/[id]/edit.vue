<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})

const contact=[
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
  CURRENCY_CODE_REQUIRED: "Currency Code is required.",
  CURRENCY_RATE_REQUIRED: "Currency Rate is required.",
  ESTIMATE_NUMBER_REQUIRED: "Estimate Number is required.",
  CONTACT_UID_REQUIRED: "Contact UID is required.",
  ESTIMATE_DATE_REQUIRED: "Estimate Date is required.",
  EXPIRY_DATE_REQUIRED: "Expiry Date is required.",
  STATUS_REQUIRED: "Status is required.",
  TOTAL_REQUIRED: "Total is required.",
  TOTAL_TAX_REQUIRED: "Total Tax is required.",
  TAX_INCLUSIVE_REQUIRED: "Tax Inclusive is required.",
  DISCOUNT_REQUIRED: "Discount is required.",
  ADJUSTMENT_REQUIRED: "Adjustment is required.",
  SHIPPING_CHARGE_REQUIRED: "Shipping Charge' is required.",
  SALE_PERSON_REQUIRED: "Sale Person is required.",
  PROJECT_NAME_REQUIRED: "Project Name is required.",
  REFERENCE_REQUIRED: "Reference is required.",
  NOTES_REQUIRED: "Notes is required.",
  TERMS_CONDITIONS_REQUIRED: "Terms Conditions is required.",
}
const zodSchema = z
  .object({
    currency_code: z.coerce.number(),
    currency_rate: z.string(),
    estimate_number: z.coerce.number(),
    contact_uid: z.string(),
    estimate_date: z.string(),
    status: z.string(),
    total: z.coerce.number(),
    total_tax: z.coerce.number(),
    tax_inclusive: z.string(),
    discount:z.coerce.number(),
    adjustment: z.string(),
    shipping_charge: z.coerce.number(),
    sale_person: z.string(),
    project_name: z.string(),
    reference: z.string(),
    notes: z.string(),
    terms_conditions: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.contact_uid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.CONTACT_UID_REQUIRED,
        path: ['contact_uid'],
      })
    }
    if (!data.project_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PROJECT_NAME_REQUIRED,
        path: ['project_name'],
      })
    }
    if (!data.currency_code) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.CONTACT_UID_REQUIRED,
        path: ['currency_code'],
      })
    }
    if (!data.estimate_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ESTIMATE_NUMBER_REQUIRED,
        path: ['estimate_number'],
      })
    }
    if (!data.estimate_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ESTIMATE_DATE_REQUIRED,
        path: ['estimate_date'],
      })
    }
    if (!data.total) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.TOTAL_REQUIRED,
        path: ['total'],
      })
    }
    if (!data.discount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.DISCOUNT_REQUIRED,
        path: ['discount'],
      })
    }
    if (!data.adjustment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ADJUSTMENT_REQUIRED,
        path: ['adjustment'],
      })
    }
    if (!data.shipping_charge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.SHIPPING_CHARGE_REQUIRED,
        path: ['shipping_charge'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues:any = computed<FormInput>(() => ({
  currency_code:0.00,
  currency_rate: '',
  estimate_number:0.00,
  contact_uid:  '',
  estimate_date: '',
  status: '',
  total:0.00,
  total_tax: 0.00,
  tax_inclusive: '',
  discount:0.00,
  adjustment: '',
  shipping_charge:0.00,
  sale_person:  '',
  project_name:  '',
  reference: '',
  notes:  '',
  terms_conditions: '',
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
    console.log('estimate-create-success', values)
    try {
      await new Promise((resolve, reject) => {
        if (values.contact_uid === '') {
          setTimeout(
            () => reject(new Error('Estimate validation error')),
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
      if (error.message === 'Estimate validation error') {
        setFieldError('contact_uid', 'This contact is not allowed')

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
    console.log('estimate-create-error', error)
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
            <span> Estimate</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Edit a new  Estimate record </span>
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
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="project_name">
                      <BaseInput label="Project Name" placeholder="Ex: project 1 " :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="contact_uid">
                      <BaseListbox
                        label="Contact"
                        :items="contact"
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="currency_code">
                      <BaseListbox
                        label="Currency Code"
                        :items="currencyCode"
                        :properties="{
                       value: 'code',
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="estimate_number">
                      <BaseInput label="Estimate Number" placeholder="Ex: 234" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="estimate_date">
                      <BaseInput label="Estimate Date" placeholder="Ex: 2023-01-05" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="total">
                      <BaseInput label="Total" placeholder="Ex: 2024" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="discount">
                      <BaseInput label="Discount" placeholder="Ex: 2444.89 " :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="adjustment">
                      <BaseInput label="Adjustment" placeholder="Ex: 2444.89 " :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="shipping_charge">
                      <BaseInput label="Shipping Charge" placeholder="Ex: 2444.89 " :model-value="field.value"
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
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="currency_rate">
                  <BaseInput label="Currency Rate" placeholder="Ex: 234" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="expiry_date">
                  <BaseInput label="Expiry Number" placeholder="Ex: 2023-01-05" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <!--              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">-->
              <!--                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="status">-->
              <!--                  <BaseInput label="Status" placeholder="Ex: pending" :model-value="field.value"-->
              <!--                             :error="errorMessage" :disabled="isSubmitting" type="text"-->
              <!--                             @update:model-value="handleChange" @blur="handleBlur"/>-->
              <!--                </Field>-->
              <!--              </div>-->

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="total_tax">
                  <BaseInput label="Total Tax" placeholder="Ex: 245689 " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="tax_inclusive">
                  <BaseCheckbox label="Tax Inclusive" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="sale_person">
                  <BaseInput label="Sale Person" placeholder="Ex: Nusrat " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="reference">
                  <BaseInput label="Reference" placeholder=" " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="notes">
                  <BaseInput label="Notes" placeholder="notes " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="terms_conditions">
                  <BaseInput label="Terms Conditions" placeholder=" " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
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
