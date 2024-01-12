import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import Job from '../jobs/Job';

const CompanyDetails = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState({ jobs: [] });

    useEffect(() => {
        const fetchCompanyData = async () => {
            const fetchedCompany = await JoblyApi.jobsByCompany(handle);
            setCompany(fetchedCompany);
        };

        fetchCompanyData();
    }, [handle]);

    const renderJobDetails = () =>
        company.jobs.map((job) => (
            <Job  
                key={job.id}
                {...job}
            />
        ));

    return (
        <div className='p-4'>
            <h2 className='text-center font-bold text-lg block'>
                {company.name}
            </h2>
            <p className='text-center font-bold text-base block'>
                {company.description}
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6'>
                {renderJobDetails()}
            </div>
        </div>
    );
};

export default CompanyDetails;
