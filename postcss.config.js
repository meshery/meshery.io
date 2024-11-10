const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    syntax: require('postcss-scss'),
    plugins: [
        purgecss({
            content: [
                // Change the path to match your HTML files in which you want to check unused css i'm checking all files at once
                './**/*.html',
                // same for the js, i am checking all js files at once
                './**/*.js',
            ],
            // First change the below code and then add the file name you want. 
            // For e.g. i checked it using variables.scss
            css: ['./_sass/testimonials.scss'],
            // and run this in terminal -> 

            // npx postcss _sass/variables.scss -o ./output/variables.css --config ./postcss.config.js

            // change the variables to the file you want to check
            safelist: [], // Add any CSS selectors you want to keep
            keyframes: true,
            fontFace: true,
            // adding this line to for commiting with sign off
        }),
    ],
};