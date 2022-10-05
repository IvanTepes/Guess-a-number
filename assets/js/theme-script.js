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

// Select and store themes elements in to object
const themeElements = {
    light: document.querySelector('.themes__item--light'),
    dark: document.querySelector('.themes__item--dark'),
    brown: document.querySelector('.themes__item--brown'),
    green: document.querySelector('.themes__item--green'),
    purple: document.querySelector('.themes__item--purple'),
    blue: document.querySelector('.themes__item--blue'),
};

// Create theme object with initial keys and values
const themesObj = {
    themesKeys: Object.keys(themeElements),
    themesValues: Object.values(themeElements),
};

// Check user preferred theme
// Check if preferred theme is dark
// If dark add data theme dark attribute to HTML element
// Create new key and value in theme object / activeTheme dark/light
// Create variable with value of html theme element
// Add class active to element
// Add new property in themes object
//      with keys and values preferred theme
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

// Function to read HTML data theme attribute
const checkActiveTheme = () =>
    document.documentElement.getAttribute('data-theme');

// Add element event click listener
// for each theme element
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

// Change Theme function
// Invoke on every click on themes elements
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


