const util = require('util');
const exec = util.promisify(require('child_process').exec);

const safeExec = async(script = '', onSuccess = Function.prototype, onError = Function.prototype) => {
    const { error, stdout, stderr } = await exec(script);

    if (error) {
        return await onError(stderr);
    }

    return await onSuccess(stdout);
};

module.exports = {
    safeExec
};