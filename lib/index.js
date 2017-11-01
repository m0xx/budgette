const moment = require('moment');
const everyInterpreter = require('./every-interpreter');

const { sortTransactionsByDate, parseEvery } = require('./utils');

function mapBudget(rawBudget) {
    //TODO: support double?
    const amount = parseInt(rawBudget.amount, 10);
    const mDate = moment(rawBudget.date).utc();

    if (!rawBudget.date || !mDate.isValid()) {
        throw new Error(`Invalid date: ${rawBudget.date}`);
    }

    return {
        description: rawBudget.description || '-',
        date: mDate,
        every: rawBudget.every ? parseEvery(rawBudget.every) : null,
        amount
    };
}

function generateTransactionForBudget(
    { description, date, every, amount },
    mStart,
    mEnd
) {
    const transactions = [];

    if (every) {
        everyInterpreter({
            every,
            mDate: date,
            mStart,
            mEnd
        }).forEach(currentDate => {
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
            .then(rawBudgets => {
                return rawBudgets.map(mapBudget);
            })
            .then(budgets => {
                let transactions = [];

                budgets.forEach(budget => {
                    transactions = transactions.concat(
                        generateTransactionForBudget(
                            budget,
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
