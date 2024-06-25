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
  CONTACT_UID_REQUIRED: "Contact UID is required.",
  VENDOR_CREDIT_NUMBER_REQUIRED: "Vendor Credit Number is required.",
  ORDER_NUMBER_REQUIRED: "Order Number is required.",
  VENDOR_CREDIT_DATE_REQUIRED: "Vendor Credit Date is required.",
  STATUS_REQUIRED: "Status is required.",
  TOTAL_REQUIRED: "Total is required.",
  TOTAL_TAX_REQUIRED: "Total Tax is required.",
  TAX_INCLUSIVE_REQUIRED: "Tax Inclusive is required.",
  ADJUSTMENT_REQUIRED: "Adjustment is required.",
  DISCOUNT_REQUIRED:"Discount is required.",
  REFERENCE_REQUIRED: "Reference is required.",
  NOTES_REQUIRED: "Notes is required.",
  TERMS_CONDITIONS_REQUIRED: "Terms Conditions is required.",
  SENT_TO_CONTACT_REQUIRED: "Sent To Contact is required.",
  REMAINING_CREDIT_REQUIRED: "Remaining Credit is required.",
  ALLOCATIONS_REQUIRED: "Allocations is required.",
}
const zodSchema = z
  .object({
    currency_code: z.coerce.number(),
    currency_rate: z.coerce.number(),
    contact_uid: z.string(),
    vendor_credit_number: z.coerce.number(),
    order_number: z.coerce.number(),
    vendor_credit_date: z.string(),
    status: z.string(),
    total: z.coerce.number(),
    total_tax:z.coerce.number(),
    tax_inclusive: z.string(),
    adjustment: z.string(),
    discount: z.string(),
    reference: z.string(),
    notes: z.string(),
    terms_conditions: z.string(),
    sent_to_contact: z.string(),
    remaining_credit: z.coerce.number(),
    allocations: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.contact_uid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.CONTACT_UID_REQUIRED,
        path: ['contact_uid'],
      })
    }
    if (!data.currency_code) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.CURRENCY_CODE_REQUIRED,
        path: ['currency_code'],
      })
    }
    if (!data.vendor_credit_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.VENDOR_CREDIT_NUMBER_REQUIRED,
        path: ['vendor_credit_number'],
      })
    }
    if (!data.order_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ORDER_NUMBER_REQUIRED,
        path: ['order_number'],
      })
    }
    if (!data.vendor_credit_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.VENDOR_CREDIT_DATE_REQUIRED,
        path: ['vendor_credit_date'],
      })
    }
    if (!data.total) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.TOTAL_REQUIRED,
        path: ['total'],
      })
    }
    if (!data.adjustment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ADJUSTMENT_REQUIRED,
        path: ['adjustment'],
      })
    }
    if (!data.discount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.DISCOUNT_REQUIRED,
        path: ['discount'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues:any = computed<FormInput>(() => ({
  currency_code:0.00,
  currency_rate: 0.00,
  contact_uid: '',
  vendor_credit_number: 0.00,
  order_number: 0.00,
  vendor_credit_date: '',
  status: '',
  total: 0.00,
  total_tax:0.00,
  tax_inclusive: '',
  adjustment: '',
  discount: '',
  reference: '',
  notes: '',
  terms_conditions: '',
  sent_to_contact: '',
  remaining_credit: 0.00,
  allocations: '',
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
    console.log('account-create-success', values)
    try {
      await new Promise((resolve, reject) => {
        if (values.contact_uid === '') {
          setTimeout(
            () => reject(new Error('Vendor credit validation error')),
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
      if (error.message === 'Vendor credit validation error') {
        setFieldError('contact_uid', 'This credit is not allowed')

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
    console.log('vendor-credit-create-error', error)
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
            <span> Vendor Credit</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Edit a new  Vendor Credit record </span>
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="vendor_credit_number">
                      <BaseInput label="Vendor Credit Number" placeholder="Ex: 234" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="order_number">
                      <BaseInput label="Order Number" placeholder="Ex: 234" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="vendor_credit_date">
                      <BaseInput label="Vendor Credit Date" placeholder="Ex: 234" :model-value="field.value"
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="adjustment">
                      <BaseInput label="Adjustment" placeholder="Ex: 2444.89 " :model-value="field.value"
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
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="sent_to_contact">
                      <BaseCheckbox label="Sent to Contact" shape="rounded" color="primary"
                                    :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
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
                  <BaseInput label="Currency Rate" placeholder="Ex: 2.34" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="remaining_credit">
                  <BaseInput label="Remaining Credit" placeholder="Ex: 24" :model-value="field.value"
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

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="total_tax">
                  <BaseInput label="Total Tax" placeholder="Ex: 245689 " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="tax_inclusive">
                  <BaseCheckbox label="Tax Inclusive" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="allocations">
                  <BaseInput label="Allocations" placeholder="Ex: Allocations" :model-value="field.value"
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
                  <BaseInput label="Notes" placeholder=" " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <!--              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">-->
              <!--                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="terms_conditions">-->
              <!--                  <BaseInput label="Terms Conditions" placeholder=" " :model-value="field.value"-->
              <!--                             :error="errorMessage" :disabled="isSubmitting" type="text"-->
              <!--                             @update:model-value="handleChange" @blur="handleBlur"/>-->
              <!--                </Field>-->
              <!--              </div>-->
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
