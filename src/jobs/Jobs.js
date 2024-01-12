import { useContext } from 'react';
import Job from './Job';
import Search from '../common/Search';
import UserContext from '../auth/UserContext';

const Jobs = () => {
    const { jobs } = useContext(UserContext);

    return (
        <div className='container mx-auto px-4 py-6'>
            <Search />
            <h2 className='text-center font-bold text-lg block'>
                List of Jobs
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
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

export default Jobs;
