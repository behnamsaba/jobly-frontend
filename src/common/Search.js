import { useCallback } from 'react';
import { useFormik } from 'formik';
import JoblyApi from '../api/api';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();

    const searchJobsCompanies = useCallback(
        async (values) => {
            const [companies, jobs] = await Promise.all([
                JoblyApi.getAllCompanies(values),
                JoblyApi.getAllJobs(values.name),
            ]);

            // Redirect to /search with jobs and companies data
            navigate('/search', { state: { jobs, companies } });
        },
        [navigate]
    );

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            searchJobsCompanies(values);
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className='max-w-sm w-full my-10 rounded'>
            <div className='flex items-center border-b border-teal-500 py-2'>
                <input
                    id='name'
                    type='text'
                    {...formik.getFieldProps('name')}
                    placeholder='Enter Search Term for Company or Role'
                    className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                />
                <button
                    type='submit'
                    className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'>
                    Search
                </button>
            </div>
            {formik.errors.backendError && (
                <div className='text-red-500 text-xs italic'>
                    {formik.errors.backendError}
                </div>
            )}
        </form>
    );
};

export default Search;
