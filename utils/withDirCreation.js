const fs = require('fs');

const withDirCreation = (dirName, callback) => new Promise((resolve) => {
    if (!(fs.existsSync(dirName))) {
        console.log(`Couldn't find ${dirName}, creating it...`)
        fs.mkdirSync(dirName, { recursive: true });
        setTimeout(() => {
            if (!(fs.existsSync(dirName)))
                throw `Couldn't create ${dirName}, please try again or provide another output path.`;
            else {
                console.log(`Created ${dirName}.`);
                resolve(callback());
            }
        }, 1500);
    } else {
        resolve(callback());
    }
});

module.exports = {
    withDirCreation
};