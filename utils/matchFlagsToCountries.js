const { promises: fs } = require('fs');
const { spaceToHypen } = require('./textUtils');

const SVG_COUNTRY_NAME_MATCHER = /flag-(.*).svg/;

const matchFlagsToCountries = async(flagsSource, supportedCountries) => {
    const missingFlags = {};
    const validFlags = {};

    let files = [];
    
    try {
        files = await fs.readdir(flagsSource);
    } catch(err) {
        console.log('Unable to scan directory: ' + err);
    }

    const filesByCountryNames = files.map((curr) => curr.match(SVG_COUNTRY_NAME_MATCHER)[1].toLowerCase());

    Object.entries(supportedCountries).forEach(([code, name]) => {
        code = code.toLowerCase();
        const flag = filesByCountryNames.includes(spaceToHypen(name.toLowerCase()));

        if (!flag) {
            missingFlags[code] = name;
        } else {
            validFlags[code] = name;
        }
    });

    return { missingFlags, validFlags };
};

module.exports = {
    matchFlagsToCountries
};
