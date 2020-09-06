import React, { useState } from 'react';
import styles from './ContactData.module.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionsCreators from '../../../store/actions';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';

const ContactData = ({ ingredients, totalPrice, userId, loading, token, onOrderBurger }) => {

    let form = <div>
        <h4 className={styles.Title}>Enter your contact data</h4>
        <Formik
            initialValues={{ name: '', street: '', zipCode: '', country: '', email: '', deliveryMethod: 'fastest' }}
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
            validationSchema={Yup.object().shape({
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
                    .required('Required'),
            })}>
            {({ values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            error={errors.name && touched.name}
                            label="Your Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.name && touched.name) && errors.name}
                            margin="normal"
                        />
                        <TextField
                            error={errors.street && touched.street}
                            label="Your Street"
                            name="street"
                            value={values.comment}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.street && touched.street) && errors.street}
                            margin="normal"
                        />
                        <TextField
                            error={errors.zipCode && touched.zipCode}
                            label="ZIP Code"
                            name="zipCode"
                            value={values.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.zipCode && touched.zipCode) && errors.zipCode}
                            margin="normal"
                        />
                        <TextField
                            error={errors.country && touched.country}
                            label="Country"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.country && touched.country) && errors.country}
                            margin="normal"
                        />
                        <TextField
                            error={errors.email && touched.email}
                            label="Your Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.email && touched.email) && errors.email}
                            margin="normal"
                        />
                        <FormControl margin="normal">
                            <Select
                                className="select-box"
                                name="deliveryMethod"
                                value={values.deliveryMethod}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.deliveryMethod && touched.deliveryMethod}>
                                <MenuItem value={'fastest'}>Fastest</MenuItem>
                                <MenuItem value={'cheapest'}>Cheapest</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}>ORDER</Button>
                    </form>
                )}
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
