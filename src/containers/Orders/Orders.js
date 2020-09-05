import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionCreators from "../../store/actions";


const Orders = ({ orders, loading, token, userId, onInitOrders }) => {

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

const mapStateToProps = state => ({
    orders: state.ordersReducer.orders,
    loading: state.ordersReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.id
})

const mapDispatchToProps = dispatch => ({
    onInitOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
