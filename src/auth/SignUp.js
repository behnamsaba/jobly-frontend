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
        onSubmit: async (values) => {
            try {
                await register(values);
                navigate('/');
            } catch (e) {
                formik.setErrors({ backendError: e.message });
            }
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
        }),
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className='max-w-md mx-auto my-10 p-8 border border-gray-300 rounded-lg shadow-lg'>
            <h2 className='text-lg font-semibold text-center text-gray-800 mb-6'>
                Sign Up
            </h2>

            {/* Repeated form fields */}
            {['username', 'password', 'firstName', 'lastName', 'email'].map(
                (field) => (
                    <div
                        key={field}
                        className='mb-4'>
                        <label
                            htmlFor={field}
                            className='block text-sm font-medium text-gray-700'>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            id={field}
                            type={field === 'password' ? 'password' : 'text'}
                            {...formik.getFieldProps(field)}
                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                formik.touched[field] && formik.errors[field]
                                    ? 'border-red-500'
                                    : ''
                            }`}
                        />
                        {formik.touched[field] && formik.errors[field] && (
                            <p className='mt-2 text-sm text-red-600'>
                                {formik.errors[field]}
                            </p>
                        )}
                    </div>
                )
            )}

            {/* Backend error handling */}
            {formik.errors.backendError && (
                <div className='my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                    {formik.errors.backendError}
                </div>
            )}

            <button
                type='submit'
                className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Join
            </button>
        </form>
    );
};

export default SignUp;
