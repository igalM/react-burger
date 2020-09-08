import React from 'react';
import { useField } from "formik";
import { TextField } from '@material-ui/core';

export const InputField = ({ formikKey, ...props }) => {
    const [field, meta] = useField(formikKey);
    return <TextField
        id={field.name}
        name={field.name}
        helperText={meta.touched ? meta.error : ""}
        error={meta.touched && Boolean(meta.error)}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        margin="normal"
        {...props}
    />
}