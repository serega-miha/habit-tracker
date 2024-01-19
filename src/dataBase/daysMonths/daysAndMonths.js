const repeatDays = [
    {day: "Mon", repeat: true},
    {day: "Tue", repeat: true},
    {day: "Wen", repeat: true},
    {day: "Thu", repeat: true},
    {day: "Fri", repeat: true},
    {day: "Sat", repeat: true},
    {day: "Sun", repeat: true},
];

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
// const todayDate = `${today.getFullYear()}-${today.getMonth() +1}-${today.getDate()}`;


const goodMonth = (today.getMonth() + 1) > 8 ? (today.getMonth() + 1) : `0${today.getMonth() + 1}`;
const goodDay = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`
// console.log(testDate);
const todayDate = `${goodDay}.${goodMonth}.${today.getFullYear()}`;

export {months, days, today, countDaysOfMonth, todayDate, repeatDays};