// scroll js
let parent = document.querySelectorAll('.animate-text');
for(let i = 0; i < parent.length; i++) {
  parent[i].style.width = parent[i].children[0].clientWidth + "px"; 
};

// tying json data using site link
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
console.log(url);

// Display the default plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of id names
        let names = data.names;

        // Iterate through the names Array
        names.forEach((name) => {
            // Append each name as an option to the drop down menu
            // This is adding each name to the html file as an option element with value = a name in the names array
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Assign the first name to name variable
        let name = names[0];

        // Call the functions to make the demographic panel, bar chart, and bubble chart
        demo(name);
        bar(name);
        bubble(name);
        gauge(name);
    });
}

// Make the demographics panel
function demo(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]
        
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // Object.entries() is a built-in method in JavaScript 
        // This returns an array of a given object's own enumerable property [key, value]
        let entries = Object.entries(obj);
        
        // Iterate through the entries array
        // Add a h5 child element for each key-value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
    });
}
  

// Make the bar chart
function bar(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of sample objects
        let samples = data.samples;

        // Filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);

        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the horizontal bar chart
        let trace1 = [{
            // Slice the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            ids: obj.otu_ids[0],
            title: 'set',
            type: "bar",
            marker: {color: "rgb(150, 138, 208)"},
            orientation: "h"
        }];

        let layout1 = {
            title: "Top Ten Most Common OTU's Found",
            xaxis: {title: "Sample Values"},
            yaxis: {type: "Category"}
            
        };

        
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace1, layout1);
    });
}
  
// Make the bubble chart
function bubble(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {

        // An array of sample objects
        let samples = data.samples;
    
        // Filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the bubble chart
        let trace3 = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Viridis"
            }
        }];
    
        // Apply the x-axis lengend to the layout
        let layout3 = {
            title: "OTU Frequency per Sample",
            xaxis: {title: "OTU ID"},
            yaxis: {type: "Category"}
        };
    
        // Use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", trace3, layout3);
    });
}

// Make the gauge chart 
function gauge(selectedValue) {
    // Fetch the JSON data and console log it 
    d3.json(url).then((data) => {
        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]

        // Trace for the data for the gauge chart
        let trace2 = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            type: "indicator", 
            title: { text: "<b>Washing Frequency</b><br>Scrubs per Week", font: {size: 18}},
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(38, 30, 146)"},
                steps: [
                    { range: [0, 1], color: "rgb(236, 235, 249)" },
                    { range: [1, 2], color: "rgb(214, 212, 241)" },
                    { range: [2, 3], color: "rgb(199, 196, 241)" },
                    { range: [3, 4], color: "rgb(191, 187, 244)" },
                    { range: [4, 5], color: "rgb(178, 173, 246)" },
                    { range: [5, 6], color: "rgb(157, 150, 244)" },
                    { range: [6, 7], color: "rgb(143, 136, 239)" },
                    { range: [7, 8], color: "rgb(121, 113, 232)" },
                    { range: [8, 9], color: "rgb(102, 92, 229)" },
                    { range: [9, 10], color: "rgb(87, 77, 232)" }
                ]
            }
        }];

         // Use Plotly to plot the data in a gauge chart
         Plotly.newPlot("gauge", trace2);
    });
}

// Toggle to new plots when option changed
function optionChanged(selectedValue) {
    demo(selectedValue);
    bar(selectedValue);
    bubble(selectedValue);
    gauge(selectedValue)
}

init();