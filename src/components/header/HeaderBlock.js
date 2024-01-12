import './headerBlock.scss'
import BlockTime from './time/BlockTime'

const HeaderBlock = () => {
    return (

        <div className="header__container">
            <div className="header__mind">mind!</div>
            <div className="header__title"><h1>Habit tracker</h1></div>
            <div className="header__time"><BlockTime /></div>
        </div>
    )
}


export default HeaderBlock;