import React, { useState } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import Plot from './Plot';
import './App.css';

// Application:  Side-by-side scatter plots.
const App = () => {
    
    // Create state.
    const [ dataSet, setDataSet ] = useState( "Iris" );
    const [ data, setData ] = useState( App.getData( dataSet ));
    
    // Return the App.
    return (
        <div className="Column">
            <div className="GridPlots">
                <label>Geometric Symbols</label>
                <label>Preattentive Symbols</label>
                <Plot shapes={"geometric"}    data={data} />
                <Plot shapes={"preattentive"} data={data} />
            </div>
            <div className="GridControls">
                <label>Data Set:</label>
                <Select value={ dataSet } style={{minWidth: 120}}
                    onChange={( event ) => {
                        setDataSet( event.target.value );
                        setData( App.getData( event.target.value ))
                    }}>
                    <MenuItem value="Iris">Iris</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Diamonds">Diamonds</MenuItem>
                </Select>
            </div>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor tempor massa. Morbi congue mi augue, a vulputate augue molestie eget. Sed egestas eros elit, ut pretium tellus pretium ut. Donec volutpat leo et neque laoreet porttitor sit amet et quam. In hac habitasse platea dictumst. Etiam eu magna tortor. Cras vel dapibus ligula, ut rutrum nibh. Morbi blandit ac elit id volutpat. Nam ut tincidunt elit. Sed fermentum lacinia magna, eget commodo leo gravida in. Suspendisse sit amet nibh magna. Cras ullamcorper libero id fermentum tincidunt. Quisque hendrerit nisl purus, non fringilla tortor fermentum a. Phasellus eleifend felis at ante porttitor tempus. Pellentesque vulputate odio vel tortor elementum blandit.
            </p>
        </div>
    );
}

// Returns Array of Arrays of X, Y, and category.
App.getData = ( newDataSet ) => {
    
    console.log( "$$$$$ " + newDataSet );
    
    let data = [];
    switch( newDataSet ) {
        case "Business": data = [[ 3, 3, 0 ], [ 1, 1, 1 ], [ 4, 4, 2 ]]; break;
        case "Diamonds": data = [[ 1, 1, 0 ], [ 5, 5, 1 ], [ 9, 9, 2 ]]; break;
        default: data = [[ 0, 0, 0 ], [ 1, 1, 1 ], [ 2, 2, 2 ], [ 3, 3, 3 ], [ 4, 4, 4 ], [ 5, 5, 5 ], [6, 6, 6 ]]; break;
    }
    
    return data;
}

export default App;
