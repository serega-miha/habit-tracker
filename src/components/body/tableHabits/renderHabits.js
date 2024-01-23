
import CheckBox from "../checkBox/checkBox";


// function renderHabitsNew(arr, todayYear, todayMonth) {
//     const countDaysOfMonth = 32 - new Date(todayYear, todayMonth - 1, 32).getDate();
//     // console.log('function is working');


//     const habitRow = arr.map((item, j) => {
//         const startYear = new Date(item.startDate).getFullYear();
//         const finishYear = new Date(item.finishDate).getFullYear();
//         const startMonth = new Date(item.startDate).getMonth() + 1;
//         const finishMonth = new Date(item.finishDate).getMonth() + 1;
//         const startDay = new Date(item.startDate).getDate();
//         const finishDay = new Date(item.finishDate).getDate();

//         const habitDaysArr = item.results.filter((el) => new Date(el.dateDay).getMonth() + 1 === +todayMonth);

//         if (habitDaysArr.length > 0) {
//              // const newHabitDaysArr = habitDaysArr
//         const itemStartDay = new Date(habitDaysArr[0].dateDay).getDate() - 1;



//         const habitDaysDisable = Array.from({ length: itemStartDay }, (el, i) => {
//             return (
//                 <li key={i} className="list-day block-empty"

//                 ><CheckBox
//                         status={0}
//                         disable={"disabled"}
//                     /></li>
//             )
//         })
//         const habitsDaysActive = habitDaysArr.map((el, i) => {
//             return (
//                 <li key={i} className="list-day block-empty"

//                 ><CheckBox
//                         status={el.status}
//                         date={item.startDate}
//                         disable={""}
//                     /></li>
//             )
//         })
       

        


//         return (
//             <div className="habits__row-name " key={item.id}>
//                 <div className="habits__need block-empty name__habit">{item.count}</div>
//                 <div className="habits__name block-empty name__habit">{item.nameHabit}</div>
//                 <ul className="habits__list-days ">
//                     {habitDaysDisable}
//                     {habitsDaysActive}
       
//                 </ul>

//                 <div className="habits__percent block-empty">%</div>
//                 {/* <a onClick={(e) => onDeleteHabit(e.target)} className="habit__delete" habit-id={item.id}>Удалить</a> */}
//             </div>
//         )
//         } else {
//             return null;
//         }

       

//     })
//     return habitRow

// }


// export default renderHabitsNew;





//     //рендерин привычек из базы данных
//     function renderHabits(arr, lenghtArray) {


//         const habitRow = arr.map((item) => {

//             const startYear = new Date(item.startDate).getFullYear();
//             const startMonth = new Date(item.startDate).getMonth();
//             const startDay = new Date(item.startDate).getDate();
//             const newNewArr = new Array(31).fill({});



//             const habitDaysArr = item.results;
//             let statusNull = 0;
//             let statusRed = 0;
//             let statusGood = 0;
//             let statusStop = 0;
//             let statusDisabled = 0;
          
// //создаем массив данных неактивных, которые рендерятся до начала отсчета
//             const habitDaysDisable = Array.from({ length: startDay - 1 }, (el, i) => {
//                 return (
//                     <li key={i} className="list-day block-empty"

//                     ><CheckBox
//                             status={0}
//                             disable={"disabled"}
//                         /></li>
//                 )
//             })
           
// // массив данных из базы данных, но перебор определенного количества штук
//             let habitDaysActive = [];
//             habitDaysArr.forEach((el,i) => {
//                 if ((countDaysOfMonth - startDay) >= i){
//                     habitDaysActive.push(
//                         <li key={new Date(el.dateDay).getDate()} className="list-day block-empty"

//                                     ><CheckBox
//                                             status={el.status}
//                                             date={item.startDate}
//                                             disable={""}
//                                         /></li>
//                     )
//                 }
//             })



//             function onDeleteHabit(event) {
//                 let idHabit = event.getAttribute('habit-id');
//                 newRequest.deleteResource(idHabit);
//                 props.renderAfterAdd();
//             }

//             const percent = (statusGood / ((statusRed + statusStop + statusNull + statusGood) - statusDisabled) * 100).toFixed(1);
//             //     console.log(statusNull, statusRed,statusGood, statusStop);
//             //    console.log(percent);
//             // console.log(habitDaysDisable);
//             // console.log(habitDaysActive);

//             return (
//                 <div className="habits__row-name " key={item.id}>
//                     <div className="habits__need block-empty name__habit">{item.count}</div>
//                     <div className="habits__name block-empty name__habit">{item.nameHabit}</div>
//                     <ul className="habits__list-days ">
//                         {habitDaysDisable}
//                         {habitDaysActive}
           
//                     </ul>

//                     <div className="habits__percent block-empty">{percent}%</div>
//                     <a onClick={(e) => onDeleteHabit(e.target)} className="habit__delete" habit-id={item.id}>Удалить</a>
//                 </div>
//             )
//         })
//         return habitRow

//     }