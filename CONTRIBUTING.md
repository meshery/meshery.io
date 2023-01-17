# Contributing to Meshery
You want to contribute to the project? Yay! 🎈 Please do. 🎈

## Style Guide
The Meshery.io site is built using Jekyll and Javascript.

## Working with themes
To differentiate between dark and light theme components, a base file ```rootvariables.scss``` has been created. It contains global CSS variables that can be accessed by using the ```var()``` keyword during styling elements. This file powers all the different styles (including font colors, background colors, image filters and image backgrounds) based on theme changes.

It is advised to use these predefined styles for contributing to different features on the website that are theme dependent. Avoid creating your own CSS variables.

### Example

To change text color in CSS, this can be used:

```
color: var(--color-primary-light);
```

To change background color in CSS, this can be executed:
```
background: var(--background-primary);
```

These global variables will change automatically based on the theme selection. This is done by modifying the body classlist.

## Changing images according to theme
The Meshery.io website contains icons for various organisations, and these are set to change according to the website theme.

The format for SVG or other images is as follows:
```
<img src = " *path for image SVG to be used for light theme* "
id = "logo-dark-light"
data-logo-for-dark = " *path for image SVG to be used for dark theme* "
data-logo-for-light = " *path for image SVG to be used for light theme* "
```
The id **logo-dark-light** is used as a CSS selector and ensures that the image is effected by the theme changes.

The images can be found at the path ```meshery.io/ images```

See the set of contributing guides at https://docs.meshery.io/project/contributing
