import React, { useMemo } from 'react';
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

const mapIngredientsToComponents = (ingredients: Ingredients) =>
    Object.entries(ingredients).flatMap(([ingredientName, ingredientAmount]) =>
        Array.from({ length: ingredientAmount }, (_, index) => (
            <BurgerIngredient
                key={`${ingredientName}${index}`}
                type={ingredientName}
            />
        ))
    );

const Burger: React.FC<Props> = ({ ingredients }) => {
    const { burger } = useStyles();
    const ingredientComponents = useMemo(
        () => mapIngredientsToComponents(ingredients),
        [ingredients]
    );

    return (
        <div className={burger}>
            <BurgerIngredient type={BreadType.BreadTop} />
            {ingredientComponents.length === 0 ? <p>Please start adding ingredients</p> : ingredientComponents}
            <BurgerIngredient type={BreadType.BreadBottom} />
        </div>
    );
}

export default Burger;