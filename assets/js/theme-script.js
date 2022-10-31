/* 
! Check preferred theme dark/light
! And set HTML attribute to theme name
! And add active class to preferred theme

*/

/*  
    ? Set initial theme dark/light
        * Check user preferred theme
        * Store preferred theme
        * Read and store user preferred theme
    ? Apply preferred theme
        * Select themes elements 
        * Store elements (obj || array)
            * Try to select all elements dynamically
            * Query selector return extra class because
            * cant target individually elements (!avoid hardcoding values)
        * Apply theme to element
    ? Select element and add class active

*/

/* Creating an object with the keys of light, dark, brown, green, purple, and blue. The values are the
elements that have the classes of themes__item--light, themes__item--dark, themes__item--brown,
themes__item--green, themes__item--purple, and themes__item--blue. */
const themeElements = {
    light: document.querySelector('.themes__item--light'),
    dark: document.querySelector('.themes__item--dark'),
    brown: document.querySelector('.themes__item--brown'),
    green: document.querySelector('.themes__item--green'),
    purple: document.querySelector('.themes__item--purple'),
    blue: document.querySelector('.themes__item--blue'),
};

/* Creating an object with the keys of themesKeys and themesValues. The values are the keys and values
of the themeElements object. */
const themesObj = {
    themesKeys: Object.keys(themeElements),
    themesValues: Object.values(themeElements),
};

/* This is checking if the user has a preferred theme of dark or light.
If the user has a preferred theme of dark, then the data-theme attribute of the HTML element is set to dark.
The darkThemeElement variable is set to the themeElements.dark object.
The active class is added to the darkThemeElement variable.
The activeTheme property of the themesObj object is set to dark.
If the user has a preferred theme of light, then the data-theme attribute of the HTML element is set to light.
The lightThemeElement variable is set to the themeElements.light object.
The active class is added to the lightThemeElement variable.
The activeTheme property of the themesObj object is set to
light. */
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    let darkThemeElement = themeElements.dark;
    darkThemeElement.classList.add('active');
    themesObj.activeTheme = 'dark';
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    let lightThemeElement = themeElements.light;
    lightThemeElement.classList.add('active');
    themesObj.activeTheme = 'light';
}

/**
 * It checks the value of the data-theme attribute on the documentElement and returns it.
 */
const checkActiveTheme = () =>
    document.documentElement.getAttribute('data-theme');

/* Adding an event listener to each element in the themesObj.themesValues array.
The event listener is listening for a click event. When the click event is triggered, the function is invoked. The
function checks if the element has the class of
themes__item--light, themes__item--dark,
themes__item--brown, themes__item--green,
themes__item--purple, or themes__item--blue.
If the element has one of those classes, then the data-theme attribute of the documentElement is set to the
name of the class. The changeTheme function is invoked. */
themesObj.themesValues.forEach(function (element) {
    element.addEventListener('click', function () {
        if (element.classList.contains('themes__item--light')) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else if (element.classList.contains('themes__item--dark')) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (element.classList.contains('themes__item--brown')) {
            document.documentElement.setAttribute('data-theme', 'brown');
        } else if (element.classList.contains('themes__item--green')) {
            document.documentElement.setAttribute('data-theme', 'green');
        } else if (element.classList.contains('themes__item--purple')) {
            document.documentElement.setAttribute('data-theme', 'purple');
        } else if (element.classList.contains('themes__item--blue')) {
            document.documentElement.setAttribute('data-theme', 'blue');
        }
        changeTheme();
    });
});

/**
 * If the active theme is not the same as the old theme, remove the active class from the old theme and
 * add the active class to the active theme.
 * @returns The activeElement is being returned.
 */
function changeTheme() {
    let oldTheme = themesObj.activeTheme;
    let oldElement = themeElements[oldTheme];
    let activeTheme = checkActiveTheme();
    let activeElement = themeElements[activeTheme];

    if (oldTheme !== activeTheme) {
        oldElement.classList.remove('active');
        activeElement.classList.add('active');
        themesObj.activeTheme = activeTheme;
        console.log(themesObj);
    }
    return activeElement;
}
