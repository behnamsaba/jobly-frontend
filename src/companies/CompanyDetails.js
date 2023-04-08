import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import JobDetails from '../jobs/JobDetails';

const CompanyDetails = () => {
    const params = useParams();
    const [company, setCompany] = useState([]);

    useEffect(() => {
        async function getAll() {
            let company = await JoblyApi.jobsByCompany(params.handle);
            setCompany(company);
        }
        getAll();
    }, [params.handle]);

    return (
        <div className="CompanyDetails">
            <Card>
                <CardBody className="text-center">
                    <CardTitle>{company.name}</CardTitle>
                    <CardText>{company.description}</CardText>
                </CardBody>
            </Card>
            {company.jobs &&
                company.jobs.map((job) => (
                    <JobDetails
                        key={job.id}
                        {...job}
                    />
                ))}
        </div>
    );
};

export default CompanyDetails;
