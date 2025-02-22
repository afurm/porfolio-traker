module.exports = {
    // Run type-check on changes to TypeScript files
    '**/*.ts?(x)': () => 'npm run type-check',
    // Lint and format TypeScript and JavaScript files
    '**/*.(ts|tsx|js|jsx)': filenames => [
        `npm run lint --fix ${filenames.join(' ')}`,
        `prettier --write ${filenames.join(' ')}`,
    ],
    // Format MarkDown and JSON
    '**/*.(md|json)': filenames => `prettier --write ${filenames.join(' ')}`,
} 