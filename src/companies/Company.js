import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Company = ({ name, handle, description }) => {
    const navigate = useNavigate();

    return (
        <Card className="Company" onClick={() => navigate(`/companies/${handle}`)}>
            <CardBody>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardText>
                    {description}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default Company;
