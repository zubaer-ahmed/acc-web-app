import {reactive} from 'vue'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = (query.token as string) || ''
  const uid = (query.uid as string) || ''

  const result = reactive({
    data: [{}]
  })

  const param = reactive({token: token, uid: uid})
  const account: any = await getData(param)
  result.data = account.data.original.data
  return {
    data: result.data
  }
})

async function getData(param: any) {
  const config = useRuntimeConfig();
  const baseURL = config.public.coreApi;
  const endpoint = baseURL + '/account/read';
  const payload = {
    token: param.token,
    uid: param.uid,
  }
  return await $fetch(endpoint, {
    method: 'POST',
    body: payload
  }).catch((error) => {
    console.log(error.data)
  })
}
