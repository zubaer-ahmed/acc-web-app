<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})
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

const modeOfAdjustment=[
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
  MODE_OF_ADJUSTMENT_REQUIRED: "Mode Of Adjustment is required.",
  ACCOUNT_UID_REQUIRED: "Account UID is required.",
  REASON_REQUIRED: "Reason is required.",
  DESCRIPTION_REQUIRED: "Description is required.",
}
const zodSchema = z
  .object({
    mode_of_adjustment: z.string(),
    account_uid: z.string(),
    reason: z.string(),
    description: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.account_uid ){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ACCOUNT_UID_REQUIRED,
        path: ['account_uid'],
      })
    }
    if (!data.mode_of_adjustment ){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.MODE_OF_ADJUSTMENT_REQUIRED,
        path: ['mode_of_adjustment'],
      })
    }
    if (!data.reason ){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.REASON_REQUIRED,
        path: ['reason'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues:any = computed<FormInput>(() => ({
  mode_of_adjustment: '',
  account_uid: '',
  reason: '',
  description: '',
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
    console.log('inventory-adjustment-create-success', values)
    try {
      await new Promise((resolve, reject) => {
        if (values.account_uid === '') {
          setTimeout(
            () => reject(new Error('Inventory adjustment validation error')),
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
      if (error.message === 'Inventory adjustment validation error') {
        setFieldError('account_uid', 'This name is not allowed')

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
    console.log('inventory-adjustment-create-error', error)
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
            <span> Inventory Adjustment</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Edit a new  Inventory Adjustment record </span>
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="mode_of_adjustment">
                      <BaseListbox
                        label="Mode of Adjustment"
                        :items="modeOfAdjustment"
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
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="reason">
                      <BaseInput label="Reason" placeholder="Ex: stock on fire" :model-value="field.value"
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

              <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="description">
                  <BaseInput label="Description" placeholder="Ex: Description" :model-value="field.value"
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
