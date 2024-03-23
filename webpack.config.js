const path = require("path");

module.exports = {
    mode: "development",
    resolve: {
        alias: {
            "@": path.resolve("resources/js"),
        },
    },
    stats: {
        children: false,
    },
};
