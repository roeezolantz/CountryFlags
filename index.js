const path = require('path');
const countries = require('./countries.json');
const { createIndexFile } = require('./utils');
const { createFlagComponents } = require('./createFlagsComponents');
// const { runOnTrustedFlags } = require('./runOnTrustedFlags');
const { runOnTrustedCountriesMapping } = require('./runOnTrustedCountriesMapping')

const flagsDir = path.join(__dirname, 'flags');
// runOnTrustedFlags(flagsDir);

const take = (keyValMap, amount = 1) => Object.fromEntries(Object.entries(keyValMap).slice(0, amount));

runOnTrustedCountriesMapping(flagsDir, countries).then(async ({ missingFlags, validFlags }) => {
    console.log({
        missings: Object.keys(missingFlags).length, 
        missingFlags, 
        valids: Object.keys(validFlags).length, 
        validFlags 
    });

    // await createFlagComponents(take(validFlags, 1));
    await createFlagComponents(validFlags);
    await createIndexFile({ countryCodes: Object.keys(validFlags) });
});
