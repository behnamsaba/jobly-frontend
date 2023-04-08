import { ListGroup, ListGroupItem,CardHeader } from "reactstrap";
import UserContext from "../auth/UserContext";
import { useContext, useState, useEffect } from "react";
import "./JobDetails.css";

const JobDetails = ({ id, title, salary, equity }) => {
  const { user, hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();
  console.log(user);

  useEffect(() => {
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  const handleApply = async () => {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  };

  return (
    <div className='JobDetails'>
      <ListGroup>
        <CardHeader className="font-size-bold">{title}</CardHeader>
        <ListGroupItem>salary:{salary}</ListGroupItem>
        <ListGroupItem>Equity:{equity}</ListGroupItem>
        {user ? (
          <button
            className='JobDetails-btn'
            onClick={handleApply}
            disabled={applied}>
            {applied ? "Applied" : "Apply"}
          </button>
        ) : null}
      </ListGroup>
    </div>
  );
};

export default JobDetails;
