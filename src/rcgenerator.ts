import fs from 'fs';

const data = `module.exports = {
    'config': './dist/config/config.js',
    'models-path': './dist/db/models',
    'migrations-path': './dist/db/migrations',
    'seeders-path': './dist/db/seeders'
}`



fs
    .writeFileSync("\.sequelizerc", data)

console.log(".sequelizerc file created")