import React from "react";
import TextField from "@material-ui/core/TextField";

function InputField(props) {
  return (
    <>
      <TextField
        size="small"
        value={props.value}
        onChange={props.handleChange}
        fullWidth={true}
        error={props.error}
        label={props.label}
        name={props.name}
        helperText={props.error ? "Can't be blank" : ""}
        type={props.type}
      />
    </>
  );
}
export default InputField;
