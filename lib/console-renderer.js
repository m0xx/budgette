const Table = require('cli-table');
require('colors');

function formatMoney(amount, withPlus) {
    return amount > 0 ? `${withPlus ? '+ ' : ''}${amount} $`.green : `- ${Math.abs(amount)} $`.red;
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
            date.format('LL'),
            formatMoney(amount, true),
            formatMoney(total, false)
        ]);
    });

    return table.toString();
}

module.exports = () => {
    return {
        render
    };
}
