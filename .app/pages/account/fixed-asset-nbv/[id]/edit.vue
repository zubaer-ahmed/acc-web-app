<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})

const faAccount=[
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
  FA_ACCOUNT_UID_REQUIRED: "FA Account UID is required.",
  REMAINING_LIFE_REQUIRED: "Remaining Life is required.",
  SALVAGE_VALUE_REQUIRED: "Salvage Value is required.",
  THROUGH_DATE_REQUIRED: "Through Date is required.",
  NET_BOOK_VALUE_REQUIRED: "Net Book Value is required.",
}
const zodSchema = z
  .object({
    fa_account_uid: z.string(),
    remaining_life: z.coerce.number(),
    salvage_value: z.coerce.number(),
    through_date: z.string(),
    net_book_value: z.coerce.number(),

  })
  .superRefine((data, ctx) => {
    if (!data.fa_account_uid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.FA_ACCOUNT_UID_REQUIRED,
        path: ['fa_account_uid'],
      })
    }
    if (!data.remaining_life) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.REMAINING_LIFE_REQUIRED,
        path: ['remaining_life'],
      })
    }
    if (!data.salvage_value) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.SALVAGE_VALUE_REQUIRED,
        path: ['salvage_value'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  fa_account_uid: '',
  remaining_life: 0.00,
  salvage_value: 0.00,
  through_date: '',
  net_book_value: 0.00,

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
    console.log('fixed-asset-nbv-create-success', values)
    try {
      await new Promise((resolve, reject) => {
        if (values.fa_account_uid === '') {
          setTimeout(
            () => reject(new Error('Fixed Asset NBV validation error')),
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
      if (error.message === 'Fixed Asset NBV validation error') {
        setFieldError('fa_account_uid', 'This fixed asset is not allowed')

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
    console.log('fixed-asset-nbv-create-error', error)
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
            <span> Fixed Asset NBV</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Edit a new  Fixed Asset NBV record </span>
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
            <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
              <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="fa_account_uid">
                <BaseListbox
                  label="FA Account"
                  :items="faAccount"
                  :properties="{
                      value: 'uid',
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
            <div class="grid grid-cols-12 gap-4">
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="remaining_life">
                  <BaseInput label="Remaining Life" placeholder="Ex: Acme Inc." :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="salvage_value">
                  <BaseInput label="Salvage Value" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
            </div>
          </div>
        </div>

        <div shape="curved" class="w-full space-y-8 p-10">
          <div class="mx-auto w-full max-w-[410px]">
            <div class="grid grid-cols-12 gap-4">


              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="through_date">
                  <BaseInput label="Through Date" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="net_book_value">
                  <BaseInput label="Net Book Value" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
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
