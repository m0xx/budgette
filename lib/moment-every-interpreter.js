const moment = require('moment');
require('moment-recur');

module.exports = ({every, mDate, mStart, mEnd}) => {
    let recurrence;
    if (every.type === 'month' || every.type === 'months') {
        recurrence = mDate
            .recur(mStart, mEnd)
            .every(every.unit)
            .daysOfMonth();
    } else {
        recurrence = mDate.recur(mStart, mEnd).every(every.unit, every.type);
    }

    return recurrence.all();
}