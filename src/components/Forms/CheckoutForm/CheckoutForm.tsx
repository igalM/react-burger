import React from 'react';
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
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    contactData: {
        margin: '20px auto',
        width: '90%',
        boxShadow: '0 2px 3px #ccc',
        border: '1px solid #eee',
        padding: '1% 2%',
        boxSizing: 'border-box',
        [theme.breakpoints.up('sm')]: {
            width: '500px'
        }
    },
    title: {
        textAlign: 'center'
    },
    formClass: {
        display: 'flex',
        flexDirection: 'column'
    },
    cancelButton: {
        display: 'flex'
    }
}));


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
    const classes = useStyles();
    const history = useHistory();

    const ingredients = useSelector(selectIngredientsState);
    const totalPrice = useSelector(selectTotalPrice);
    const loading = useSelector(selectOrdersLoadingState);
    const token = useSelector(selectTokenState);
    const userId = useSelector(selectUserIdState);

    const dispatch = useDispatch();
    const onOrderBurger = (order: Order, token: string) => dispatch(actionsCreators.purchaseBurger(order, token))

    const cancelOrder = () => history.push('/');

    let form = <div className={classes.contactData}>
        <h4 className={classes.title}>Enter your contact data</h4>
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
            <Form className={classes.formClass}>
                <InputField formikKey="name" label="Your Name" />
                <InputField formikKey="street" label="Your Street" />
                <InputField formikKey="zipCode" type="number" label="ZIP Code" />
                <InputField formikKey="country" label="Country" />
                <InputField formikKey="email" label="Your Email" />
                <SelectField formikKey="deliveryMethod" options={deliveryMethods} />
                <CustomButton type="submit" className="success">ORDER</CustomButton>
            </Form>
        </Formik>
        <div className={classes.cancelButton}>
            <CustomButton type="submit" className="danger" onClick={cancelOrder}>CANCEL</CustomButton>
        </div>
    </div>

    if (loading) {
        form = <Spinner />
    }

    return form;
}

export default CheckoutForm;