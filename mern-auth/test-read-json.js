const fs = require('fs');

try {
  const data = fs.readFileSync('./quotes.json', 'utf-8');
  console.log('Data:', JSON.parse(data));
} catch (err) {
  console.error('Error reading the JSON file:', err);
}
