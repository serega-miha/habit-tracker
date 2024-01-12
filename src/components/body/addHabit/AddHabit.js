import YocReactDatePicker from '../calendar/Calendar';
import './addHabit.scss';



const AddHabit = () => {

    const onSubmit = (values) =>{
        
        console.log(values);
    }

    return (
        <div className="add__habit-container">
            <form className="add__habit" onSubmit={values => onSubmit(values)}>
                <label className='add-label' htmlFor="countOfWeek">Количество повторений в неделю</label>
                <select name="countOfWeek" id="countOfWeek" >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7" selected>7</option>
                </select>
               <label className='add-label' htmlFor="nameHabitInput">Введите название привычки</label>
               <input type="text" id="nameHabitInput" placeholder='name' />
               <label>Дата начала привычки</label>
                <YocReactDatePicker/>
                <button type="submit" >Создать привычку</button>
            </form>
        </div>
    )
}

export default AddHabit;