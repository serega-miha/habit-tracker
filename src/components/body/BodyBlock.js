import './bodyBlock.scss'
import TableHeader from './tableName/TableHeader';


const BodyBlock = () => {
    return (
        <div className="body-container">
            <h2>Body</h2>
            <div className="habits__table">
                <TableHeader/>
                <div className="habits__table-body"></div>
            </div>

        </div>
    )
}


export default BodyBlock;