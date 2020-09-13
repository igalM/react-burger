import React from 'react';
import { Ingredients } from '../../types';
import styles from './Order.module.scss';

interface Props {
    ingredients: Ingredients;
    price: number;
    date: string;
}

const Order: React.FC<Props> = ({ ingredients, price, date }: Props) => {
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
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
            }}
        >{ig.ingredient} ({ig.amount})
        </span>
    })
    return (
        <div className={styles.Order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
            <p>Date Ordered: {date}</p>
        </div>
    );
}

export default React.memo(Order);