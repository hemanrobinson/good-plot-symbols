import React, { useState } from 'react';
import { Slider, Select, MenuItem } from '@material-ui/core';
import Plot from './Plot';
import './App.css';
import treisman from './treisman.png';
import test from './test.png';
import symbolsPreattentive from './symbolsPreattentive.png';
import symbolsDiscriminable from './symbolsDiscriminable.png';

/**
 * Side-by-side scatter plots.
 */
const App = () => {
    
    // Create state.
    const [ size, setSize ] = useState( 100 );
    const [ opacity, setOpacity ] = useState( 1 );
    const [ lineWidth, setLineWidth ] = useState( 1 );
    const [ dataSet, setDataSet ] = useState( "Decathlon" );
    
    // Return the component.
    return (
        <div className="Column">
            <div className="Description">
                <h1>Preattentive Symbols</h1>
            </div>
            <div className="GridPlots">
                <label>Unfilled Symbols</label>
                <label>Preattentive Symbols</label>
                <Plot symbolSet={"geometric"}    dataSet={dataSet} size={size} lineWidth={lineWidth} opacity={opacity} isFilled={false} />
                <Plot symbolSet={"preattentive"} dataSet={dataSet} size={size} lineWidth={lineWidth} opacity={opacity} />
            </div>
            <div className="GridControls">
                <label>Size:</label>
                <Slider defaultValue={ 10 } step={ 1 } min={ 1 } max={ 20 }
                    valueLabelDisplay="auto" marks valueLabelFormat={( value ) => value * value }
                    onChangeCommitted={( event, value ) => setSize( value * value )} />
                <label>Transparency:</label>
                <Slider defaultValue={ 0 } step={ 0.01 } min={ 0 } max={ 1 }
                    valueLabelDisplay="auto"
                    onChangeCommitted={( event, value ) => setOpacity( 1 - value )} />
                <label>Stroke Width:</label>
                <Slider defaultValue={ 1 } step={ 1 } min={ 1 } max={ 4 }
                    valueLabelDisplay="auto" marks
                    onChangeCommitted={( event, value ) => setLineWidth( value )} />
                <label>Data Set:</label>
                <Select value={ dataSet } style={{minWidth: 150, backgroundColor: "#ffffff"}}
                    onChange={( event ) => { setDataSet( event.target.value )}}>
                    <MenuItem value="Decathlon">(50) Decathlon</MenuItem>
                    <MenuItem value="Business">(67) Business</MenuItem>
                    <MenuItem value="Iris">(150) Iris</MenuItem>
                    <MenuItem value="Cytometry">(500) Cytometry</MenuItem>
                    <MenuItem value="Random">(4980) Random</MenuItem>
                </Select>
            </div>
            <div className="Description">
                <h2>About This User Interface</h2>
                <p>
                This is Dr. Anne Treisman, receiving the National Science Award. At the end of a great career, you want a big hunk of metal, and she got hers.
                </p>
                <p className="center" style={{fontSize: 'small'}}>
                <img alt="Dr. Anne Treisman" src={treisman} /><br />
                Source: <a href="https://nationalmedals.org/laureate/anne-treisman/">National Science and Technology Medals Foundation</a>
                </p>
                <p>
                Dr. Treisman and other cognitive psychologists studied figures like the one below.
                </p>
                <p className="center">
                    <img alt="Test" src={test} />
                </p>
                <p>
                They wondered: why do most people perceive the asterisks, on the right, more quickly than the down-pointing triangles, on the left?
                </p>
                <p>
                Dr. Treisman showed that our brains perform visual processing in two stages. Some features are perceived only when we pay attention. Other features, including line length, orientation, and number of terminations, are perceived pre-attentively -- before normal visual processing takes place.
                </p>
                <p>
                <a href="https://www.stat.purdue.edu/~wsc/">Dr. William S. Cleveland</a> used the work of the cognitive psychologists to improve plot symbols. The preattentive features clarify patterns and reduce overlap between symbols.  At the top of this page, the scatter plot on the right extends Dr. Cleveland's work.
                </p>
                <p>
                A study found statistically significant differences in perception times for up to six symbols.  The study's goal was to identify the most discriminable symbols for any number of categories. As in baseball, the best symbols are at the top of the order. Ordering the symbols enables software to automatically assign the two best symbols for two categories, the three best for three categories, and so on.
                </p>
                <p>
                <a href="https://en.wikipedia.org/wiki/Jacques_Bertin">Bertin</a>, <a href="https://en.wikipedia.org/wiki/William_S._Cleveland">Cleveland</a>, and <a href="https://en.wikipedia.org/wiki/Leland_Wilkinson">Wilkinson</a> suggested the Circle, Plus, and X symbols.
                The Circle is considered the best symbol when data have only one category, because it minimizes interference between points.
                </p>
                <p className="center">
                    <img alt="Discriminable Symbols" src={symbolsDiscriminable} />
                </p>
                <p>
                The most discriminable symbols aren't the most popular.  For this symbol set, polling determined the most popular symbols; then <a href="https://www.tandfonline.com/doi/abs/10.1080/10618600.2019.1637746">usability testing</a> found the most discriminable among them.  These symbols are equally weighted by pixel count, so that no one category dominates the plot.
                </p>
                <p className="center">
                    <img alt="Preattentive Symbols" src={symbolsPreattentive} />
                </p>
                <p>
                These symbols have been <a href="https://github.com/d3/d3-shape/releases">contributed to d3.</a>
                </p>
                <br/>
                <h2>References</h2>
                <ul>
                    <li><a href="https://infovis-wiki.net/wiki/Preattentive_processing">Infovis Wiki</a><br/>Great overview of preattentive processing.</li>
                    <li><a href="https://www.csc2.ncsu.edu/faculty/healey/PP/index.html">Dr. Christopher Healey's Examples</a><br/>Explanations of visual perception with interactive examples.</li>
                    <li><a href="https://www.tandfonline.com/doi/abs/10.1080/10618600.2019.1637746">Good Plot Symbols by Default</a><br/>Study that identified this symbol set.</li>
                </ul>
            </div>
            <a href="https://github.com/hemanrobinson/preattentive/">Code Shared on GitHub</a>
        </div>
    );
}

export default App;
