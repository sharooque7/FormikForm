import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik"; ///Select will not have default values stored in Formilk so handle manual

const SelectWrapper = ({ name, options, ...otherProps }) => {
  const [field, meta] = useField(name); //Get filed Name and Meta
  const { setFieldValue } = useFormikContext(); //Used to manage and set the value of select
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  //configuration passed to component
  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
