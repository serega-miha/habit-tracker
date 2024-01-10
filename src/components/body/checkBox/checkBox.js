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
        <div className={newClass} data-patern={status}>

            <div id="tick_mark2"></div>
            <div id="tick_mark3"></div>
        </div>

    )

}


export default CheckBox;