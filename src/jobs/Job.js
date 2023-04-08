import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";

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
  return (
    <Card>
      <CardBody className='text-center'>
        <CardTitle>
          <h4 className='font-weight-bold'>{title}</h4>
        </CardTitle>
        <CardText>
          <p>{companyName}</p>
        </CardText>
      </CardBody>
      <ListGroup>
        <ListGroupItem>Salary: {salary}</ListGroupItem>
        <ListGroupItem>Equity: {equity}</ListGroupItem>

        {user ? (
          <button className='Job-btn' onClick={handleApply} disabled={applied}>
            {applied ? "Applied" : "Apply"}
          </button>
        ) : null}
      </ListGroup>

    </Card>
  );
};

export default Job;
