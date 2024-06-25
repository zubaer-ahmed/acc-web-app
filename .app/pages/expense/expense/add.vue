<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})


const client=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]
const vendor=[
  {
    uid: "123",
    name: 'rajib'
  },
  {
    uid: "234",
    name: 'pavel'
  },
]
const account=[
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
  ACCOUNT_UID_REQUIRED: "Account UID is required.",
  VENDOR_UID_REQUIRED: "Vendor UID is required.",
  CLIENT_UID_REQUIRED: "Client UID is required.",
  RECEIPT_NUMBER_REQUIRED: "Receipt Number is required.",
  TOTAL_REQUIRED: "Total is required.",
  TAX_AMOUNT_REQUIRED: "Tax Amount is required.",
  TAX_INCLUSIVE_REQUIRED: "Tax Inclusive is required.",
  AMOUNT_DUE_REQUIRED: "Amount Due is required.",
  PAYMENT_DUE_DATE_REQUIRED: "Payment Due Date is required.",
  PAYMENT_DATE_REQUIRED: "Payment Date is required.",
  STATUS_REQUIRED: "Status is required.",
  REFERENCE_REQUIRED: "Reference is required.",
  NOTE_REQUIRED: "Note is required.",
}
const zodSchema = z
    .object({
      currency_code: z.string(),
      currency_rate: z.string(),
      account_uid: z.string(),
      vendor_uid: z.string(),
      client_uid: z.string(),
      receipt_number: z.string(),
      total: z.coerce.number(),
      tax_amount: z.coerce.number(),
      tax_inclusive: z.string(),
      amount_due: z.coerce.number(),
      payment_due_date: z.string(),
      payment_date: z.string(),
      status: z.string(),
      reference: z.string(),
      note: z.string(),
    })
    .superRefine((data, ctx) => {
      if (!data.account_uid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.ACCOUNT_UID_REQUIRED,
          path: ['account_uid'],
        })
      }
      if (!data.currency_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.CURRENCY_CODE_REQUIRED,
          path: ['currency_code'],
        })
      }
      if (!data.vendor_uid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.VENDOR_UID_REQUIRED,
          path: ['vendor_uid'],
        })
      }
      if (!data.client_uid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.CLIENT_UID_REQUIRED,
          path: ['client_uid'],
        })
      }
      if (!data.receipt_number) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.RECEIPT_NUMBER_REQUIRED,
          path: ['receipt_number'],
        })
      }
      if (!data.total) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.TOTAL_REQUIRED,
          path: ['total'],
        })
      }
      if (!data.payment_due_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.PAYMENT_DUE_DATE_REQUIRED,
          path: ['payment_due_date'],
        })
      }
    })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues:any = computed<FormInput>(() => ({
  currency_code:'',
  currency_rate:'',
  account_uid: '',
  vendor_uid:'',
  client_uid:'',
  receipt_number:'',
  total: 0.00,
  tax_amount: 0.00,
  tax_inclusive:'',
  amount_due:0.00,
  payment_due_date:'',
  payment_date:'',
  status:'',
  reference:'',
  note:'',
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
      console.log('expense-create-success', values)
      try {
        await new Promise((resolve, reject) => {
          if (values.account_uid === '') {
            setTimeout(
                () => reject(new Error('Expense validation error')),
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
        if (error.message === 'Expense validation error') {
          setFieldError('account_uid', 'This expense is not allowed')

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
      console.log('expense-create-error', error)
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
            <span>New Expense</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Create a new  Expense record </span>
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="account_uid">
                      <BaseListbox
                        label="Account"
                        :items="account"
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="vendor_uid">
                      <BaseListbox
                          label="Vendor"
                          :items="vendor"
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="client_uid">
                      <BaseListbox
                          label="Client"
                          :items="client"
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
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="receipt_number">
                      <BaseInput label="Receipt Number" placeholder="Ex: A-47" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="total">
                      <BaseInput label="Total" placeholder="Ex: 24567.89 " :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="payment_due_date">
                      <BaseInput label="Payment Due Date" placeholder="Ex: 2023-11-12" :model-value="field.value"
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


              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="tax_amount">
                  <BaseInput label="Tax Amount" placeholder="Ex: 2444.89 " :model-value="field.value"
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
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="amount_due">
                  <BaseInput label="Amount Due" placeholder="Ex: 24445.89 " :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
              <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="payment_date">
                <BaseInput label="Payment Date" placeholder="Ex: 23-04-2024" :model-value="field.value"
                           :error="errorMessage" :disabled="isSubmitting" type="text"
                           @update:model-value="handleChange" @blur="handleBlur"/>
              </Field>
            </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
              <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="status">
                <BaseInput label="Status" placeholder="Ex: expense" :model-value="field.value"
                           :error="errorMessage" :disabled="isSubmitting" type="text"
                           @update:model-value="handleChange" @blur="handleBlur"/>
              </Field>
            </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
              <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="reference">
                <BaseInput label="Reference" placeholder="Ex: reference" :model-value="field.value"
                           :error="errorMessage" :disabled="isSubmitting" type="text"
                           @update:model-value="handleChange" @blur="handleBlur"/>
              </Field>
            </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
              <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="note">
                <BaseInput label="Note" placeholder="Ex: note " :model-value="field.value"
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
