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
                    
