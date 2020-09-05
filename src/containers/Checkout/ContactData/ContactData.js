import React, {Component} from 'react';
import styles from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionsCreators from '../../../store/actions';
import {connect} from 'react-redux';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                value: 'fastest',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    postHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            date: new Date().toLocaleDateString('en-GB'),
            userId: this.props.userId,
            orderData: formData
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, el) => {
        const updatedElement = updateObject(this.state.orderForm[el], {
            value: event.target.value,
            valid: checkValidity(this.state.orderForm[el].validation, event.target.value),
            touched: true
        });
        const updatedForm = updateObject(this.state.orderForm, {
            [el]: updatedElement
        });
        let formIsValid = true;

        for (let input in updatedForm) {
            formIsValid = updatedForm[input].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    render() {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={(e) => this.postHandler(e)}>
                {formElements.map(el => {
                    return <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        valid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                    />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        let title = <h4>Enter your contact data</h4>

        if (this.props.loading) {
            form = <Spinner/>
            title = null;
        }

        return (
            <div className={styles.ContactData}>
                {title}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredientsReducer.ingredients,
    totalPrice: state.ingredientsReducer.totalPrice,
    loading: state.ordersReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.id
})

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (order, token) => dispatch(actionsCreators.purchaseBurger(order, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
