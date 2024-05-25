// envLoader.js
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envVars = dotenv.parse(fs.readFileSync('.env'));
Object.keys(envVars).forEach(key => {
  window[key] = envVars[key];
});
