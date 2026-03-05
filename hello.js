const nameIndex = process.argv.indexOf('--name');
const name = (nameIndex !== -1 && process.argv[nameIndex + 1]) ? process.argv[nameIndex + 1] : 'World';
console.log(`Hello, ${name}!`);
