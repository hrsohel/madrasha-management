const fs = require('fs');
const path = require('path');

// Read the files
const addStudentFormPath = 'src/app/components/add-student/AddSrudentform1.jsx';
const categoryFilePath = 'src/app/components/add-student/categoryFile.js';

const formContent = fs.readFileSync(addStudentFormPath, 'utf8');
const categoryContent = fs.readFileSync(categoryFilePath, 'utf8');

// Extract keys from AddSrudentform1.jsx
// Looking for: "নাজেরা": "নাজেরা"
const mapRegex = /"([^"]+)":\s*"([^"]+)"/g;
const formKeys = [];
let match;
// We know the map block is there, let's just grep the specific lines or regex globally
// Simple approach: find valid Bengali words in quotes
// Better: extract the implementation of divisionToCategoryMap
const mapBlockMatch = formContent.match(/divisionToCategoryMap\s*=\s*({[^}]+})/);
if (mapBlockMatch) {
    const mapBlock = mapBlockMatch[1];
    console.log("Found Map Block:", mapBlock);
    let keyMatch;
    const keyRegex = /"([^"]+)":/g;
    while ((keyMatch = keyRegex.exec(mapBlock)) !== null) {
        formKeys.push(keyMatch[1]);
    }
}

// Extract categories from categoryFile.js
// Looking for: "category": "নাজেরা"
const categoryKeys = [];
const catRegex = /"category":\s*"([^"]+)"/g;
while ((match = catRegex.exec(categoryContent)) !== null) {
    categoryKeys.push(match[1]);
}

console.log("\nForm Keys:", formKeys);
console.log("Category File Keys:", categoryKeys);

formKeys.forEach(key => {
    const match = categoryKeys.find(c => c === key);
    if (match) {
        console.log(`MATCH: '${key}'`);
    } else {
        console.log(`MISMATCH: '${key}' - Not found in categoryFile`);
        // Check char codes
        console.log(`  Char codes for Form Key '${key}':`, key.split('').map(c => c.charCodeAt(0)));
        // Find best guess in category keys
        categoryKeys.forEach(ck => {
            console.log(`  Vs Category Key '${ck}':`, ck.split('').map(c => c.charCodeAt(0)));
        });
    }
});
