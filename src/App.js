import React, { useState } from 'react';
import { Slider, Select, MenuItem } from '@material-ui/core';
import Plot from './Plot';
import './App.css';

// Application:  Side-by-side scatter plots.
const App = () => {
    
    // Create state.
    const [ dataSet, setDataSet ] = useState( "Iris" );
    const [ size, setSize ] = useState( 100 );
    
    // Return the App.
    return (
        <div className="Column">
            <div className="GridPlots">
                <label>Geometric Symbols</label>
                <label>Preattentive Symbols</label>
                <Plot symbolSet={"geometric"}    dataSet={dataSet} size={size} />
                <Plot symbolSet={"preattentive"} dataSet={dataSet} size={size} />
            </div>
            <div className="GridControls">
                <label>Size:</label>
                <Slider defaultValue={ 10 } step={ 1 } min={ 0 } max={ 20 }
                    valueLabelDisplay="auto" marks valueLabelFormat={( value ) => value * value }
                    onChangeCommitted={( event, value ) => setSize( value * value )} />
                <label>Data Set:</label>
                <Select value={ dataSet } style={{minWidth: 120}}
                    onChange={( event ) => { setDataSet( event.target.value )}}>
                    <MenuItem value="Iris">Iris</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Cytometry">Cytometry</MenuItem>
                </Select>
            </div>
            <div className="Description">
                <p>
                Preattentive features include line orientation, closure, and terminators.  Distinct preattentive features make it easier for the user to find patterns in their data, and also reduce overlap between symbols.
                </p>
                <p>
                <a href="https://en.wikipedia.org/wiki/Jacques_Bertin">Bertin</a>, <a href="https://en.wikipedia.org/wiki/William_S._Cleveland">Cleveland</a>, and <a href="https://en.wikipedia.org/wiki/Leland_Wilkinson">Wilkinson</a> independently suggested Circle, Plus, and X as distinct symbols for data with few categories.  A good explanation of preattentive processing is on the <a href="https://infovis-wiki.net/wiki/Preattentive_processing">InfoVis Wiki</a>.
                </p>
            </div>
        </div>
    );
}

export default App;
