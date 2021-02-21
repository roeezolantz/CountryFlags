const { promises: fs } = require('fs');
const chalk = require('chalk');

const createIndexFile = async({ outputDirPath = './output', countryCodes, sourceDir = './flags' }) => {
    let data = '';
    const filePath = `${outputDirPath}/index.js`;
    countryCodes.forEach((code) => {
        data += `export { default as ${code.toLowerCase()} } from '${sourceDir}/${code}';\n`
    });
    try {
        await fs.writeFile(filePath, data);
        console.log(chalk.green(`Created index file : ${filePath}`));
    } catch(err) {
            console.log(chalk.red("Failed to create index file : "), err);
    };
};

module.exports = {
    createIndexFile
};
