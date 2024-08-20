// Script for the checking of unused css

const { exec } = require('child_process');
const path = require('path');

// Get the CSS file name from the command line arguments
const cssFileName = process.argv[2];

if (!cssFileName) {
    console.error('Error: Please provide a CSS file name as an argument.');
    process.exit(1);
}

// Construct the command to run PostCSS with PurgeCSS
const postcssCommand = `npx postcss ${path.join('_sass', cssFileName)} -o ./output/${cssFileName} --config ./postcss.config.js`;

exec(postcssCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }

    // If no errors, print a success message with more details
    console.log(`Success: The file '${cssFileName}' was processed successfully.`);
    console.log(`The output has been saved to './output/${cssFileName}'`);
    console.log(`NOTE: ALL THE UNUSED CSS IS REMOVED FROM THE UPDATED FILE`);
});


