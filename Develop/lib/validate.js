// validateEntries
// this function validates entries for the user inputs
// and returns the value if it is valid 
// ***************************************
function validateEntries(value) {
    // checks the for the name and regexes accordingly 
    if (value === '') {
        return 'this is not a valid input';
    } else {
        return true;
    };
}
function validateNumbers(number) {
    // checks the for the name and regexes accordingly 
    if (typeof number === 'number') {
        return true;
    } else {
        return 'this is not a valid input';
    };
}


module.exports = {validateEntries,validateNumbers}; 