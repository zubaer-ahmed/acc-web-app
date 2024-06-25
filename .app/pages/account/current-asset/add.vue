<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})

const VALIDATION_TEXT = {
  NAME_REQUIRED: "Name is required.",
  AVAILABLE_BALANCE_REQUIRED: "Available Balance is required.",
  DEBIT_REQUIRED: "Debit is required.",
  CREDIT_REQUIRED: "Credit is required.",
}
const zodSchema = z
    .object({
      name: z.string(),
      available_balance: z.coerce.number(),
      debit: z.coerce.number(),
      credit: z.coerce.number(),
    })
    .superRefine((data, ctx) => {
      if (!data.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.NAME_REQUIRED,
          path: ['name'],
        })
      }
      if (!data.available_balance) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.AVAILABLE_BALANCE_REQUIRED,
          path: ['available_balance'],
        })
      }
    })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  name:'',
  available_balance: 0.00,
  debit: 0.00,
  credit: 0.00,
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
      console.log('current-asset-create-success', values)
      try {
        await new Promise((resolve, reject) => {
          if (values.name === '') {
            setTimeout(
                () => reject(new Error('Current Asset validation error')),
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
        if (error.message === 'Current Asset validation error') {
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
      console.log('current-asset-create-error', error)
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
            <span>New Current Asset</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Create a new  Current Asset record </span>
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
                      <BaseInput label="Name" placeholder="Ex: Stock Investment." :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="available_balance">
                      <BaseInput label="Available Balance" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
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
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="debit">
                  <BaseInput label="Debit" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="credit">
                  <BaseInput label="Credit" placeholder="Ex: hello@acme.co" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" @update:model-value="handleChange" @blur="handleBlur" />
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
