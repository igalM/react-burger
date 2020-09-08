import React from 'react';
import styles from './Order.module.scss';

const Order = props => {
    const ingredients = [];
    for (let igName in props.ingredients) {
        ingredients.push({
            ingredient: igName,
            amount: props.ingredients[igName]
        });
    }
    const output = ingredients.map(ig => {
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
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
            <p>Date Ordered: {props.date}</p>
        </div>
    );
}

export default Order;