import { useEffect, useState } from "react"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

import { API } from "@constants/api.const"
import { FIELDS } from "@constants/fields.const"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"
import { userActions } from "@state/redux/userSlice"

interface SearchUserProps {
  form: any
  error: string | undefined
}

function SearchUser({ form, error }: SearchUserProps) {
  const dispatch = useAppDispatch()
  const { options } = useAppSelector(state => state.user.searchUser)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (searchInput.length >= 3) {
        dispatch(
          userActions.searchUser({
            searchInput,
            handleUnregisteredUsers: false,
          }),
        )
      }
    }, API.debounce.userSearch)
    return () => clearTimeout(timeout)
  }, [searchInput])

  return (
    <>
      <Autocomplete
        options={options}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        multiple
        onChange={(_event, value) => {
          form.setFieldError(FIELDS.members.name, "")
          form.setFieldValue(FIELDS.members.name, value)
        }}
        getOptionLabel={option =>
          `name: "${option.name}", email: "${option.email}"`
        }
        renderInput={params => (
          <TextField
            {...params}
            onChange={e => {
              if (e.target.value?.length > 3) {
                setSearchInput(e.target.value)
              }
            }}
            label={FIELDS.members.label}
            variant="outlined"
            error={Boolean(error)}
            helperText={error}
          />
        )}
      />
    </>
  )
}

export default SearchUser
