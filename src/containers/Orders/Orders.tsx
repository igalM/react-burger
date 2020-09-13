import React, { useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from "../../store/actions";
import { RootState } from '../../store/reducers';

const Orders: React.FC = props => {

    const dispatch = useDispatch();
    const onInitOrders = useCallback((token, userId) => dispatch(actionCreators.fetchOrders(token, userId)), [dispatch]);

    const orders = useSelector((state: RootState) => state.ordersReducer.orders);
    const loading = useSelector((state: RootState) => state.ordersReducer.loading);
    const token = useSelector((state: RootState) => state.authReducer.token);
    const userId = useSelector((state: RootState) => state.authReducer.userId);

    useEffect(() => {
        onInitOrders(token, userId);
    }, [token, userId, onInitOrders])

    const userOrders = orders.map(item => (
        <Order
            key={item.id}
            ingredients={item.ingredients}
            price={+item.price}
            date={item.date} />
    ));

    return (
        <div>
            {loading ? <Spinner /> : userOrders}
        </div>
    );
}

export default withErrorHandler(Orders, axios);
