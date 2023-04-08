import JoblyApi from '../api/api';
import { useEffect, useState } from 'react';
import Job from './Job';
import Search from '../common/Search';
import { useFormik } from 'formik';

const Jobs = () => {
    const [form, setForm] = useState();
    const [jobs, setJob] = useState([]);

    useEffect(() => {
        async function getAll(form) {
            let jobs = await JoblyApi.getAllJobs(form);
            setJob(jobs);
        }
        getAll(form);
    }, [form]);

    const handleSubmit = (newVal) => {
        setForm(newVal.name);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return (
        <>
            <Search formik={formik} />
            {jobs.map((job) => (
                <Job
                    key={job.id}
                    {...job}
                />
            ))}
        </>
    );
};

export default Jobs;
