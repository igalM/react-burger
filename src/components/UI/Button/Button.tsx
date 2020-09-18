import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, brown } from '@material-ui/core/colors';

interface Props {
    className: string;
    children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '150px',
        margin: '10px auto',
        color: '#fff'
    },
    greenButton: {
        backgroundColor: green[700],
        '&:hover': {
            backgroundColor: green[800],
        },
    },
    brownButton: {
        backgroundColor: brown[700],
        '&:hover': {
            backgroundColor: brown[800],
        },
    }
}));

export const CustomButton: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({ children, className, ...props }: Props) => {
    const classes = useStyles();
    return <Button
        variant="contained"
        className={clsx(classes.root, {
            [classes.greenButton]: className === "success",
            [classes.brownButton]: className === "danger"
        })}
        {...props}>
        {children}</Button>
}
