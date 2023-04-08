import { Link } from "react-router-dom"
const NotFound = () => {
    return(
        <div className="NotFound">
            <h1>SORRY we couldn't find that page!</h1>
            <p>Don't have account?</p>
            <Link to="/signup">Back</Link>
        </div>
        
    )
}

export default NotFound