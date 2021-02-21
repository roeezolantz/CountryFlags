const pLimit = require('p-limit');
const { monitoredPromiseAll, createReactSVGComponent, spaceToHypen } = require('./utils');

const createFlagComponents = async(codeToCountryNameMap, { asyncExecLimit = 20, ...config } = {}) => {
    console.log(`\n\n\nCreating React components... (parralel creation limit - ${asyncExecLimit})`);
    const limit = pLimit(asyncExecLimit);

    const allCreators = Object.entries(codeToCountryNameMap).map(([code, name]) => 
        limit(() => createReactSVGComponent(code, `flag-${spaceToHypen(name.toLowerCase())}.svg`, config)));

    const validCount = Object.keys(codeToCountryNameMap).length;

    await monitoredPromiseAll(allCreators, (progress) => console.log(`${progress}/${validCount}`));
    
    console.log(`Created ${Object.keys(codeToCountryNameMap).length} react components`);
    console.log("Finished.")
};

module.exports = {
    createFlagComponents
};
