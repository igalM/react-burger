import React from 'react';
import styles from './BuildControls.module.scss';
import Control from './Control/Control';


const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <Control
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.added(ctrl.type)}
                removed={() => props.removed(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            onClick={props.orderBtnClick}
            disabled={!props.purchasable}
            className={styles.OrderButton}>ORDER NOW</button>
    </div>
)

export default BuildControls;