const ERROR = 2;
const MESSAGE_MAX_LENGTH = 140;

module.exports = {
    extends: [ '@commitlint/config-conventional' ],
    rules: {
        'header-max-length': [ ERROR, 'always', MESSAGE_MAX_LENGTH ]
    }
};
