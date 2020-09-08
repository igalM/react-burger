import React from 'react';
import { useField } from "formik";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';

export const SelectField = ({ formikKey, options, ...props }) => {
    const [field, meta] = useField(formikKey);
    return <FormControl margin="normal">
        <Select
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={meta.touched && Boolean(meta.error)}
            {...props}>
            {options.map((option, key) =>
                <MenuItem key={key} value={option.value}>{option.displayName}</MenuItem>
            )}
        </Select>
    </FormControl>
}