<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from 'pinia';
import { Field, useForm } from 'vee-validate';
import { useReCaptcha } from "vue-recaptcha-v3";
import { z } from 'zod';
import { useOAuthStore } from "~/stores/auth/oauth";
import { useRecaptchaStore } from "~/stores/auth/recaptcha";
import { useUserStore } from "~/stores/auth/user";

definePageMeta({
  layout: 'empty',
  title: 'Signin',
})

//1. validate using zod(0. form validation 1. field validation).
const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
  PASSWORD_REQUIRED: 'A password is required',
}

const zodSchema = z.object({
  email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
  password: z.string().min(1, VALIDATION_TEXT.PASSWORD_REQUIRED),
  //  trustDevice: z.boolean(),
})

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  "email": "",
  "password": "",
}))

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
}: any = useForm({
  initialValues,
})

//2. recaptcha function.
//2.1 email
const { executeRecaptcha, recaptchaLoaded }: any = useReCaptcha();
const recaptcha = async () => {
  await recaptchaLoaded();
  const token = await executeRecaptcha('submit');
  const payload = {
    "token": token,
    "action": "submit"
  };

  const recaptchaStore = useRecaptchaStore();
  const recaptchaData: any = await recaptchaStore.setRecaptcha(payload);
  if (recaptchaData !== undefined && recaptchaData.data.score >= 0.5) {
    await onSubmit();
  }
};
//2.2 google
const recaptchaGoogle = async () => {
  await recaptchaLoaded();
  const token = await executeRecaptcha('submit');
  const payload = {
    "token": token,
    "action": "submit"
  };

  const recaptchaStore = useRecaptchaStore();
  const recaptchaData: any = await recaptchaStore.setRecaptcha(payload);
  if (recaptchaData !== undefined && recaptchaData.data.score >= 0.5) {
    await onSubmitGoogle();
  }
};

//3. submit function.
const router = useRouter()
const toaster = useToaster()
//3.1 email
const onSubmit = handleSubmit(async (values: any) => {
  let uData = {
    email: '',
    password: '',
  };
  uData.email = values.email
  uData.password = values.password

  try {
    await new Promise((resolve, reject) => {
      if (values.email === '') {
        setTimeout(
          () => reject(new Error('Signin validation error')),
          1000,
        )
      }
      setTimeout(resolve, 2000)
    })
    const userStore = useUserStore()
    const { getSignin } = storeToRefs(userStore)
    const signinData: any = await userStore.setSignin(uData)
    toaster.clearAll()
    if (signinData.notification !== undefined) {
      await toaster.show({
        title: 'Signin',
        message: ` ${signinData.notification.message}`,
        color: 'danger',
        icon: 'ph:warning',
        closable: true,
      })
    } else {
      await toaster.show({
        title: 'Signin',
        message: `Account signed in for ${values.email}`,
        color: 'success',
        icon: 'ph:check',
        closable: true,
      })
      await router.push('/dashboard')
    }
  } catch (error: any) {
    if (error.message === 'Signin validation error') {
      setFieldError('email', 'This email is not in our system')
    }
  }
})
//3.1 google
const onSubmitGoogle = handleSubmit(async (values: any) => {
  let uData = {
  };

  try {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 2000)
    })
    const oAuthStore = useOAuthStore()
    const { getRedirect } = storeToRefs(oAuthStore)
    const redirectData: any = await oAuthStore.setRedirect(uData)
    await navigateTo(redirectData.data.redirect_url, {
      external: true
    })

  } catch (error: any) { }
})
</script>


<template>
  <div class="h-screen md:flex">
    <div
      class="from-primary-900 to-primary-500 i group relative hidden w-1/2 items-center justify-around overflow-hidden bg-gradient-to-tr md:flex">
      <div class="mx-auto max-w-xs text-center">
        <BaseHeading as="h2" size="3xl" weight="medium" class="text-white"> Do not have an Account? </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-200 mb-3"> No need to waste time on this page, let's take you back to
          your account </BaseParagraph>
        <BaseButton to="/auth/signup" shape="curved" class="w-full">Signup Now</BaseButton>
      </div>
      <div
        class="bg-muted-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72">
      </div>
      <div
        class="bg-muted-200/20 absolute -top-12 start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48">
      </div>
      <div
        class="bg-muted-200/20 absolute -start-7 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-40">
      </div>

      <div
        class="bg-muted-200/20 absolute -bottom-6 -end-6 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-72">
      </div>
      <div
        class="bg-muted-200/20 absolute -bottom-12 end-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48">
      </div>
      <div
        class="bg-muted-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40">
      </div>
    </div>
    <div class="dark:bg-muted-900 flex flex-col items-center justify-between bg-white py-10 md:w-1/2">
      <div class="mx-auto flex w-full max-w-xs items-center justify-between">
        <NuxtLink to="/"
          class="text-muted-400 hover:text-primary-500 dark:text-muted-700 dark:hover:text-primary-500 transition-colors duration-300">
          <Icon name="twemoji:letter-a" class="h-10 w-10" />
        </NuxtLink>
        <div>
          <BaseThemeToggle />
        </div>
      </div>
      <form method="POST" action="" @submit.prevent="recaptcha" class="mx-auto w-full max-w-xs" novalidate>
        <BaseHeading as="h2" size="3xl" weight="medium"> Welcome back!</BaseHeading>
        <BaseParagraph size="sm" class="text-muted-400 mb-6">Let's start by entering into system
        </BaseParagraph>
        <div class="space-y-4">
          <div class="grid grid-gap-2">
            <button type="button" @click="recaptchaGoogle()"
              class="bg-muted-200 dark:bg-muted-700 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 nui-focus relative inline-flex w-full items-center justify-center rounded px-0 py-3 text-center text-sm font-semibold shadow-sm transition-all duration-300 hover:bg-white">
              <Icon name="fa6-brands:google" class="h-5 w-full" />
            </button>
          </div>
          <BaseParagraph size="sm" class="text-muted-400 mb-6 text-center">OR </BaseParagraph>
          <hr />
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
            <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email"
              label="Email address" placeholder="Email address" icon="ph:user-duotone"
              @update:model-value="handleChange" @blur="handleBlur" />
          </Field>
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password">
            <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password"
              label="Password" placeholder="Password" icon="ph:lock-duotone" @update:model-value="handleChange"
              @blur="handleBlur" />
          </Field>
        </div>

        <!--Submit-->
        <div class="mt-6">
          <div class="block w-full rounded-md shadow-sm">
            <BaseButton :disabled="isSubmitting" :loading="isSubmitting" type="submit" color="primary"
              class="!h-11 w-full"> Sign in
            </BaseButton>
          </div>
        </div>
        <div class="text-sm leading-5">
          <NuxtLink to="/auth/forgot-password"
            class="text-primary-600 hover:text-primary-500 font-sans text-xs font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline">
            Forgot your password?
          </NuxtLink>
        </div>
      </form>
      <div class="text-center">
        <BaseText size="sm" class="text-muted-400"> © {{ new Date().getFullYear() }} Accomium. All rights reserved.
        </BaseText>
      </div>
    </div>
  </div>
</template>
