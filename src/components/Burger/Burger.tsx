import React from 'react';
import { BreadType, Ingredients } from '../../types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    burger: {
        width: '100%',
        margin: 'auto',
        height: '400px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        [theme.breakpoints.up('sm')]: {
            width: '500px',
            height: '400px'
        }
    }
}));


interface Props {
    ingredients: Ingredients;
}

const Burger = ({ ingredients }: Props) => {
    const { burger } = useStyles();
    const ings = Object.keys(ingredients)
        .map(ingredientKey => {
            return [...Array(ingredients[ingredientKey])]
                .map((x, i) => <BurgerIngredient
                    key={ingredientKey + i} type={ingredientKey}
                />)
        })
        .reduce((acc, v) => acc.concat(v), [])

    return (
        <div className={burger}>
            <BurgerIngredient type={BreadType.BreadTop} />
            {ings.length === 0 ? <p>Please start adding ingredients</p> : ings}
            <BurgerIngredient type={BreadType.BreadBottom} />
        </div>
    );
}

export default Burger;