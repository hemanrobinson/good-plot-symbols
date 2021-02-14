import React, { useState } from 'react';
import { Slider, Select, MenuItem } from '@material-ui/core';
import Plot from './Plot';
import './App.css';
import symbolsPreattentive from './symbolsPreattentive.png';
import symbolsDiscriminable from './symbolsDiscriminable.png';

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
            <div className="Description">
                <h1>Preattentive Plot Symbols</h1>
            </div>
            <div className="GridPlots">
                <label>Geometric Symbols</label>
                <label>Preattentive Symbols</label>
                <Plot symbolSet={"geometric"}    dataSet={dataSet} size={size} />
                <Plot symbolSet={"preattentive"} dataSet={dataSet} size={size} />
            </div>
            <div className="GridControls">
                <label>Size:</label>
                <Slider defaultValue={ 10 } step={ 1 } min={ 1 } max={ 20 }
                    valueLabelDisplay="auto" marks valueLabelFormat={( value ) => value * value }
                    onChangeCommitted={( event, value ) => setSize( value * value )} />
                <label>Data Set:</label>
                <Select value={ dataSet } style={{minWidth: 120, backgroundColor: "#ffffff"}}
                    onChange={( event ) => { setDataSet( event.target.value )}}>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Cherts">Cherts</MenuItem>
                    <MenuItem value="Cytometry">Cytometry</MenuItem>
                    <MenuItem value="Decathlon">Decathlon</MenuItem>
                    <MenuItem value="Iris">Iris</MenuItem>
                </Select>
            </div>
            <div className="Description">
                <p>
                Symbols with preattentive features improve pattern detection by increasing discriminability and reducing overlap.
                </p>
                <p>
                Preattentive features are detected quickly, before normal visual processing takes place. For example, the difference between closed and open symbols is detected preattentively.  Other preattentive features include line orientation and terminators.
                </p>
                <p>
                <a href="https://en.wikipedia.org/wiki/Jacques_Bertin">Bertin</a>, <a href="https://en.wikipedia.org/wiki/William_S._Cleveland">Cleveland</a>, and <a href="https://en.wikipedia.org/wiki/Leland_Wilkinson">Wilkinson</a> suggested the Circle, Plus, and X symbols.
                The Circle is considered the best symbol when data have only one category, because it minimizes interference between points.
                </p>
                <p className="center">
                    <img alt="Discriminable Symbols" src={symbolsDiscriminable} />
                </p>
                <p>
                The most discriminable symbols aren't the most popular.  For this symbol set, polling determined the most popular symbols; then <a href="https://www.tandfonline.com/doi/abs/10.1080/10618600.2019.1637746">usability testing</a> found the most discriminable among them.
                </p>
                <p className="center">
                    <img alt="Preattentive Symbols" src={symbolsPreattentive} />
                </p>
                <p>
                Preattentive processing was originally studied by cognitive psychologists.  The preattentive literature is extensive.  A good introduction is on the <a href="https://infovis-wiki.net/wiki/Preattentive_processing">InfoVis Wiki</a>.
                </p>
            </div>
            <a href="https://github.com/hemanrobinson/preattentive/">Code Shared on GitHub</a>
        </div>
    );
}

export default App;
