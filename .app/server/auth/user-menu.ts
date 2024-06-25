import { useUser} from "~/composables/auth/user";

export default defineEventHandler(async (event) => {
  const {us} = useUser();
  const result = await us(payload);
  console.log(result.value)
})
