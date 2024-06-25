import { useUser} from "~/composables/auth/user";

export default defineEventHandler(async (event) => {
  const {profileImage} = useUser();
  const result = await profileImage(payload);
  console.log(result.value)
})
