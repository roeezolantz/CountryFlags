const fs = require('fs');

const createIndexFile = ({ outputDirPath = './output', countryCodes, sourceDir = './flags' }) => {
    let data = '';
    const filePath = `${outputDirPath}/index.js`;
    countryCodes.forEach((code) => {
        data += `export { default as ${code.toLowerCase()} } from '${sourceDir}/${code}';\n`
    });
    fs.writeFile(filePath, data, (err) => {
        if (err)
            console.log("Failed to create index file : ", err);
        else
            console.log(`Created index file : ${filePath}`);
    });
};

module.exports = {
    createIndexFile
};
