import React, { useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from "../../store/actions";

const Orders = props => {

    const dispatch = useDispatch();
    const onInitOrders = useCallback((token, userId) => dispatch(actionCreators.fetchOrders(token, userId)), [dispatch]);

    const orders = useSelector(state => state.ordersReducer.orders);
    const loading = useSelector(state => state.ordersReducer.loading);
    const token = useSelector(state => state.authReducer.token);
    const userId = useSelector(state => state.authReducer.id);

    useEffect(() => {
        onInitOrders(token, userId);
    }, [token, userId, onInitOrders])

    let userOrders = <Spinner />;
    if (!loading) {
        userOrders = orders.map(item => (
            <Order
                key={item.id}
                ingredients={item.ingredients}
                price={+item.price}
                date={item.date} />
        ))
    }
    return (
        <div>
            {userOrders}
        </div>
    );
}

export default withErrorHandler(Orders, axios);
