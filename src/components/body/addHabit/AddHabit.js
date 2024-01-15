
import YocReactDatePicker from '../calendar/Calendar';
import './addHabit.scss';
import JsonBin from '../../../service/request/JsonBin';
import { Formik, Form, Field, useFormikContext, useField } from 'formik';
import { todayDate, countDaysOfMonth } from '../../../dataBase/daysMonths/daysAndMonths';
import DatePickerCalenar from '../datePacker/DatePicker';

const AddHabit = (props) => {

    const newRequest = new JsonBin();

    const onSubmit = (values) => {
        function createResults(num) {
            let arr = [];
            for (let i = 1; i <= num; i++) {
                arr[i - 1] = { day: i, status: 1 }
            }
            return arr;
        }

        const results = createResults(countDaysOfMonth)
        const newDataBaseItem = {
            count: values.countOfWeek,
            nameHabit: values.name,
            startDate: values.startDate.getFullYear() + '-' + values.startDate.getMonth() + '-' + values.startDate.getDate(),
            results
        }
        // console.log(newDataBaseItem);
        newRequest.postResource(newDataBaseItem)
        props.renderAfterAdd()
    }


    return (
        <div className="add__habit-container">
            <Formik
                initialValues={{ name: "", countOfWeek: 7, startDate: '' }}
                
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values)
                    resetForm()
                }}>
                {/* {({ isSubmitting }) => ( */}
                <Form className="add__habit">
                    <label className='add-label' htmlFor="countOfWeek"><h4>Количество повторений в неделю</h4>
                    <Field
                        component="select"
                        name="countOfWeek"
                        id="countOfWeek"
                        className="select-field"
                    >
                        <option className='select-option' value="1">1</option>
                        <option className='select-option' value="2">2</option>
                        <option className='select-option' value="3">3</option>
                        <option className='select-option' value="4">4</option>
                        <option className='select-option' value="5">5</option>
                        <option className='select-option' value="6">6</option>
                        <option className='select-option' value="7" >7</option>
                    </Field></label>
                    <label className='add-label' htmlFor="nameHabitInput"><h4>Введите название привычки</h4>
                    <Field type="text"
                        id="nameHabitInput"
                        name="name"
                        placeholder='name'
                        
                    /></label>
                    <label><h4>Дата начала привычки</h4>
                    <DatePickerCalenar
                    
                        name="startDate"
                        minDate={new Date()} 
                        placeholderText='01.01.2000'
                        defaultValue={new Date()}
                        dateFormat="dd.MM.yyyy" 
                        autoComplete='off'
                    /></label>
                 

                
                    {/* <Field

                        type="text"
                        name="startDateHabit"
                        className='input-not-visible'
                        // touched="touched"
                        // onChange=''

                        setFieldValue={calendarDate}
                    // value={calendarDate}
                    /> */}

                    <button type="submit"
                    className='form-btn'
                    //  disabled={isSubmitting}
                    >Создать привычку</button>

                </Form>
                {/* )} */}
            </Formik>
        </div>
    )
}


export default AddHabit;