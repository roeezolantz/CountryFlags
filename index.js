const path = require('path');
const fs = require('fs');
const { monitoredPromiseAll, createReactSVGComponent, createIndexFile } = require('./utils');

const countries = require('./countries.json');
const countriesFallback = require('./external_countries.json');

const hypenToSpace = (text) => text.replace(/-/g, ' ');
const VALID_COUNTRY_CODE = /^[A-Za-z]{2,3}$/; // 2/3 characters only

const findCountryCodeByName = (source, countryName) => Object.entries(source)
    .filter(([_, name]) => name.toLowerCase() === countryName.toLowerCase() || name.toLowerCase() === hypenToSpace(countryName).toLowerCase())
    .map(([k]) => k.toUpperCase())[0];

const run = (directoryPath) => fs.readdir(directoryPath, async(err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    const missingCodes = [];
    const validNames = {};
    const foundByFallback = {};
    const suspiciousFallbacks = {};

    files.map((file) => {
        const countryName = file.match(/flag-(.*).svg/)[1];
        
        const countryCode = findCountryCodeByName(countries, countryName);

        if (!countryCode || countryCode == '') {
            const fallbackResult = findCountryCodeByName(countriesFallback, countryName);

            if (!fallbackResult || fallbackResult == '')
                missingCodes.push(countryName);
            else if (!VALID_COUNTRY_CODE.test(fallbackResult))
                suspiciousFallbacks[fallbackResult] = countryName;
            else
                foundByFallback[fallbackResult] = countryName;
        } else {
            validNames[countryCode] = countryName;
        }
    });

    console.log(`Summary of valid codes (${Object.keys(validNames).length}) :`);
    console.log(validNames);
    console.log("-------------------------------\n");

    console.log(`Summary of potentially valid codes found using external fallbacks (${Object.keys(foundByFallback).length}) :`);
    console.log(foundByFallback);
    console.log("-------------------------------\n");

    console.log(`Summary of suspicious codes found using fallbacks (${Object.keys(suspiciousFallbacks).length}) :`);
    console.log(suspiciousFallbacks);
    console.log("-------------------------------\n");

    if (missingCodes.length > 0) {
        console.log(`Summary of countries with missing codes (${missingCodes.length}) :`);
        missingCodes.forEach((curr) => console.log(curr));
    } else {
        console.log("No missing codes! Yay!!")
    }

    console.log("\n\n\nCreating React components...");

    const allCreators = Object.entries(validNames).map(([code, name]) => 
        createReactSVGComponent(code, `flag-${name}.svg`));

    const validCount = Object.keys(validNames).length;

    await monitoredPromiseAll(allCreators, (progress) => console.log(`${progress}/${validCount}`));
    setTimeout(() => {
            createIndexFile({ countryCodes: Object.keys(validNames) });
            console.log(`Summary of react components created (${Object.keys(validNames).length})`);
            console.log(`Summary of potentially valid codes found using external fallbacks (${Object.keys(foundByFallback).length})`);
            console.log(`Summary of suspicious codes found using fallbacks (${Object.keys(suspiciousFallbacks).length})`);
            console.log(`Summary of countries with missing codes (${missingCodes.length})`);
            console.log("Finished.")
    }, 1000);
});

const flagsDir = path.join(__dirname, 'flags');
run(flagsDir);
