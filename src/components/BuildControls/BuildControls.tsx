import React from 'react';
import { Ingredients } from '../../types';
import styles from './BuildControls.module.scss';
import Control from './Control/Control';

interface Props {
    price: number;
    btnDisabled: Ingredients;
    purchasable: boolean;
    isAuthenticated: boolean;
    onAddIngredient: (type: string) => {};
    onRemoveIngredient: (type: string) => {};
    orderBtnClick: () => void;
}

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls: React.FC<Props> = ({
    price,
    onAddIngredient,
    onRemoveIngredient,
    btnDisabled,
    orderBtnClick,
    purchasable,
    isAuthenticated
}) => (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <Control
                    key={ctrl.label}
                    label={ctrl.label}
                    onAddIngredient={() => onAddIngredient(ctrl.type)}
                    onRemoveIngredient={() => onRemoveIngredient(ctrl.type)}
                    disabled={btnDisabled[ctrl.type] === 0}
                />
            ))}
            <button
                onClick={orderBtnClick}
                disabled={!purchasable}
                className={styles.OrderButton}>{isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )

export default BuildControls;