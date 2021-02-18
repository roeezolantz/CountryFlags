const monitoredPromiseAll = (promises, onProgressChanged = Function.prototype, { usePercentage = false, notifyOnZero = false } = {}) => {
    let d = 0;
    notifyOnZero && onProgressChanged(0);

    for (const p of promises) {
        p.then(()=> {
            d++;
            const progress = usePercentage ? ((d * 100) / promises.length) : d
            onProgressChanged(progress);
        });
    }

    return Promise.all(promises);
};

module.exports = {
    monitoredPromiseAll
};