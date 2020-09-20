import React from 'react';
import { Ingredients } from '../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
    order: {
        width: '80%',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        padding: '10px',
        margin: '10px auto',
        boxSizing: 'border-box'
    },
    span: {
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px"
    }
}));

interface Props {
    ingredients: Ingredients;
    price: number;
    date: string;
}

const Order: React.FC<Props> = ({ ingredients, price, date }: Props) => {
    const classes = useStyles();

    const ings = [];
    for (let igName in ingredients) {
        ings.push({
            ingredient: igName,
            amount: ingredients[igName]
        });
    }
    const output = ings.map(ig => {
        return <span
            key={ig.ingredient}
            className={classes.span}>{ig.ingredient} ({ig.amount})
        </span>
    });

    return (
        <div className={classes.order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
            <p>Date Ordered: {date}</p>
        </div>
    );
}

export default React.memo(Order);