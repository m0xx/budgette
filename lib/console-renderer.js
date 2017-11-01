const Table = require('cli-table');
require('colors');

function formatMoney(amount) {
    return amount > 0 ? `+ ${amount} $`.green : `- ${Math.abs(amount)} $`.red;
}

function render(transactions) {
    const table = new Table({
        head: ['Description', 'Date', 'Amount', 'Total'].map(h => h.cyan)
    });

    let total = 0;
    transactions.forEach(({ description, date, amount }) => {
        total += amount;

        table.push([
            description,
            date.format('DD-MM-YYYY'),
            formatMoney(amount),
            formatMoney(total)
        ]);
    });

    return table.toString();
}

module.exports = () => {
    return {
        render
    };
}
