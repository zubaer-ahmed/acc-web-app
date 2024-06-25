<script setup lang="ts">
import {Field, useForm} from 'vee-validate'
import {z} from 'zod'
import {storeToRefs} from 'pinia'
import {useUserStore} from "@/stores/auth/user";

definePageMeta({
  layout: 'empty',
  title: 'signin',
})

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

//const validationSchema = toTypedSchema(zodSchema)
const initialValues: any = computed<FormInput>(() => ({
  "email": "",
  "password": "",
}))

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
} = useForm({
  initialValues,
})

const router = useRouter()
const toaster = useToaster()
const onSubmit = handleSubmit(async (values) => {
  try {
    await new Promise((resolve, reject) => {
      if (values.email === '') {
        setTimeout(
          () => reject(new Error('Signin validation error')),
          2000,
        )
      }
      setTimeout(resolve, 4000)
    })
    const userStore = useUserStore()
    const {getSignin} = storeToRefs(userStore)
    const signinData = await userStore.setSignin(values)
    const authToken = signinData?.token
    if (
      authToken !== undefined &&
      // authToken !== null &&
      authToken !== ''
    ) {
      const token = ref("")
      const tokenCookie = useCookie('token')
      token.value = authToken
      tokenCookie.value = token.value
      if (signinData?.is_two_factor_enabled == 1) {
        await router.push('/dashboard')
      } else {
        await router.push('/email-verification')
      }
    }
  } catch (error: any) {
    if (error.message === 'Signin validation error') {
      setFieldError('email', 'This credential is not right.')
    }
    toaster.clearAll()
    await toaster.show({
      title: 'Error',
      message: error.message,
      color: 'danger',
      icon: 'ph:user-circle-fill',
      closable: true,
    })
    return
  }
})
</script>


<template>
  <div class="h-screen md:flex">
    <div class="from-primary-900 to-primary-500 i group relative hidden w-1/2 items-center justify-around overflow-hidden bg-gradient-to-tr md:flex">
      <div class="mx-auto max-w-xs text-center">
        <BaseHeading as="h2" size="3xl" weight="medium" class="text-white"> Do not have an Account? </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-200 mb-3"> No need to waste time on this page, let's take you back to your account </BaseParagraph>
        <BaseButton to="/auth/signup" shape="curved" class="w-full">Signup Now</BaseButton>
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
        <NuxtLink to="/dashboard" class="text-muted-400 hover:text-primary-500 dark:text-muted-700 dark:hover:text-primary-500 transition-colors duration-300">
          <TairoLogo class="h-10 w-10" />
        </NuxtLink>
        <div>
          <BaseThemeToggle />
        </div>
      </div>
      <form method="POST" action="" @submit.prevent="onSubmit" class="mt-6" novalidate>
        <BaseHeading as="h2" size="3xl" weight="medium"> Welcome back!</BaseHeading>
        <BaseParagraph size="sm" class="text-muted-400 mb-6"> Enter your OTP to verify email
        </BaseParagraph>
        <div class="space-y-4">
          <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="otp">


              <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                <div class="w-16 h-16 ">
                  <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                </div>
                <div class="w-16 h-16 ">
                  <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                </div>
                <div class="w-16 h-16 ">
                  <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                </div>
                <div class="w-16 h-16 ">
                  <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="">
                </div>
              </div>
          </Field>

        </div>

        <!--Submit-->
        <div class="mt-6">
          <div class="block w-full rounded-md shadow-sm">
            <BaseButton :disabled="isSubmitting" :loading="isSubmitting" type="submit" color="primary"
                        class="!h-11 w-full"> Verify Email
            </BaseButton>
          </div>
        </div>
      </form>
      <div class="text-center">
        <BaseText size="sm" class="text-muted-400"> © {{ new Date().getFullYear() }} Accomium. All rights reserved. </BaseText>
      </div>
    </div>
  </div>
</template>
