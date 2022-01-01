import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  getGroupSearchOption,
  setGroupSearchSelectesOptionActionCreator,
  setSearchGroupError,
} from '../redux/actions/searchGroupActions';
import { dashboardStyles } from '../styles/style';
import { VALUE } from '../constants/finalConstant';

export type SearchUserOptionType = {
  name: string;
  id: string;
  email: string;
  userName: string;
};

function SearchGroup() {
  const dispatch = useDispatch();
  const { options, error } = useSelector(
    (state: RootState) => state.searchGroup
  );
  const [inputGroup, setInputGroup] = useState('');
  const classes = dashboardStyles();

  /**
   * Time out of 3 second is added, and fetchResult is only called
   * when user stops typing (ie, inputGroupMember doesn't change else the timeout is cleared)
   */
  useEffect(() => {
    let timeout = setTimeout(() => {
      if (inputGroup.length >= 3) dispatch(getGroupSearchOption(inputGroup));
    }, VALUE.debounceTime);
    return () => clearTimeout(timeout);
  }, [inputGroup]);

  return (
    <>
      <Autocomplete
        id="add-group"
        className={classes.item}
        options={options}
        getOptionSelected={(option, value) => option.id === value.id}
        multiple={true}
        onChange={(e, v) => {
          dispatch(setSearchGroupError(undefined));
          dispatch(setGroupSearchSelectesOptionActionCreator(v));
        }}
        getOptionLabel={(option) => `${option.name}`}
        renderInput={(params) => (
          <TextField
            onChange={(e) => {
              if (e.target.value?.length > 3) {
                setInputGroup(e.target.value);
              }
            }}
            {...params}
            label="Add Groups"
            variant="outlined"
            error={Boolean(error)}
            helperText={error}
          />
        )}
      />
    </>
  );
}

export default SearchGroup;
