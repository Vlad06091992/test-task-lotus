type Args = {[key: number]: string};

export const formattedDate = (date:string) => {
    const monthsEn:Args = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    };

    const created = new Date(date);
    const day = created.getDate();
    const month = created.getMonth();
    const year = created.getFullYear();

    return `${day} ${monthsEn[month]} ${year}`;
}