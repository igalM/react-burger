import React, { Component } from 'react';
import styles from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

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
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                valid: true
            }
        },
        loading: false,
        formIsValid: false
    }

    postHandler = () => {
        this.setState({ loading: true });
        const formData = {};
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            date: new Date().toLocaleDateString('en-GB'),
            orderData: formData
        };
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => this.setState({ loading: false }))
    }

    checkValidity = (rules, value) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, el) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedElement = {
            ...this.state.orderForm[el]
        };
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.validation, updatedElement.value);
        updatedElement.touched = true;
        updatedForm[el] = updatedElement;

        let formIsValid = true;

        for (let input in updatedForm) {
            formIsValid = updatedForm[input].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
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
            <form onSubmit={this.postHandler}>
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

        if (this.state.loading) {
            form = <Spinner />
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


export default ContactData;