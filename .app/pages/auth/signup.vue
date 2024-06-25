<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'
import {storeToRefs} from "pinia";
import {useRecaptchaStore} from "@/stores/auth/recaptcha";
import {useReCaptcha} from "vue-recaptcha-v3";
import {useUserStore} from "@/stores/auth/user";

definePageMeta({
  layout: 'empty',
  title: 'Signup',
})

//1. validate using zod(0. form validation 1. field validation).
const VALIDATION_TEXT = {
  FIRST_NAME_REQUIRED: 'A valid first name is required',
  LAST_NAME_REQUIRED: 'A valid last name is required',
  EMAIL_REQUIRED: 'A valid email is required',
  PASSWORD_LENGTH: 'Password must be at least 6 characters',
  PASSWORD_MATCH: 'Passwords do not match',
}

const zodSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string().min(6, VALIDATION_TEXT.PASSWORD_LENGTH),
    confirmPassword: z.string(),
  })
    .superRefine((data, ctx) => {
      if (!data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.EMAIL_REQUIRED,
          path: ['email'],
        })
      }
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.PASSWORD_MATCH,
          path: ['confirmPassword'],
        })
      }
    })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
}))

const { handleSubmit, isSubmitting, setFieldError } = useForm({
  validationSchema,
  initialValues,
})

//2. recaptcha function.
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
const recaptcha = async () => {
  await recaptchaLoaded();
  const token = await executeRecaptcha('submit');
  const payload={
    "token" : token,
    "action" : "submit"
  };

  const recaptchaStore = useRecaptchaStore();
  const recaptchaData = await recaptchaStore.setRecaptcha(payload);
  if(recaptchaData !==undefined && recaptchaData.data.score>=0.5){
    await  onSubmit();
    }
};

//3. submit function.
const router = useRouter()
const toaster = useToaster()

const onSubmit = handleSubmit(async (values) => {
  let uData= {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };
  uData.first_name=values.first_name
  uData.last_name=values.last_name
  uData.email=values.email
  uData.password=values.password
  try {
    await new Promise((resolve, reject) => {
      if (values.email === '') {
        setTimeout(
          () => reject(new Error('Signup validation error')),
           1000,
        )
      }
      setTimeout(resolve, 2000)
    })
    const userStore = useUserStore()
    const {getSignup} = storeToRefs(userStore)
    const signupData = await userStore.setSignup(uData)
    toaster.clearAll()
    if(signupData.notification!==undefined){
      await toaster.show({
        title: 'Signup',
        message: ` ${signupData.notification.message}`,
        color: 'danger',
        icon: 'ph:warning',
        closable: true,
      })
    }else{
      await toaster.show({
        title: 'Signup',
        message: `Account created for ${values.email}`,
        color: 'success',
        icon: 'ph:check',
        closable: true,
      })
      await router.push('/auth/signin')
    }
  } catch (error: any) {
    if (error.message === 'Signup validation error') {
      setFieldError('email', 'This email is already taken')
    }
  }
})
</script>

<template>
  <div class="h-screen md:flex">
    <div class="from-primary-900 to-primary-500 i group relative hidden w-1/2 items-center justify-around overflow-hidden bg-gradient-to-tr md:flex">
      <div class="mx-auto max-w-xs text-center">
        <BaseHeading as="h2" size="3xl" weight="medium" class="text-white"> Have an Account? </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-200 mb-3"> No need to waste time on this page, let's take you back to your account </BaseParagraph>
        <BaseButton to="/auth/signin" shape="curved" class="w-full">Signin to Account</BaseButton>
      </div>
      <div class="bg-muted-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72"></div>
      <div class="bg-muted-200/20 absolute -top-12 start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"></div>
      <div class="bg-muted-200/20 absolute -start-7 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-40"></div>

      <div class="bg-muted-200/20 absolute -bottom-6 -end-6 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-72"></div>
      <div class="bg-muted-200/20 absolute -bottom-12 end-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"></div>
      <div class="bg-muted-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40"></div>
    </div>
    <div class="dark:bg-muted-900 flex flex-col items-center justify-between bg-white py-10 md:w-1/2">
      <div class="mx-auto flex w-full max-w-xs items-center justify-between">
        <NuxtLink to="/" class="text-muted-400 hover:text-primary-500 dark:text-muted-700 dark:hover:text-primary-500 transition-colors duration-300">
        <Icon name="twemoji:letter-a" class="h-10 w-10" />
        </NuxtLink>
        <div>
          <BaseThemeToggle />
        </div>
      </div>
      <form method="POST" action="" @submit.prevent="recaptcha" class="mx-auto w-full max-w-xs" novalidate>
        <BaseHeading as="h2" size="3xl" weight="medium"> Welcome </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-400 mb-6"> Let's start by creating you account </BaseParagraph>

        <div class="mb-4 space-y-3">
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="first_name">
            <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" shape="curved" placeholder="First Name" icon="ph:fingerprint-duotone" @update:model-value="handleChange" @blur="handleBlur" />
          </Field>
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="last_name">
            <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="text" shape="curved" placeholder="Last Name" icon="ph:fingerprint-duotone" @update:model-value="handleChange" @blur="handleBlur" />
          </Field>
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
            <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email" shape="curved" placeholder="Email Address" icon="ph:at-duotone" @update:model-value="handleChange" @blur="handleBlur" />
          </Field>
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password">
            <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password" shape="curved" placeholder="Password" icon="ph:lock-duotone" @update:model-value="handleChange" @blur="handleBlur" />
          </Field>
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="confirmPassword">
            <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password" shape="curved" placeholder="Confirm password" icon="ph:check" @update:model-value="handleChange" @blur="handleBlur" />
          </Field>
        </div>
        <BaseButton :disabled="isSubmitting" :loading="isSubmitting" type="submit" shape="curved" color="primary" class="!h-11 w-full"> Create Account </BaseButton>
        <!--No account link-->
        <p class="text-muted-400 mt-4 flex justify-between font-sans text-sm leading-5">
          <span>Have an account?</span>
          <NuxtLink to="/auth/signin" class="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline focus:underline focus:outline-none"> Sign in here </NuxtLink>
        </p>
      </form>
      <div class="text-center">
        <BaseText size="sm" class="text-muted-400"> © {{ new Date().getFullYear() }} Accomium. All rights reserved. </BaseText>
      </div>
    </div>
  </div>
</template>
