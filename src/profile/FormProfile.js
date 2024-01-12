import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import UserContext from '../auth/UserContext';
const FormProfile = () => {
    const { user, profileChange } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
        },
        onSubmit: async (values) => {
            try {
                await profileChange(user.username, values);
                alert('Successfully Changed');
            } catch (e) {
                formik.setErrors({ backendError: e.message });
            }
        },
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, formik.setValues]);

    return (
        <div className='grid grid-flow-col auto-cols-max justify-center pt-5 w-full h-screen'>
            {user && (
                <form
                    onSubmit={formik.handleSubmit}
                    className='space-y-4'>
                    <h4 className='text-lg font-semibold text-red-700'>
                        {user.username}
                    </h4>

                    <div>
                        <label
                            htmlFor='firstName'
                            className='block text-sm font-medium text-gray-700'>
                            First Name
                        </label>
                        <input
                            id='firstName'
                            type='text'
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            {...formik.getFieldProps('firstName')}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='lastName'
                            className='block text-sm font-medium text-gray-700'>
                            Last Name
                        </label>
                        <input
                            id='lastName'
                            type='text'
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            {...formik.getFieldProps('lastName')}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='text'
                            className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            {...formik.getFieldProps('email')}
                        />
                    </div>

                    {formik.errors.backendError && (
                        <div className='text-red-500'>
                            {formik.errors.backendError}
                        </div>
                    )}

                    <button
                        type='submit'
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default FormProfile;
