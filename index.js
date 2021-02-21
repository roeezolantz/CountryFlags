const chalk = require('chalk');
const path = require('path');
const countries = require('./countries.json');
const { createIndexFile } = require('./utils');
const { createFlagComponents } = require('./createFlagsComponents');
// const { runOnTrustedFlags } = require('./runOnTrustedFlags');
const { matchFlagsToCountries } = require('./matchFlagsToCountries')

const flagsDir = path.join(__dirname, 'flags');
// runOnTrustedFlags(flagsDir);

const take = (keyValMap, amount = 1) => Object.fromEntries(Object.entries(keyValMap).slice(0, amount));

(async () => {
    console.log(chalk.yellow('Matching flags to countries by countries.json mapping...'))
    const { missingFlags, validFlags } = await matchFlagsToCountries(flagsDir, countries);

    console.log(chalk.green(`found ${Object.keys(validFlags).length} valid flags!`), { validFlags });
    console.log(chalk.red(`There are ${Object.keys(missingFlags).length} missing flags!`), { missingFlags });

    // await createFlagComponents(take(validFlags, 1));
    // await createFlagComponents(validFlags);
    await createIndexFile({ countryCodes: Object.keys(validFlags) });
    console.log(chalk.yellow('Bye..'));
})();
