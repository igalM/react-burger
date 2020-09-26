import Button, { ButtonProps } from "@material-ui/core/Button";
import { brown, green } from "@material-ui/core/colors";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export type CustomButtonProps = Omit<ButtonProps, "color"> & {
    color: "green" | "brown";
};

const buttonColors = {
    green: green[700],
    brown: brown[700],
};

const buttonHoverColors = {
    green: green[800],
    brown: brown[800],
};

const useStyles = makeStyles({
    root: ({ color }: CustomButtonProps) => ({
        width: "180px",
        margin: "15px auto",
        color: "#fff",
        backgroundColor: buttonColors[color],
        "&:hover": {
            backgroundColor: buttonHoverColors[color],
        },
    }),
});

export const CustomButton: React.FC<CustomButtonProps> = ({
    color,
    ...props
}) => (
        <Button
            className={useStyles({ color }).root}
            variant="contained"
            {...props}
        />
    );