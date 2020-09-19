import React, { useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from "../../store/actions";
import { selectOrdersLoadingState, selectOrdersState, selectTokenState, selectUserIdState } from '../../store/reducers/selectors';

const Orders: React.FC = () => {

    const dispatch = useDispatch();
    const onInitOrders = useCallback((token, userId) => dispatch(actionCreators.fetchOrders(token, userId)), [dispatch]);

    const orders = useSelector(selectOrdersState);
    const loading = useSelector(selectOrdersLoadingState);
    const token = useSelector(selectTokenState);
    const userId = useSelector(selectUserIdState);

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
