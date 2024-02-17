import { useEffect, useState } from "react"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

import { API } from "@constants/api.const"
import { FIELDS } from "@constants/fields.const"
import { groupActions } from "@state/redux/groupSlice"
import { useAppDispatch, useAppSelector } from "@state/redux/hooks"

interface SearchGroupProps {
  form: any
  error: string | undefined
}

function SearchGroup({ form, error }: SearchGroupProps) {
  const dispatch = useAppDispatch()
  const { options } = useAppSelector(state => state.group.searchGroup)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (searchInput.length >= 3) {
        dispatch(groupActions.searchGroup(searchInput))
      }
    }, API.debounce.groupSearch)
    return () => clearTimeout(timeout)
  }, [searchInput])

  return (
    <>
      <Autocomplete
        options={options}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        multiple
        onChange={(_event, value) => {
          form.setFieldError(FIELDS.groups.name, "")
          form.setFieldValue(FIELDS.groups.name, value)
        }}
        getOptionLabel={option => `name: "${option.name}"`}
        renderInput={params => (
          <TextField
            {...params}
            onChange={e => {
              if (e.target.value?.length > 3) {
                setSearchInput(e.target.value)
              }
            }}
            label={FIELDS.groups.label}
            variant="outlined"
            error={Boolean(error)}
            helperText={error}
          />
        )}
      />
    </>
  )
}

export default SearchGroup
