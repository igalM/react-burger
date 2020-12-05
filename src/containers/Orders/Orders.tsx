import React, { useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from "../../store/actions";
import { selectOrdersLoadingState, selectOrdersState, selectTokenState, selectUserIdState } from '../../store/reducers/selectors';

const Orders: React.FC = () => {

    const orders = useSelector(selectOrdersState);
    const loading = useSelector(selectOrdersLoadingState);
    const token = useSelector(selectTokenState);
    const userId = useSelector(selectUserIdState);


    const dispatch = useDispatch();
    const initOrders = useCallback((token, userId) => dispatch(actionCreators.fetchOrders(token, userId)), [dispatch]);

    useEffect(() => {
        initOrders(token, userId);
    }, [token, userId, initOrders])

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

export default WithErrorHandler(Orders, axios);
