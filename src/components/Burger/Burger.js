import React from 'react';
import styles from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
    let ings = Object.keys(ingredients)
        .map(ingredientKey => {
            return [...Array(ingredients[ingredientKey])]
                .map((x, i) => <BurgerIngredient
                    key={ingredientKey + i} type={ingredientKey}
                />)
        })
        .reduce((acc, v) => acc.concat(v), [])

    if (ingredients.length === 0) {
        ings = <p>Please start adding ingredients</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ings}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;