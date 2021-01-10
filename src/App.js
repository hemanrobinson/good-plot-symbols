import React, { useState } from 'react';
import { Slider, Select, MenuItem } from '@material-ui/core';
import Plot from './Plot';
import './App.css';

/**
 * Side-by-side scatter plots.
 */
const App = () => {
    
    // Create state.
    const [ dataSet, setDataSet ] = useState( "Iris" );
    const [ size, setSize ] = useState( 100 );
    
    // Return the component.
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
                Preattentive features are detected quickly, before normal visual processing takes place.  Preattentive features make it easier to find patterns in scatter plots by improving discriminability and reducing overlap.
                </p>
                <p>
                Graphics frameworks often use closed geometric symbols.  The distinction between closed versus open symbols is detected preattentively.  Other preattentive features include line orientation and terminators.
                </p>
                <p>
                Preattentive processing has generally been studied by psychologists, but statisticians have an interest because of its applicability to data visualization. <a href="https://en.wikipedia.org/wiki/Jacques_Bertin">Bertin</a>, <a href="https://en.wikipedia.org/wiki/William_S._Cleveland">Cleveland</a>, and <a href="https://en.wikipedia.org/wiki/Leland_Wilkinson">Wilkinson</a> suggested the Circle, Plus, and X symbols.
                </p>
                <p>
                The preattentive literature is extensive.  A good introduction is on the <a href="https://infovis-wiki.net/wiki/Preattentive_processing">InfoVis Wiki</a>.
                </p>
            </div>
        </div>
    );
}

export default App;
