module.exports = {
    apps: [
        {
            name: 'Duckify',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        },
    ],
};
