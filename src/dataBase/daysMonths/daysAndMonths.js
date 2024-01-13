

const months=[
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
    ];

const days =['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

const today = new Date();
const countDaysOfMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
const todayDate = `${today.getFullYear()}-${today.getMonth() +1}-${today.getDate()}`;
 


export {months, days, today, countDaysOfMonth, todayDate};