const { monitoredPromiseAll } = require('./monitoredPromiseAll');
const { safeExec } = require('./safeExec');
const { withDirCreation } = require('./withDirCreation');
const { removeLastEmptyLine } = require('./removeEOFNL');
const { createReactSVGComponent } = require('./createReactSVGComponent');
const { createIndexFile } = require('./createIndexFile');
const textUtils = require('./textUtils');

module.exports = {
    monitoredPromiseAll,
    safeExec,
    withDirCreation,
    removeLastEmptyLine,
    createReactSVGComponent,
    createIndexFile,
    ...textUtils
}