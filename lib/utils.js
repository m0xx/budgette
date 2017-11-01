const UNIT_TYPES = {
    month: true,
    months: true,
    day: true,
    days: true,
    year: true,
    years: true
};

function parseEvery(every) {
    const parts = every.split(' ');

    if (parts.length < 2) {
        throw new Error(`Invalid every definition: '${every}'`);
    }

    const type = parts[1].toLowerCase();
    const unit = parts[0];

    if (!UNIT_TYPES[type]) {
        throw new Erro(`Invalid unit type: '${type}'`);
    }

    return { type, unit };
}

function sortTransactionsByDate(transactions) {
    transactions.sort(function(left, right) {
        return left.date.diff(right.date);
    });
}

module.exports = {
    parseEvery,
    sortTransactionsByDate
};
