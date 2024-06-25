<script setup lang="ts">
import {Field, useForm} from 'vee-validate'
import {z} from 'zod'
import {storeToRefs} from 'pinia'
import {useUserStore} from "~/stores/auth/user";

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
        <BaseParagraph size="sm" class="text-muted-400 mb-6"> QR Code to Scan for generating Recovery Code
        </BaseParagraph>
        <div class="space-y-4">
          <div class="container mx-auto mt-10 flex max-w-3xl flex-wrap justify-center rounded-lg bg-white px-5 py-24">
            <!-- QR Code Number Account & Uploadfile -->
            <div class="flex-wrap md:flex">
              <div class="mx-auto">
                <img class="mx-auto mt-12 h-52 w-52 rounded-lg border p-2 md:mt-0" src="https://i.imgur.com/FQS7fFC.png" alt="step" />
                <!--                  <button class="mx-auto block rounded-md border bg-blue-500 px-6 py-2 text-white outline-none">YOTHIN BOUBPHA</button>-->
              </div>
              <!-- Step Checkout -->
              <div class="mt-8 max-w-sm md:mt-0 md:ml-10 md:w-2/3">
                <div class="relative flex pb-12">
                  <div class="absolute inset-0 flex h-full w-10 items-center justify-center">
                    <div class="pointer-events-none h-full w-1 bg-gray-200"></div>
                  </div>
                  <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow pl-4">
                    <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 1</h2>
                    <p class="font-laonoto leading-relaxed">
                      Add the<br />
                      <b>QR Code </b>in Google  Authenticator App.
                    </p>
                  </div>
                </div>
                <div class="relative flex pb-12">
                  <div class="absolute inset-0 flex h-full w-10 items-center justify-center">
                    <div class="pointer-events-none h-full w-1 bg-gray-200"></div>
                  </div>
                  <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div class="flex-grow pl-4">
                    <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 2</h2>
                    <p class="font-laonoto leading-relaxed">Get the <b>OTP </b>from  <b> Google  Authenticator App</b>.</p>
                  </div>
                </div>
                <div class="relative flex pb-12">
                  <div class="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-5 w-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="3"></circle>
                      <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                    </svg>
                  </div>
                  <div class="flex-grow pl-4">
                    <h2 class="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">STEP 3</h2>
                    <p class="font-laonoto leading-relaxed">
                     On the next page, input the <span> <b>OTP</b></span
                    >.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="text-center">
        <BaseText size="sm" class="text-muted-400"> © {{ new Date().getFullYear() }} Accomium. All rights reserved. </BaseText>
      </div>
    </div>
  </div>
</template>
