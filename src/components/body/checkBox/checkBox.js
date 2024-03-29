import './checkBox.scss'


const CheckBox = (props) => {
    
    const status = props.status
    let newClass = 'mybtn';
    switch (status){
        case 1:
            newClass = newClass + ' mybtn1';
            break
        case 2:
            newClass = newClass + ' mybtn2'; 
            break
        case 3:
            newClass = newClass + ' mybtn3';
            break
        default:
            newClass = 'mybtn';
            break
    }
   

    return (
        <button className={newClass} date={props.date} disabled={props.disable} >

            <div id="tick_mark2"></div>
            <div id="tick_mark3"></div>
        </button>

    )

}


export default CheckBox;