// tying json data using site link, default samples if needed
const bellybuttons = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
console.log(bellybuttons);

function init() {
    Plotly.newplot("plot", bellybuttons)
}

// update on change, at this point im just going d2d
d3.selectAll('#selDataset').on('change', updatePlotly);

// dropdown menu selection
// need to workout multiples, probably use a for loop
function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let datasets = dropdownMenu.property("value");

    // iterate through json, name id as key
    // create a new <option> element for each key
    for (const bellybutton in bellybuttons) {
        if (bellybuttons.hasOwnProperty(bellybutton)) {
            const optionElement = document.createElement('option');
            // unsure if this should be referencing the metadata instead
            optionElement.value = bellybutton.name;
            optionElement.textContent = bellybutton.name;
            // append each option to select element, dynamic populating menu with bellybutton obs
            selectElement.appendChild(optionElement); 

        }


    }
}


init();