import * as Yup from "yup"

export const MEMBER_SCHEMA = Yup.object().shape({
  name: Yup.string(),
  id: Yup.string(),
  email: Yup.string(),
  username: Yup.string(),
})
