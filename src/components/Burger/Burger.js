import React from 'react';
import styles from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])]
                .map((x, i) => <BurgerIngredient
                    key={ingredientKey + i} type={ingredientKey}
                />)
        })
        .reduce((acc, v) => acc.concat(v), [])

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;