#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const fs = require('fs');
const moment = require('moment');

const yamlLoader = require('./../lib/yaml-loader');
const consoleRenderer = require('./../lib/console-renderer');
const budgette = require('./../lib');

const defaultFilePath = path.join(process.cwd(), 'budgette.yaml');
const defaultStart = moment().format('YYYY-MM-DD');
const defaultEnd = moment()
    .add(1, 'year')
    .format('YYYY-MM-DD');

function parseMoment(v, memo) {
    //TODO: better date format handling, error is ugly
    const mDate = moment(v).utc();
    if (!mDate.isValid()) {
        console.log(`Not a valid moment format: ${v}`);
        process.exit(1);
    }

    return mDate.format('YYYY-MM-DD');
}

program
    .option(
        '-b, --budget [file]',
        `Specify yaml budget file to load [${defaultFilePath}]`,
        defaultFilePath
    )
    .option(
        '-s, --start [start]',
        `Start date [${defaultStart}]`,
        parseMoment,
        defaultStart
    )
    .option(
        '-e, --end [end]',
        `End date [${defaultEnd}]`,
        parseMoment,
        defaultEnd
    )
    .parse(process.argv);

const filePath = program.budget;

try {
    fs.readFileSync(filePath);
} catch (err) {
    console.log(`Error accessing file: ${program.filePath}`);
    process.exit(1);
}

const mStart = moment(program.start).utc();
const mEnd = moment(program.end).utc();

budgette.generateTransactions({
    loader: yamlLoader(filePath),
    renderer: consoleRenderer(),
    start: mStart.toDate(),
    end: mEnd.toDate()
});
