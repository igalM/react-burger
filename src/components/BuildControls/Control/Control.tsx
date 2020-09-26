import React from 'react';
import styles from './Control.module.scss';

interface Props {
    label: string;
    disabled: boolean;
    onRemoveIngredient: () => {};
    onAddIngredient: () => {};
}

const Control: React.FC<Props> = ({ label, disabled, onRemoveIngredient, onAddIngredient }) => (
    <div className={styles.Control}>
        <div className={styles.Label}>{label}</div>
        <button
            disabled={disabled}
            onClick={onRemoveIngredient}
            className={styles.Less}>Less</button>
        <button
            onClick={onAddIngredient}
            className={styles.More}>More</button>
    </div>
)

export default Control;