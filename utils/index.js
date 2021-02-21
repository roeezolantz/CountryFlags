const { monitoredPromiseAll } = require('./monitoredPromiseAll');
const { safeExec } = require('./safeExec');
const { withDirCreation } = require('./withDirCreation');
const { removeLastEmptyLine } = require('./removeEOFNL');
const { createReactSVGComponent } = require('./createReactSVGComponent');
const { createIndexFile } = require('./createIndexFile');
const { matchFlagsToCountries } = require('./matchFlagsToCountries');
const { runOnTrustedFlags } = require('./runOnTrustedFlags');
const { createFlagComponents } = require('./createFlagsComponents');

module.exports = {
    monitoredPromiseAll,
    safeExec,
    withDirCreation,
    removeLastEmptyLine,
    createReactSVGComponent,
    createIndexFile,
    matchFlagsToCountries,
    runOnTrustedFlags,
    createFlagComponents
}