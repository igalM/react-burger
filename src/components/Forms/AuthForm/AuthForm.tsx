import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../../components/UI/Input/Input';
import { CustomButton } from '../../../components/UI/Button/Button';
import { useDispatch } from 'react-redux';
import * as actionsCreators from "../../../store/actions";
import { User } from '../../../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
    formClass: {
        display: 'flex',
        flexDirection: 'column'
    }
}));


interface Props {
    isSignup: boolean;
    changedMode: () => void;
}

const AuthForm: React.FC<Props> = ({ isSignup, changedMode }) => {
    const { formClass } = useStyles();
    const dispatch = useDispatch();
    const submitAuth = (user: User) => dispatch(actionsCreators.auth(user));

    const initialValues = { email: '', password: '', isSignup: isSignup };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Must be a valid email')
            .required('Required'),
        isSignup: Yup.boolean()
    });

    const form = <Formik
        onSubmit={(values) => {
            values.isSignup = isSignup;
            submitAuth(values);
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Form className={formClass}>
            <InputField formikKey="email" label="Your Email" />
            <InputField formikKey="password" label="Your Password" type="password" />
            <CustomButton
                type="submit"
                color="green">
                SUBMIT
                </CustomButton>
            {isSignup ? <h5>Already registered? Click <u onClick={changedMode}>Here</u></h5>
                : <h5>Don't have an account? Click <u onClick={changedMode}>Here</u> to Sign Up</h5>}
        </Form>
    </Formik>

    return form;
}

export default AuthForm;