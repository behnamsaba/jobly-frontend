import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './UserContext';

// Validation Schema
const loginValidationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
});

const LoginFormInput = ({ id, label, type, formik }) => (
    <div className='mb-4'>
        <label
            htmlFor={id}
            className='block text-sm font-medium text-gray-700'>
            {label}
        </label>
        <input
            id={id}
            type={type}
            {...formik.getFieldProps(id)}
            aria-label={label}
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                formik.touched[id] && formik.errors[id] ? 'border-red-500' : ''
            }`}
        />
        {formik.touched[id] && formik.errors[id] && (
            <p className='mt-2 text-sm text-red-600'>{formik.errors[id]}</p>
        )}
    </div>
);

const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await login(values);
                navigate('/');
            } catch (e) {
                console.log('eeeee', e);
                formik.setErrors({ backendError: e[0] });
            }
        },
        validationSchema: loginValidationSchema,
    });

    return (
        <div className='h-screen'>
            <form
                onSubmit={formik.handleSubmit}
                className='max-w-md mx-auto my-10 p-8 border-2 border-gray-300 rounded-lg shadow-lg'>
                <h2 className='text-lg font-semibold text-center text-gray-800 mb-6'>
                    Login
                </h2>
                <LoginFormInput
                    id='username'
                    label='Username'
                    type='text'
                    formik={formik}
                />
                <LoginFormInput
                    id='password'
                    label='Password'
                    type='password'
                    formik={formik}
                />

                {formik.errors.backendError && (
                    <div className='my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded'>
                        {formik.errors.backendError}
                    </div>
                )}

                <button
                    type='submit'
                    className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
