import { today } from '../../dataBase/daysMonths/daysAndMonths'
import './headerBlock.scss'
import BlockTime from './time/BlockTime'
import { NavLink } from 'react-router-dom'
import { monthsEng } from '../../dataBase/daysMonths/daysAndMonths'

const HeaderBlock = () => {
    return (

        <div className="header__container">
            <div className="header__nav">
                <NavLink
                    
                    style={({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" })}
                    to={'/'+ monthsEng[today.getMonth()]}
                    // to='/'
                    className="header__mind">habit</NavLink>
                <NavLink
                    style={({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" })}
                    to="/mind" className="header__mind">mind!</NavLink>
            </div>
            <div className="header__title"><h1>Habit tracker</h1></div>
            <div className="header__time"><BlockTime /></div>
        </div>
    )
}


export default HeaderBlock;