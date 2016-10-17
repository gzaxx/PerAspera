// const month_names = [
//     'Styczeń',
//     'Luty',
//     'Marzec',
//     'Kwiecień',
//     'Maj',
//     'Czerwiec',
//     'Lipiec',
//     'Sierpień',
//     'Wrzesień',
//     'Październik',
//     'Listopad',
//     'Grudzień'
// ]

const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const month = {}

month.getMonths = () => {
    return month_names
}

month.getMonthName = (index) => {
    if (index < 0 || index >= month_names.length) {
        throw new Error('Month index must be between 0 and 11')
    }

    return month_names[index]
}

export default month