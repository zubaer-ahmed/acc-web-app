<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})

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
  CODE_REQUIRED: "Code is required.",
  NAME_REQUIRED: "Name is required.",
  AUTHORITY_CODE_REQUIRED: "Authority Code is required.",
  STATUS_REQUIRED: "Status is required.",
  REPORT_TAX_TYPE_REQUIRED: "Report Tax Type is required.",
  CAN_APPLY_TO_REVENUE_REQUIRED: "Apply To Revenue is required.",
  CAN_APPLY_TO_EXPENSE_REQUIRED: "Apply To Expense is required.",
  CAN_APPLY_TO_ASSET_REQUIRED: "Apply To Asset is required.",
  CAN_APPLY_TO_LIABILITY_REQUIRED: "Apply To Liability is required.",
  CAN_APPLY_TO_EQUITY_REQUIRED: "Apply To Equity is required.",
  IS_COMPOUND_REQUIRED: "Compound is required.",
  IS_NON_RECOVERABLE_REQUIRED: "Non Recoverable is required.",
  DISPLAY_TAX_RATE_REQUIRED: "Display Tax Rate is required.",
  EFFECTIVE_RATE_REQUIRED: "Effective Rate is required.",
}
const zodSchema = z
    .object({
      code: z.string(),
      name: z.string(),
      authority_code: z.coerce.number(),
      status: z.string(),
      report_tax_type: z.string(),
      can_apply_to_revenue: z.string(),
      can_apply_to_expense: z.string(),
      can_apply_to_asset: z.string(),
      can_apply_to_liability: z.string(),
      can_apply_to_equity: z.string(),
      is_compound: z.boolean(),
      is_non_recoverable: z.boolean(),
      display_tax_rate: z.string(),
      effective_rate: z.string(),
    })
    .superRefine((data, ctx) => {
      if (!data.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.NAME_REQUIRED,
          path: ['name'],
        })
      }
      if (!data.code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.CODE_REQUIRED,
          path: ['code'],
        })
      }
      if (!data.authority_code) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.AUTHORITY_CODE_REQUIRED,
          path: ['authority_code'],
        })
      }
      if (!data.effective_rate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.EFFECTIVE_RATE_REQUIRED,
          path: ['effective_rate'],
        })
      }
    })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues:any = computed<FormInput>(() => ({
  code: '',
  name:'',
  authority_code:0.00,
  status:'',
  report_tax_type: '',
  can_apply_to_revenue: '',
  can_apply_to_expense: '',
  can_apply_to_asset:'',
  can_apply_to_liability:'',
  can_apply_to_equity: '',
  is_compound: false,
  is_non_recoverable: false,
  display_tax_rate:'',
  effective_rate:'',
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
      console.log('tax-rate-create-success', values)
      try {
        await new Promise((resolve, reject) => {
          if (values.name === '') {
            setTimeout(
                () => reject(new Error('Tax Rate validation error')),
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
        if (error.message === 'Tax Rate validation error') {
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
      console.log('tax-rate-create-error', error)
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
            <span>New Tax Rate</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Create a new  Tax Rate record </span>
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="name">
                      <BaseInput label=" Name" placeholder="Ex: Acme Inc." :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="code">
                      <BaseInput label="Code" placeholder="Ex:R-AG" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="effective_rate">
                      <BaseInput label="Effective Rate" placeholder="Ex: 1.23" :model-value="field.value"
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

<!--              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">-->
<!--                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="status">-->
<!--                  <BaseInput label="Status" placeholder="Ex:Paid" :model-value="field.value"-->
<!--                             :error="errorMessage" :disabled="isSubmitting" type="text"-->
<!--                             @update:model-value="handleChange" @blur="handleBlur"/>-->
<!--                </Field>-->
<!--              </div>-->

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="display_tax_rate">
                  <BaseInput label="Display Tax rate" placeholder="Ex: Business Income" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="can_apply_to_revenue">
                  <BaseCheckbox label="Apply To Revenue" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="can_apply_to_expense">
                  <BaseCheckbox label="Apply To Expense" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="can_apply_to_asset">
                  <BaseCheckbox label="Apply To Asset" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="can_apply_to_liability">
                  <BaseCheckbox label="Apply To Liability" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="can_apply_to_equity">
                  <BaseCheckbox label="Apply To Equity" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="is_compound">
                  <BaseCheckbox label="Compound" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="is_non_recoverable">
                  <BaseCheckbox label="Non Recoverable" shape="rounded" color="primary"
                                :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
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
