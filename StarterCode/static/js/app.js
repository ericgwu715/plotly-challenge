
function getBellyPlot(id) {

    d3.json("./samples.json").then((data)=> {
        console.log(data)

        var ids = data.samples[0].otu_ids;
        console.log(ids)
        var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
        // console.log(sampleValues)
        var labels = data.samples[0].otu_labels.slice(0, 10);
        // console.log(labels)
        // console.log(`OTU_labels: ${labels}`)
        var OTU_TopID = (data.samples[0].otu_ids.slice(0, 10)).reverse();
        // console.log(OTU_TopID);
        var OTU_ID = OTU_TopID.map(id => "OTU" + id);
        // console.log(`OTU IDS: ${OTU_ID}`)

        // Bar Chart
        var trace = {
            x: sampleValues,
            y: OTU_ID,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h"
        }
        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        Plotly.newPlot("bar", data, layout)
    //   Bubble Chart Demo on Ploty 
// To scale the bubble size, use the attribute sizeref. We recommend using the following formula to calculate a sizeref value:
// sizeref = 2.0 * Math.max(...size) / (desired_maximum_marker_size**2)
// Note that setting 'sizeref' to a value greater than 1, decreases the rendered marker sizes, while setting 'sizeref' to less than 1, increases the rendered marker sizes. See https://plotly.com/python/reference/scatter/#scatter-marker-sizeref for more information. Additionally, we recommend setting the sizemode attribute: https://plotly.com/python/reference/scatter/#scatter-marker-sizemode to area.

// var trace1 = {
//     x: [1, 2, 3, 4],
//     y: [10, 11, 12, 13],
//     text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
//     mode: 'markers',
//     marker: {
//       size: [400, 600, 800, 1000],
//       sizemode: 'area'
//     }
//   };
  
//   var trace2 = {
//     x: [1, 2, 3, 4],
//     y: [14, 15, 16, 17],
//     text: ['A</br>size: 40</br>sixeref: 0.2', 'B</br>size: 60</br>sixeref: 0.2', 'C</br>size: 80</br>sixeref: 0.2', 'D</br>size: 100</br>sixeref: 0.2'],
//     mode: 'markers',
//     marker: {
//       size: [400, 600, 800, 1000],
//       //setting 'sizeref' to lower than 1 decreases the rendered size
//       sizeref: 2,
//       sizemode: 'area'
//     }
//   };
  
//   var trace3 = {
//     x: [1, 2, 3, 4],
//     y: [20, 21, 22, 23],
//     text: ['A</br>size: 40</br>sixeref: 2', 'B</br>size: 60</br>sixeref: 2', 'C</br>size: 80</br>sixeref: 2', 'D</br>size: 100</br>sixeref: 2'],
//     mode: 'markers',
//     marker: {
//       size: [400, 600, 800, 1000],
//       //setting 'sizeref' to less than 1, increases the rendered marker sizes
//       sizeref: 0.2,
//       sizemode: 'area'
//     }
//   };
  
//   // sizeref using above forumla
//   var desired_maximum_marker_size = 40;
//   var size = [400, 600, 800, 1000];
//   var trace4 = {
//     x: [1, 2, 3, 4],
//     y: [26, 27, 28, 29],
//     text: ['A</br>size: 40</br>sixeref: 1.25', 'B</br>size: 60</br>sixeref: 1.25', 'C</br>size: 80</br>sixeref: 1.25', 'D</br>size: 100</br>sixeref: 1.25'],
//     mode: 'markers',
//     marker: {
//       size: size,
//       //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
//       sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
//       sizemode: 'area'
//     }
//   };
  
//   var data = [trace1, trace2, trace3, trace4];
  
//   var layout = {
//     title: 'Bubble Chart Size Scaling',
//     showlegend: false,
//     height: 600,
//     width: 600
//   };
  
//   Plotly.newPlot('myDiv', data, layout);
      });
  }  
function getDemoInfo(id) {
    d3.json("./samples.json").then((data)=> {
        
        var metadata = data.metadata;

        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographicInfo = d3.select("#sample-metadata");
        
        demographicInfo.html("");

        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    getBellyPlot(id);
    getDemoInfo(id);
}


function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("./samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();