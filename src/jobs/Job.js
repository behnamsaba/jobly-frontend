import { useContext, useState, useEffect } from 'react';
import UserContext from '../auth/UserContext';
import { FaDollarSign } from 'react-icons/fa';

const Job = ({ id, title, companyName, salary, equity }) => {
    const { hasAppliedToJob, applyToJob, user } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(() => {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    const handleApply = async () => {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    };

    const formatSalary = (salary) => {
        return salary ? `$${salary.toLocaleString()}` : 'Not disclosed';
    };

    return (
        <div className='p-2 border-2 border-white rounded-lg shadow-sm mb-4'>
            <h3 className='text-lg font-semibold'>{title}</h3>
            <p className='text-gray-600 font-semibold'>{companyName}</p>
            <div className='my-2'>
                <p className='flex items-center text-slate-800'>
                    <FaDollarSign className='mr-1' />
                    {formatSalary(salary)}
                </p>
                <p className='text-slate-800'>Equity | {equity ? equity : 'None'}</p>
            </div>
            {user && (
                <button
                    onClick={handleApply}
                    disabled={applied}
                    className={`mt-1 px-3 py-1 text-sm rounded text-white ${
                        applied
                            ? 'bg-gray-400'
                            : 'bg-blue-500 hover:bg-blue-600'
                    } transition-colors`}>
                    {applied ? 'Applied' : 'Apply'}
                </button>
            )}
        </div>
    );
};

export default Job;
