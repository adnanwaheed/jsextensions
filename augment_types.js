Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};

Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});

Promise.method('timeout', function(ms) {
    let timeout_promise = new Promise( function(resolve, reject) {
        setTimeout( () => reject("timeout"), ms);
    });
    return Promise.race([this, timeout_promise]);
});

Promise.any = function(promises) {
    if (!promises || promises.length<1)
        return Promise.reject("empty list");
    // There is no way to know which promise is rejected.
    // So we map it to a new promise to return the index when it fails
    let index_promises = promises.map((p, index) => p.catch(() => {throw index;}));
    return Promise.race(index_promises).catch( index => {
        // remove the failed promise
        promises.splice(index, 1)[0];
        return Promise.any(promises);
    } )
}
