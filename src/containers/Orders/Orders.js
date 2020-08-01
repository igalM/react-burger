import React, { Component } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                const orders = [];
                for (let i in res.data) {
                    orders.push({
                        ...res.data[i],
                        id: i
                    });
                }
                this.setState({ loading: false, orders: orders.reverse() });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(item => (
                    <Order
                        key={item.id}
                        ingredients={item.ingredients}
                        price={+item.price}
                        date={item.date} />
                ))}
            </div>
        );
    }

}

export default withErrorHandler(Orders, axios);