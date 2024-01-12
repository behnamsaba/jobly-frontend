import { useContext } from 'react';
import CompanyListDetails from './CompanyListDetails';
import Search from '../common/Search';
import UserContext from "../auth/UserContext";

const CompanyList = () => {
    const { companies } = useContext(UserContext);
    return (
      <div className="container mx-auto px-4 py-6">
          <Search />
          <h2 className='text-center font-bold text-lg block'>List of Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {companies.map((company, id) => (
                  <CompanyListDetails
                      name={company.name}
                      handle={company.handle}
                      description={company.description}
                      key={id}
                  />
              ))}
          </div>
      </div>
  );
};

export default CompanyList;
