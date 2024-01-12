import { useNavigate } from 'react-router-dom';

const CompanyListDetails = ({ name, handle, description }) => {
    const navigate = useNavigate();

    return (
        <div
            className='cursor-pointer p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 hover:bg-red-100'
            onClick={() => navigate(`/companies/${handle}`)}>
            <p className='text-lg font-semibold text-gray-800 mb-2'>{name}</p>
            <p className='text-gray-600'>{description}</p>
        </div>
    );
};

export default CompanyListDetails;
