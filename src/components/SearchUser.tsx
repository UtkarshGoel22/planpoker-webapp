import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { LABEL } from '../constants/constant';
import {
  getSearchOption,
  setSearchUserError,
  setUserSearchSelectesOptionActionCreator,
} from '../redux/actions/searchUserActions';
import { RootState } from '../redux/store';
import { VALUE } from '../constants/finalConstant';

export type SearchUserOptionType = {
  name: string;
  id: string;
  email: string;
  userName: string;
};

interface searchUserProps {
  customInput: boolean;
  widthInput: boolean;
}

const SearchUser = (props: searchUserProps) => {
  const { customInput, widthInput } = props;
  const dispatch = useDispatch();
  const { options, error } = useSelector(
    (state: RootState) => state.searchUser
  );

  const [searchInput, setInputGroupMember] = useState('');

  /**
   * Time out of 3 second is added, and fetchResult is only called
   * when user stops typing (ie, inputGroupMember doesn't change else the timeout is cleared)
   */
  useEffect(() => {
    let timeout = setTimeout(() => {
      if (searchInput.length >= 3)
        dispatch(getSearchOption(searchInput, customInput));
    }, VALUE.debounceTime);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionSelected={(option, value) => option.email === value.email}
        multiple={true}
        onChange={(_, selectedUsers) => {
          dispatch(setSearchUserError(undefined));
          dispatch(setUserSearchSelectesOptionActionCreator(selectedUsers));
        }}
        getOptionLabel={(option) => `${option.name} ${option.email}`}
        style={{ width: widthInput ? '' : 300 }}
        renderInput={(params) => (
          <TextField
            onChange={(e) => {
              if (e.target.value?.length > 3) {
                setInputGroupMember(e.target.value);
              }
            }}
            {...params}
            label={LABEL.addMembers}
            variant="outlined"
            error={Boolean(error)}
            helperText={error}
          />
        )}
      />
    </>
  );
};

export default SearchUser;
