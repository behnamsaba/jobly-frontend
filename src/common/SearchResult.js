import { useLocation } from 'react-router-dom';
import CompanyListDetails from '../companies/CompanyListDetails';
import Job from '../jobs/Job';

const SearchResult = () => {
    const location = useLocation();
    const { jobs = [], companies = [] } = location.state || {};

    return (
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-screen'>
            <h2 className='text-center font-bold text-lg'>Search Results</h2>
            {jobs.length === 0 && companies.length === 0 && (
                <h3 className='text-center font-bold text-base pt-5'>
                    Not Found! Please Try Again
                </h3>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                {companies.map((company, id) => (
                    <CompanyListDetails
                        name={company.name}
                        handle={company.handle}
                        description={company.description}
                        key={id}
                    />
                ))}
                {jobs.map((job) => (
                    <Job
                        key={job.id}
                        {...job}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchResult;
