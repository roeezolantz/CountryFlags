const chalk = require('chalk');
const path = require('path');
const countries = require('./countries_data/countries.json');
const { createIndexFile, matchFlagsToCountries, createFlagComponents } = require('./utils');
// const { runOnTrustedFlags } = require('./utils/runOnTrustedFlags');

const flagsDir = path.join(__dirname, 'flags');
// runOnTrustedFlags(flagsDir);

const take = (keyValMap, amount = 1) => Object.fromEntries(Object.entries(keyValMap).slice(0, amount));

(async () => {
    console.log(chalk.yellow('Matching flags to countries by countries.json mapping...'))
    const { missingFlags, validFlags } = await matchFlagsToCountries(flagsDir, countries);

    console.log(chalk.green(`found ${Object.keys(validFlags).length} valid flags!`), { validFlags });
    console.log(chalk.red(`There are ${Object.keys(missingFlags).length} missing flags!`), { missingFlags });

    await createFlagComponents(take(validFlags, 1));
    // await createFlagComponents(validFlags);
    await createIndexFile({ countryCodes: Object.keys(validFlags) });
    console.log(chalk.yellow('Bye..'));
})();
