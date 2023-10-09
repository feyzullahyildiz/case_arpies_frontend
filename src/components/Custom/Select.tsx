import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = TextFieldProps & {
  register: UseFormRegisterReturn;
  value: number | string | undefined | null;
};
export const CustomSelect: React.FC<Props> = ({
  register,
  value,
  ...props
}) => {
  return <TextField select value={value} inputProps={register} {...props} />;
};
