const createIndexFile = ({ outputPath = './output/index.js', countryCodes, sourceDir = './flags' }) => {
    let data = '';
    countryCodes.forEach((code) => {
        data += `export { default as ${code.toLowerCase()} } from '${sourceDir}/${code}';\n`
    });
    fs.writeFile(outputPath, data, (err) => {
        if (err)
            console.log("Failed to create index file : ", err);
        else
            console.log(`Created index file : ${outputPath}`);
    });
};

module.exports = {
    createIndexFile
};
