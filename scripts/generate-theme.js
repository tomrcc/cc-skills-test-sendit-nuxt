const fs = require('fs');

// Writes the editor-set colours from data/theme.json to a gitignored partial;
// assets/style/_variables.scss holds the defaults for any colour left unset.
const theme = JSON.parse(fs.readFileSync('data/theme.json', 'utf8'));

const variables = {
  primary_color: 'color-primary',
  secondary_color: 'color-secondary',
  anchor_color: 'color-anchor',
  background_effects_color: 'color-background-effects'
};

const lines = Object.entries(variables)
  .filter(([key]) => theme[key])
  .map(([key, name]) => `$${name}: ${theme[key]};\n`);

fs.writeFileSync('assets/style/_theme.scss', lines.join(''));
