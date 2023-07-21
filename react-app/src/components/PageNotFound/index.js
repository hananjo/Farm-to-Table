import { NavLink } from "react-router-dom/cjs/react-router-dom"
import "./pageNotFound.css"

export default function NotFound() {
    return (
        <div className="not-found">
            <img src="https://res.cloudinary.com/dbiv2lwhp/image/upload/v1689996224/404_nimmkr.png"/>
            <h2>The page you are trying to visit is not valid</h2>
            <h2>Please go back to the <NavLink exact to="/">homepage</NavLink></h2>
        </div>
    )
}
