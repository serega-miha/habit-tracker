import { Component } from 'react';
import { days, months } from '../../../dataBase/daysMonths/daysAndMonths';



class BlockTime extends Component {
    state = {
        date: new Date()
    }


    componentDidMount(){
        this.timer = setInterval(() => {
            this.setState({date: new Date()});
           }, 1000);
        }

        componentWillUnmount(){
            clearInterval(this.timer)
        }

        months=months;
        days=days;
    
    // months=[
    //     'Янв',
    //     'Фев',
    //     'Мар',
    //     'Апр',
    //     'Май',
    //     'Июн',
    //     'Июл',
    //     'Авг',
    //     'Сен',
    //     'Окт',
    //     'Ноя',
    //     'Дек',
    //     ];

    // days =['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

    render(){
        const {date} = this.state;
       
        // console.log(32 - new Date(date.getUTCFullYear(), date.getMonth(), 32).getDate());
        return(
            <div className="block-time">
                
                {date.getDate()} {this.months[date.getMonth()]} {this.days[date.getDay()-1]}
                <br></br>
                {date.toLocaleTimeString()}
                
            </div>
        )
    }
}

export default BlockTime;
