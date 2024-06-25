<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})
const journalType=[
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
  PROFILE_NAME_REQUIRED: "Profile Name is required.",
  REPEAT_ON_REQUIRED: "Repeat On is required.",
  STARTS_ON_REQUIRED: "Starts On is required.",
  ENDS_ON_REQUIRED: "Ends On is required.",
  JOURNAL_TYPE_REQUIRED: "Journal Type is required.",
  TOTAL_REQUIRED: "Total is required.",
  TOTAL_TAX_REQUIRED: "Total Tax is required.",
  TAX_INCLUSIVE_REQUIRED: "Tax Inclusive is required.",
  DIFFERENCE_REQUIRED: "Difference is required.",
  REFERENCE_REQUIRED: "Reference is required.",
  NOTES_REQUIRED: "Notes is required.",
}
const zodSchema = z
  .object({
    currency_code: z.coerce.number(),
    currency_rate:  z.coerce.number(),
    profile_name: z.string(),
    repeat_on:  z.coerce.number(),
    starts_on: z.string(),
    ends_on: z.string(),
    journal_type: z.string(),
    total:  z.coerce.number(),
    total_tax:  z.coerce.number(),
    tax_inclusive: z.string(),
    difference: z.string(),
    reference: z.string(),
    notes: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.profile_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PROFILE_NAME_REQUIRED,
        path: ['profile_name'],
      })
    }
    if (!data.currency_code) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PROFILE_NAME_REQUIRED,
        path: ['currency_code'],
      })
    }
    if (!data.journal_type) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.JOURNAL_TYPE_REQUIRED,
        path: ['journal_type'],
      })
    }
    if (!data.total) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.TOTAL_REQUIRED,
        path: ['total'],
      })
    }
    if (!data.difference) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.DIFFERENCE_REQUIRED,
        path: ['difference'],
      })
    }
    if (!data.repeat_on) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.REPEAT_ON_REQUIRED,
        path: ['repeat_on'],
      })
    }
    if (!data.starts_on) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.STARTS_ON_REQUIRED,
        path: ['starts_on'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues:any = computed<FormInput>(() => ({
  currency_code: 0.00,
  currency_rate: 0.00,
  profile_name: '',
  repeat_on: 0.00,
  starts_on: '',
  ends_on: '',
  journal_type: '',
  total: 0.00,
  total_tax: 0.00,
  tax_inclusive: '',
  difference: '',
  reference: '',
  notes: '',
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
    console.log('recurring-journal-create-success', values)
    try {
      await new Promise((resolve, reject) => {
        if (values.profile_name === '') {
          setTimeout(
            () => reject(new Error('Recurring journal validation error')),
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
      if (error.message === 'Recurring journal validation error') {
        setFieldError('profile_name', 'This name is not allowed')

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
    console.log('recurring-journal-create-error', error)
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
            <span> Recurring Journal</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Edit a new  Recurring Journal record </span>
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="profile_name">
                      <BaseInput label="Profile Name" placeholder="Ex: Acme Inc." :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="journal_type">
                      <BaseListbox
                        label="Journal Type"
                        :items="journalType"
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="total">
                      <BaseInput label="Total" placeholder="Ex: 2024" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="difference">
                      <BaseInput label="Difference" placeholder="Ex:Difference" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="repeat_on">
                      <BaseListbox
                        label="Repeat On"
                        :items="repeatOn"
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
                  <div class="tablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="starts_on">
                      <BaseInput label="Starts On" placeholder="Ex: 2023-01-01" :model-value="field.value"
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
                  <BaseInput label="Currency Rate" placeholder="Ex: 2.34" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="ends_on">
                  <BaseInput label="Ends On" placeholder="Ex: 2023-01-01" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

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
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="reference">
                  <BaseInput label="Reference" placeholder="Ex:Reference" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="notes">
                  <BaseInput label="Notes" placeholder="Ex: Notes" :model-value="field.value"
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
