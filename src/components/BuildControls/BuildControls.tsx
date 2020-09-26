import React from 'react';
import { Ingredients } from '../../types';
import styles from './BuildControls.module.scss';
import Control from './Control/Control';

interface Props {
    price: number;
    disabled: Ingredients;
    purchasable: boolean;
    isAuthenticated: boolean;
    added: (type: string) => {};
    removed: (type: string) => {};
    orderBtnClick: () => void;
}

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls = ({
    price,
    added,
    removed,
    disabled,
    orderBtnClick,
    purchasable,
    isAuthenticated
}: Props) => (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <Control
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => added(ctrl.type)}
                    removed={() => removed(ctrl.type)}
                    disabled={disabled[ctrl.type] === 0}
                />
            ))}
            <button
                onClick={orderBtnClick}
                disabled={!purchasable}
                className={styles.OrderButton}>{isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )

export default BuildControls;