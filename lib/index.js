const moment = require('moment');
const everyInterpreter = require('./moment-every-interpreter');

const { sortTransactionsByDate, parseEvery } = require('./utils');

function mapEvent(rawEvent) {
    //TODO: support double?
    const amount = parseInt(rawEvent.amount, 10);
    const mDate = moment(rawEvent.date);

    if (!rawEvent.date || !mDate.isValid()) {
        throw new Error(`Invalid date: ${rawEvent.date}`);
    }

    return {
        description: rawEvent.description || '-',
        date: mDate,
        every: rawEvent.every ? parseEvery(rawEvent.every) : null,
        amount
    };
}

function generateTransactionForEvent(
    { description, date, every, amount },
    mStart,
    mEnd
) {
    const transactions = [];

    if (every) {
        everyInterpreter({ every, mDate: date, mStart, mEnd }).forEach(currentDate => {
            transactions.push({
                description,
                date: currentDate,
                amount
            });
        });
    } else {
        transactions.push({
            description,
            date,
            amount
        });
    }

    return transactions;
}

module.exports = {
    generateTransactions: ({ loader, renderer, start, end }) => {
        loader
            .load()
            .then(rawEvents => {
                return rawEvents.map(mapEvent);
            })
            .then(events => {
                let transactions = [];

                events.forEach(event => {
                    transactions = transactions.concat(
                        generateTransactionForEvent(
                            event,
                            moment(start),
                            moment(end)
                        )
                    );
                });

                sortTransactionsByDate(transactions);

                return transactions;
            })
            .then(transactions => {
                console.log(renderer.render(transactions));
            });
    }
};
