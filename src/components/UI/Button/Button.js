import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = (e) => {
    submitForm();
    console.log(e);
  };
  const handleSubmits = (e) => {
    console.log(e);
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
    onSubmit: handleSubmits,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
