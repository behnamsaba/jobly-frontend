import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './UserContext';

const SignUp = () => {
    const { register } = useContext(UserContext);
        const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: (values) => {
            try {
                register(values)
                navigate('/');
            } catch (e) {
                formik.setErrors({ backendError: e });
            }
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('invalid email').required('Required'),
        }),
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username ? (
                <p>{formik.errors.username}</p>
            ) : null}

            <label htmlFor="passwrod">Password</label>
            <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
                <p>{formik.errors.password}</p>
            ) : null}

            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <p>{formik.errors.firstName}</p>
            ) : null}

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
                <p>{formik.errors.lastName}</p>
            ) : null}

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
            ) : null}

            {/* backend error handling*/}
            {formik.errors.backendError ? (
                <div>{formik.errors.backendError}</div>
            ) : null}

            <button type="submit">Join</button>
        </form>
    );
};

export default SignUp;
