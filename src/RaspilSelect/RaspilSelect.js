import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import classes from './RaspilSelect.module.scss';

const RaspilSelect = ({
  readOnly,
  disabled,
  label,
  handleSelectChange,
  value,
  error,
  helperText,
  placeholder,
  size,
  data,
  required,
  name,
}) => {

  const avatarPlate = (src, alt) => {
    return (
      <Avatar
        variant='square'
        alt={alt}
        src={src}
        classes={{ root: classes.avatar }}
      />
    );
  };
  const content = data.map((el, id) => {
    const { label, value, src } = el;
    let menuItem;

    menuItem = (
      <MenuItem key={id} value={value}>
        {src ? avatarPlate(src, label) : null}
        {
          <p className={value === 'no_kromka' ? classes.textNot : classes.text}>
            {label}
          </p>
        }
      </MenuItem>
    );

    return menuItem;
  });

  return (
    // error={invalid && touched}
    <TextField
      select
      variant='outlined'
      classes={{ root: classes.TextSelect }}
      placeholder={placeholder}
      value={value}
      helperText={helperText}
      error={error}
      label={label}
      disabled={disabled}
      fullWidth
      name={name}
      required={required}
      inputProps={{
        readOnly: readOnly,
      }}
      SelectProps={{
        autoWidth: true,
        classes: {
          root: classes.Select,
        },
      }}
      size={size}
      onChange={(event) => handleSelectChange(event, name)}>
      {data.length > 0 ? content : null}
    </TextField>
  );
};
export default React.memo(RaspilSelect);
