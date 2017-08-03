const DeepExtend = require('deep-extend');

const config = function(base, overrides) {
    return DeepExtend(base, overrides || {});
}

module.exports = config