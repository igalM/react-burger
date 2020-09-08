import React from 'react';
import styles from './ContactData.module.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionsCreators from '../../../store/actions';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../../components/UI/Input/Input';
import { SelectField } from '../../../components/UI/Select/Select';
import { CustomButton } from '../../../components/UI/Button/Button';


const ContactData = ({ ingredients, totalPrice, userId, loading, token, onOrderBurger }) => {
    const deliveryMethods = [
        { value: 'fastest', displayName: 'Fastest' },
        { value: 'cheapest', displayName: 'Cheapest' }
    ];
    const values = { name: '', street: '', zipCode: '', country: '', email: '', deliveryMethod: 'fastest' };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Required'),
        street: Yup.string()
            .required('Required'),
        zipCode: Yup.string()
            .required('Required'),
        country: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Must be a valid email')
            .required('Required'),
        deliveryMethod: Yup.string()
            .required('Required')
    });

    let form = <div>
        <h4 className={styles.Title}>Enter your contact data</h4>
        <Formik
            onSubmit={(values) => {
                const order = {
                    ingredients: ingredients,
                    price: totalPrice,
                    date: new Date().toLocaleDateString('en-GB'),
                    userId: userId,
                    orderData: values
                };
                onOrderBurger(order, token);
            }}
            initialValues={values}
            validationSchema={validationSchema}>
            <Form>
                <InputField formikKey="name" label="Your Name" />
                <InputField formikKey="street" label="Your Street" />
                <InputField formikKey="zipCode" label="ZIP Code" />
                <InputField formikKey="country" label="Country" />
                <InputField formikKey="email" label="Your Email" />
                <SelectField formikKey="deliveryMethod" options={deliveryMethods} />
                <CustomButton type="submit" className="success">ORDER</CustomButton>
            </Form>
        </Formik>
    </div>

    if (loading) {
        form = <Spinner />
    }

    return (
        <div className={styles.ContactData}>
            {form}
        </div>
    );
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
