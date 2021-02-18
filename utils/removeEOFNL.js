const { safeExec } = require('./safeExec');

const removeLastEmptyLine = (filePath) => {
    const removeLastEmptyLine = `tail -n 1 "${filePath}" | wc -c | xargs -I {} truncate "${filePath}" -s -{}`
    const handleSuccess = () => console.log(`Cleaned ${filePath} successfully`);
    const handleFailure = (error) => console.log(`Error while cleaning ${filePath} : `, error);
    return safeExec(removeLastEmptyLine, handleSuccess, handleFailure);
};

module.exports = {
    removeLastEmptyLine
};
