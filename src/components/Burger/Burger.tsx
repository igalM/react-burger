import React from 'react';
import { BreadType, Ingredients } from '../../types';
import styles from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

interface Props {
    ingredients: Ingredients;
}

const Burger = ({ ingredients }: Props) => {
    const ings = Object.keys(ingredients)
        .map(ingredientKey => {
            return [...Array(ingredients[ingredientKey])]
                .map((x, i) => <BurgerIngredient
                    key={ingredientKey + i} type={ingredientKey}
                />)
        })
        .reduce((acc, v) => acc.concat(v), [])

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type={BreadType.BreadTop} />
            {ings.length === 0 ? <p>Please start adding ingredients</p> : ings}
            <BurgerIngredient type={BreadType.BreadBottom} />
        </div>
    );
}

export default Burger;