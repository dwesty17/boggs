const withSass = require("@zeit/next-sass");

const config = {
    env: {
        SERVER_URL: process.env.SERVER_URL,
    },
};

module.exports = withSass(config);
