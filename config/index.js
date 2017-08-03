const defaultConfig = require('./common.config');
const merge = require('./helper/mergeHelper');
let settings = null;

if (process.env.NODE_ENV !== 'production') {
    settings = merge(defaultConfig, require('./development.config'));
} else {
    settings = merge(defaultConfig, require('./production.config'));
}

module.exports = settings