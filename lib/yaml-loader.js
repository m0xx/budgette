const yaml = require('js-yaml');
const fs = require('fs');

function load(filePath) {
    return new Promise(resolve => {
        try {
            const doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

            resolve(doc.budgets);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = filePath => {
    return {
        load: () => {
            return load(filePath);
        }
    };
};
