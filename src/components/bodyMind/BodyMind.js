import { NavLink, Routes,Route } from "react-router-dom";
import MyProfile from "./MyProfile";
import YuorProfile from './YuorProfile';

const BodyMind = () => {
    return (
        <div className="body-container">
            <h2>Body Mind</h2>

            <nav>
                <NavLink style={({ isActive }) => ({"color": isActive ? "black" : "none" })} to=".">My Profile</NavLink>
                <NavLink style={({ isActive }) => ({ "color": isActive ? "black" : "none" })} to="you">Your Profile</NavLink>
            </nav>
            <div className="body__mind-body">
                <Routes>
                    <Route path="/" element={<MyProfile />} />
                    <Route path="you" element={<YuorProfile />} />
                </Routes>
            </div>
        </div>
    )
}

export default BodyMind;