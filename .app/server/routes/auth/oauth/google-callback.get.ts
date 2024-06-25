import {useOAuth} from "~/composables/auth/oauth";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  console.log('code: ' + query.code)
  if(query.code!==undefined){
    const payload={code: query.code}
    console.log(payload)
    const {callback} = useOAuth();
    const result = await callback(payload);
    console.log(result.value)
    if(result.email!==undefined){
      await sendRedirect(event, '/dashboard', 302)
    }
  }
})
