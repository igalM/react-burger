import React, { useEffect, useCallback, Fragment } from 'react';
import styles from './Layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions';
import CustomToolbar from '../../components/Navigation/Toolbar/Toolbar';
import DrawerContext from '../../contexts/drawer-context';

const Layout = ({ children }) => {

    const dispatch = useDispatch();
    const onInitIngredients = useCallback(() => dispatch(actionCreators.fetchIngredients()), [dispatch]);

    const isAuthenticated = useSelector(state => state.authReducer.token !== null);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    return (
        <DrawerContext>
            <Fragment>
                <CustomToolbar
                    isAuthenticated={isAuthenticated} />
                <main className={styles.content}>
                    {children}
                </main>
            </Fragment>
        </DrawerContext>
    );
}

export default Layout;
