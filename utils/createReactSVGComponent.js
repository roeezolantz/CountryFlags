const fs = require('fs');
const { safeExec } = require('./safeExec');
const { withDirCreation } = require('./withDirCreation');
const { removeLastEmptyLine } = require('./removeEOFNL');

const createReactSVGComponent = (code, svgFileName, {
    sourceDirPath = './flags',
    outputDirPath = './output/flags',
    templatePath = './configs/template.js',
    prettierConfigPath = './configs/config.json',
    outputFileType = 'js'
} = {}) => withDirCreation(outputDirPath, async() => {
    if (!fs.existsSync(sourceDirPath)) {
        throw `${sourceDirPath} was not found, please provide a valid source dir.`;
    }

    const outputFilePath = `${outputDirPath}/${code}.${outputFileType}`
    const command = `svgr --prettier-config ${prettierConfigPath} --expand-props none --template ${templatePath} ${sourceDirPath}/${svgFileName} > ${outputFilePath}`
    const handleSuccess = async() => {
        console.log(`Created ${outputFilePath} successfully`);
        return await removeLastEmptyLine(outputFilePath);
    };
    const handleFailure = (error) => console.log(`Error while creating ${outputFilePath} : `, error);
    
    return await safeExec(command, handleSuccess, handleFailure);
});

module.exports = {
    createReactSVGComponent
};