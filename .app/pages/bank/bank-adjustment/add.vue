<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})

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
  ACCOUNT_CODE_REQUIRED: "Account Code is required.",
  AMOUNT_REQUIRED: "Amount is required.",
  BANKING_DATE_REQUIRED: "Banking Date is required.",
  CURRENCY_CODE_REQUIRED: "Currency Code is required.",
  CURRENCY_RATE_REQUIRED: "Currency Rate is required.",
  BANK_STATEMENT_ID_REQUIRED: "Bank Statement ID is required.",
  REFERENCE_REQUIRED: "Reference is required.",
}
const zodSchema = z
    .object({
      account_code: z.string(),
      amount: z.coerce.number(),
      banking_date:z.string(),
      currency_code: z.string(),
      bank_statement_id: z.string(),
      reference: z.string(),

    })
    .superRefine((data, ctx) => {
      if (!data.account_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.ACCOUNT_CODE_REQUIRED,
          path: ['account_code'],
        })
      }
      if (!data.currency_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.CURRENCY_CODE_REQUIRED,
          path: ['currency_code'],
        })
      }
      if (!data.banking_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.BANKING_DATE_REQUIRED,
          path: ['banking_date'],
        })
      }
      if (!data.amount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.AMOUNT_REQUIRED,
          path: ['amount'],
        })
      }
    })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  account_code: '',
  amount: 0.00,
  banking_date: '',
  currency_code: '',
  bank_statement_id: '',
  reference: '',

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
      console.log('bank-adjustment-create-success', values)
      try {
        await new Promise((resolve, reject) => {
          if (values.account_code === '') {
            setTimeout(
                () => reject(new Error('Bank Adjustment validation error')),
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
        if (error.message ==='Bank Adjustment validation error') {
          setFieldError('account_code', 'This account code is not allowed')

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
      console.log('bank-adjustment-create-error', error)
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
            <span>New Bank Adjustment</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Create a new  Bank Adjustment record </span>
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
                  <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="currency_code">
                      <BaseListbox
                          label="Currency"
                          :items="currencyCode"
                          :properties="{
                      value: 'id',
                      label: 'name',
                      // sublabel: 'text',
                      // media: 'media',
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="account_code">
                      <BaseInput label="Account Code" placeholder="Ex: Acme Inc." :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="banking_date">
                      <BaseInput label="Banking Date" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                    </Field>
                  </div>

                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="amount">
                      <BaseInput label="Amount" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
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
                  <BaseInput label="Currency Rate" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="bank_statement_id">
                  <BaseInput label="Bank Statement ID" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="reference">
                  <BaseInput label="Reference" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
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
