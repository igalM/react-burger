import React from 'react';
import { useField } from "formik";
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectProps } from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';

type FormikTextFieldProps = {
    formikKey: string,
    options: { value: string, displayName: string }[],
} & SelectProps

export const SelectField: React.FC<FormikTextFieldProps> = ({ formikKey, options, ...props }: FormikTextFieldProps) => {
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