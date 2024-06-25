<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useFieldError, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ title: 'Add'})
const countryCode=[
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
  CONTACT_STATUS_REQUIRED: "Contact Status is required.",
  ENABLED_FOR_DOING_BUSINESS_REQUIRED: "Enabled For Doing Business is required.",
  FIRST_NAME_REQUIRED: "First Name is required.",
  LAST_NAME_REQUIRED: "Last Name is required.",
  EMAIL_REQUIRED: "Email is required.",
  PHONE_REQUIRED: "Phone is required.",
  WEBSITE_REQUIRED: "Website is required.",
  COUNTRY_CODE_REQUIRED: "Country Code is required.",
  STATE_NAME_REQUIRED: "State Name is required.",
  ZIP_CODE_REQUIRED: "Zip Code is required.",
  CITY_REQUIRED: "City is required.",
  REFERENCE_REQUIRED: "Reference is required.",
  IS_SUPPLIER_REQUIRED: "Supplier is required.",
  IS_CUSTOMER_REQUIRED: "Customer is required.",
  TRACKING_CATEGORY_NAME_REQUIRED: "Tracking Category Name is required.",
  TRACKING_OPTION_NAME_REQUIRED: "Tracking Option Name is required.",
}

const zodSchema = z
  .object({
    contact_status: z.string(),
    enabled_for_doing_business: z.boolean(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    website: z.string(),
    country_code: z.string(),
    state_name: z.string(),
    zip_code: z.string(),
    city: z.string(),
    reference: z.string(),
    is_supplier: z.boolean(),
    is_customer: z.boolean(),
    tracking_category_name: z.string(),
    tracking_option_name: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.EMAIL_REQUIRED,
        path: ['email'],
      })
    }
    if (!data.first_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.FIRST_NAME_REQUIRED,
        path: ['first_name'],
      })
    }
    if (!data.last_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.LAST_NAME_REQUIRED,
        path: ['last_name'],
      })
    }
    if (!data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PHONE_REQUIRED,
        path: ['phone'],
      })
    }
    if (!data.is_supplier) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.IS_SUPPLIER_REQUIRED,
        path: ['is_supplier'],
      })
    }
    if (!data.is_customer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.IS_CUSTOMER_REQUIRED,
        path: ['is_customer'],
      })
    }
    if (!data.contact_status) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.CONTACT_STATUS_REQUIRED,
        path: ['contact_status'],
      })
    }
    if (!data.enabled_for_doing_business) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.ENABLED_FOR_DOING_BUSINESS_REQUIRED,
        path: ['enabled_for_doing_business'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  'contact_status': '',
  'enabled_for_doing_business': false,
  'first_name': '',
  'last_name': '',
  'email': '',
  'phone': '',
  'website': '',
  'country_code': '',
  'state_name': '',
  'zip_code': '',
  'city': '',
  'reference': '',
  'is_supplier': false,
  'is_customer': false,
  'tracking_category_name': '',
  'tracking_option_name': '',


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
    console.log('contact-create-success', values)
    try {
      await new Promise((resolve, reject) => {
        if (values.email === '') {
          setTimeout(
            () => reject(new Error('Contact validation error')),
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
      if (error.message ==='Contact validation error') {
        setFieldError('email', 'This email is not allowed')

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
    console.log('contact-create-error', error)
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
            <span> Contact</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500"> Edit a new  Contact record </span>
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
                  <div class="tablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="first_name">
                      <BaseInput label="First Name" placeholder="Ex: Name" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="tablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="last_name">
                      <BaseInput label="Last Name" placeholder="Ex: Name" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="tablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="phone">
                      <BaseInput label="Phone" placeholder="Ex:+8801711111111" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
                      <BaseInput label="Email" placeholder="Ex: ab@gmail.com" :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" @update:model-value="handleChange" @blur="handleBlur" />
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="is_supplier">
                      <BaseCheckbox label="Supplier" shape="rounded" color="primary"
                                    :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                    @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="is_customer">
                      <BaseCheckbox label="Customer" shape="rounded" color="primary"
                                    :model-value="field.value" :error="errorMessage" :disabled="isSubmitting"
                                    @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="contact_status">
                      <BaseInput label="Contact Status" placeholder="Ex: Business Income" :model-value="field.value"
                                 :error="errorMessage" :disabled="isSubmitting" type="text"
                                 @update:model-value="handleChange" @blur="handleBlur"/>
                    </Field>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                    <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="enabled_for_doing_business">
                      <BaseCheckbox label="Enable for doing business" shape="rounded" color="primary"
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


              <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="website">
                  <BaseInput label="Website" placeholder="Ex: website.com" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="country_code">
                  <BaseListbox
                    label="Country Code"
                    :items="countryCode"
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
              <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="state_name">
                  <BaseInput label="State Name" placeholder="Ex:123" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="zip_code">
                  <BaseInput label="Zip Code" placeholder="Ex: 123" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="tablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="city">
                  <BaseInput label="City" placeholder="Ex: 123" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="reference">
                  <BaseInput label="Reference" placeholder="Ex: Business Income" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="tracking_category_name">
                  <BaseInput label="Tracking Category Name" placeholder="Ex: Business Income" :model-value="field.value"
                             :error="errorMessage" :disabled="isSubmitting" type="text"
                             @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>
              <div class="ltablet:col-span-6 col-span-12 lg:col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="tracking_option_name">
                  <BaseInput label="Tracking Option Name" placeholder="Ex: Business Income" :model-value="field.value"
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
