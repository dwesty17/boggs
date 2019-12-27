const withSass = require("@zeit/next-sass");

const config = withSass({
    env: {
        SERVER_URL: process.env.SERVER_URL,
    },
});

module.exports = config;
