import JoblyApi from '../api/api';
import { useEffect, useState } from 'react';
import Company from './Company';
import Search from '../common/Search';
import { useFormik } from 'formik';
import "./companies.css";

const Companies = () => {
    const [form, setForm] = useState();
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getAll(form) {
            let companies = await JoblyApi.getAllCompanies(form);
            setCompanies(companies);
        }
        getAll(form);
    }, [form]);

    const handleSubmit = (newVal) => {
        setForm(newVal);
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
        <div className='companies'>
            <Search formik={formik} />
            {companies.map((company, id) => (
                <Company
                    name={company.name}
                    handle={company.handle}
                    description={company.description}
                    key={id}
                />
            ))}
        </div>
    );
};

export default Companies;
