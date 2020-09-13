import React, { useEffect, useCallback, Fragment } from 'react';
import styles from './Layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions';
import CustomToolbar from '../../components/Navigation/Toolbar/Toolbar';
import { DrawerProvider } from '../../contexts/drawer-context';
import { RootState } from '../../store/reducers';

const Layout: React.FC = ({ children }) => {

    const dispatch = useDispatch();
    const onInitIngredients = useCallback(() => dispatch(actionCreators.fetchIngredients()), [dispatch]);

    const isAuthenticated = useSelector((state: RootState) => state.authReducer.token !== null);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    return (
        <DrawerProvider>
            <Fragment>
                <CustomToolbar
                    isAuthenticated={isAuthenticated} />
                <main className={styles.content}>
                    {children}
                </main>
            </Fragment>
        </DrawerProvider>
    );
}

export default Layout;
