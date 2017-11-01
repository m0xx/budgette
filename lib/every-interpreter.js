const moment = require('moment');

const TYPE_MAPPING = {
    year: 'years',
    years: 'years',
    month: 'months',
    months: 'months',
    day: 'days',
    days: 'days'
};

module.exports = ({ every, mDate, mStart, mEnd }) => {
    const dates = [];
    const current = moment(mDate).utc();

    while (current.isSameOrBefore(mEnd)) {
        if (current.isSameOrAfter(mStart)) {
            dates.push(moment(current).utc());
        }

        current.add(every.unit, TYPE_MAPPING[every.type]);
    }

    return dates;
};
