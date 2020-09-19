import React from 'react';
import styles from './CheckoutForm.module.scss';
import { InputField } from '../../../components/UI/Input/Input';
import { SelectField } from '../../../components/UI/Select/Select';
import { CustomButton } from '../../../components/UI/Button/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIngredientsState,
    selectOrdersLoadingState,
    selectTokenState,
    selectTotalPrice,
    selectUserIdState
} from '../../../store/reducers/selectors';
import { Order } from '../../../types';
import * as actionsCreators from '../../../store/actions';
import { useHistory } from 'react-router';

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
    zipCode: Yup.number()
        .required('Required')
        .test('zipCode', 'Must be exactly 5 characters', val => val?.toString().length === 5),
    country: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Must be a valid email')
        .required('Required'),
    deliveryMethod: Yup.string()
        .required('Required')
});

const CheckoutForm: React.FC = () => {

    const history = useHistory();

    const ingredients = useSelector(selectIngredientsState);
    const totalPrice = useSelector(selectTotalPrice);
    const loading = useSelector(selectOrdersLoadingState);
    const token = useSelector(selectTokenState);
    const userId = useSelector(selectUserIdState);

    const dispatch = useDispatch();
    const onOrderBurger = (order: Order, token: string) => dispatch(actionsCreators.purchaseBurger(order, token))

    const cancelOrder = () => history.push('/');

    let form = <div className={styles.ContactData}>
        <h4 className={styles.Title}>Enter your contact data</h4>
        <Formik
            onSubmit={(values) => {
                if (userId && token) {
                    const order: Order = {
                        ingredients: ingredients,
                        price: totalPrice,
                        date: new Date().toLocaleDateString('en-GB'),
                        userId: userId,
                        userInfo: values
                    };
                    onOrderBurger(order, token);
                }
            }}
            initialValues={values}
            validationSchema={validationSchema}>
            <Form>
                <InputField formikKey="name" label="Your Name" />
                <InputField formikKey="street" label="Your Street" />
                <InputField formikKey="zipCode" type="number" label="ZIP Code" />
                <InputField formikKey="country" label="Country" />
                <InputField formikKey="email" label="Your Email" />
                <SelectField formikKey="deliveryMethod" options={deliveryMethods} />
                <CustomButton type="submit" className="success">ORDER</CustomButton>
            </Form>
        </Formik>
        <div className={styles.CancelButton}>
            <CustomButton type="submit" className="danger" onClick={cancelOrder}>CANCEL</CustomButton>
        </div>
    </div>

    if (loading) {
        form = <Spinner />
    }

    return form;
}

export default CheckoutForm;