import React, { useState } from 'react';
import { Slider, Select, MenuItem } from '@mui/material';
import Plot from './Plot';
import './App.css';
import treisman from './treisman.png';
import cleveland from './cleveland.png';
import test from './test.png';
import symbolsPreattentive from './symbolsPreattentive.png';
import symbolsDiscriminable from './symbolsDiscriminable.png';

// Application:  Preattentive Plotting
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
                <h1>Preattentive Plotting</h1>
                <p>
                Plot symbols with preattentive features improve our ability to detect patterns in data.  Use the controls below to explore symbols for plotting.
                </p>
            </div>
            <div className="GridPlots">
                <label>Geometric Symbols</label>
                <label>Preattentive Symbols</label>
                <Plot symbolSet={"geometric"}    dataSet={dataSet} size={size} lineWidth={lineWidth} opacity={opacity} isFilled={false} />
                <Plot symbolSet={"preattentive"} dataSet={dataSet} size={size} lineWidth={lineWidth} opacity={opacity} />
            </div>
            <div className="GridControls">
                <label>Size:</label>
                <Slider defaultValue={ 10 } step={ 1 } min={ 1 } max={ 20 }
                    valueLabelDisplay="auto" valueLabelFormat={( value ) => value * value }
                    onChangeCommitted={( event, value ) => setSize( value * value )} />
                <label>Transparency:</label>
                <Slider defaultValue={ 0 } step={ 0.01 } min={ 0 } max={ 1 }
                    valueLabelDisplay="auto"
                    onChangeCommitted={( event, value ) => setOpacity( 1 - value )} />
                <label>Stroke Width:</label>
                <Slider defaultValue={ 1 } step={ 0.05 } min={ 0.1 } max={ 4 }
                    valueLabelDisplay="auto"
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
                <h2>Design Notes</h2>
                <p>
                This is <a href="https://nationalmedals.org/laureate/anne-treisman/">Anne Treisman</a>, receiving the National Science Award. At the end of a great career, you want a big hunk of metal, and she got hers.
                </p>
                <p className="center">
                    <a href="https://nationalmedals.org/laureate/anne-treisman/"><img title="Dr. Anne Treisman" alt="Dr. Anne Treisman" src={treisman} /></a>
                    <br />
                </p>
                <p>
                Dr. Treisman and other cognitive psychologists studied figures like the one below.
                </p>
                <p className="center">
                    <img title="Preattentive and Non-preattentive Symbols" alt="Preattentive and Non-preattentive Symbols" src={test} />
                </p>
                <p>
                They wondered: why do most people perceive the asterisks, on the right, more quickly than the down-pointing triangles, on the left?  All three figures are composed of the same three lines, at the same angles.
                </p>
                <p>
                Dr. Treisman showed that our brains perform visual processing in two stages. Some features are perceived only when we pay attention. Other features, including line length, orientation, and number of terminations, are perceived <i>pre-attentively</i> -- before normal visual processing takes place (Treisman, 1985).
                </p>
                <p>
                The preattentive literature has many contributors, including (Beck, Prazdny, and Rosenfeld, 1983), (Healey, Booth, and Enns, 1996), (Julesz and Bergen, 1983), (Krose, 1987), (Malik and Perona, 1990), (Triesman and Gormican, 1988) (Wolfe and Friedman-Hill, 1992).  Dr. Christopher Healey provides a detailed <a href="https://www.csc2.ncsu.edu/faculty/healey/PP/index.html">bibliography with examples</a> (Healey and Enns, 2012).
                </p>
                <p className="center">
                    <a href="https://www.cerias.purdue.edu/site/people/faculty/view/709"><img title="Dr. William Cleveland" alt="Dr. William Cleveland" src={cleveland} /></a>
                    <br />
                </p>
                <p>
                Statisticians, of course, have long been interested in plot symbols. <a href="https://www.cerias.purdue.edu/site/people/faculty/view/709">William Cleveland</a> used the work of the psychologists to improve pattern detection in plots.  At the top of this page, the scatter plot on the right extends Dr. Cleveland's work.
                </p>
                <p>
                <a href="https://en.wikipedia.org/wiki/Jacques_Bertin">Jacques Bertin</a>, <a href="https://en.wikipedia.org/wiki/William_S._Cleveland">Cleveland</a>, and <a href="https://en.wikipedia.org/wiki/Leland_Wilkinson">Leland Wilkinson</a> suggested the Circle, Plus, and X symbols.  The Circle is considered the best symbol when data have only one category, because it minimizes overlap.
                </p>
                <p className="center">
                    <img title="Discriminable Symbols" alt="Discriminable Symbols" src={symbolsDiscriminable} />
                </p>
                <p>
                The most discriminable symbols are not the most popular.  Of the symbols above, the circle, plus, and X are used frequently; the others only rarely.
                </p>
                <p>
                For this reason, a study was conducted to find plot symbols that are both popular and disciminable. Polling determined the most popular symbols; then usability testing found the most discriminable among them (Robinson, 2019).
                </p>
                <p>
                The study found statistically significant differences in perception times for up to six symbols.
                </p>
                <p>
                As in baseball, the best symbols are at the top of the order. Ordering the symbols enables software to automatically assign the two best symbols for two categories, the three best for three categories, and so on.
                </p>
                <p>
                The symbols are equally weighted by pixel count, so that no category biases the plot.
                </p>
                <p>
                These symbols have been <a href="https://github.com/d3/d3-shape/releases">contributed to d3</a>:
                </p>
                <p className="center">
                    <img title="Preattentive Symbols" alt="Preattentive Symbols" src={symbolsPreattentive} />
                </p>
                <br/>
                <h2>Further Reading</h2>
                <ul>
                    <li>Beck, J., Prazdny, K., and Rosenfeld, A. (1983). "A Theory of Textural Segmentation". In Human and Machine Vision, eds. J. Beck, B. Hope, A. Rosenfeld, NY: Academic Press, 1-38. <a href="https://doi.org/10.1016/B978-0-12-084320-6.50007-4">https://doi.org/10.1016/B978-0-12-084320-6.50007-4</a>.</li><br/>
                    <li>Healey, C. and Enns, J. (2012). "Attention and Visual Memory in Visualization and Computer Graphics". IEEE Transactions on Visualization and Computer Graphics, 18, (7). <a href="https://www.csc2.ncsu.edu/faculty/healey/download/tvcg.12a.pdf">https://www.csc2.ncsu.edu/faculty/healey/download/tvcg.12a.pdf</a>.</li><br/>
                    <li>Healey, C., Booth, K., and Enns, J. (1996). "High-Speed Visual Estimation Using Preattentive Processing". ACM Transactions on Computer-Human Interaction 3 (2), 107-135. <a href="https://www.csc2.ncsu.edu/faculty/healey/download/tochi.96.pdf">https://www.csc2.ncsu.edu/faculty/healey/download/tochi.96.pdf</a>.</li><br/>
                    <li>Julesz, B. and Bergen, J. (1983). "Textons, The Fundamental Elements in Preattentive Vision and Perception of Textures". Bell System Technical Journal 62 (6), 1619-1645. <a href="https://ia802708.us.archive.org/10/items/bstj62-6-1619/bstj62-6-1619_text.pdf">https://ia802708.us.archive.org/10/items/bstj62-6-1619/bstj62-6-1619_text.pdf</a>.</li><br/>
                    <li>Krose, B. (1987). "Local Structure Analyzers as Determinants of Preattentive Pattern Discrimination". Biological Cybernetics 55 (5), 289-298. <a href="https://doi.org/10.1007/BF02281975">https://doi.org/10.1007/BF02281975</a>.</li><br/>
                    <li>Malik, J. and Perona, P. (1990). "Preattentive Texture Discrimination with Early Vision Mechanisms". Journal of the Optical Society of America A 7 (5), 923-932. <a href="https://authors.library.caltech.edu/2653/1/MALjosaa90.pdf">https://authors.library.caltech.edu/2653/1/MALjosaa90.pdf</a>.</li><br/>
                    <li>Robinson, H. (2019). "Good Plot Symbols by Default". Journal of Computational and Graphical Statistics, 28, (4), 1011-1016. <a href="https://doi.org/10.1080/10618600.2019.1637746">https://doi.org/10.1080/10618600.2019.1637746</a>.</li><br/>
                    <li>Treisman, A. (1985). "Preattentive Processing in Vision". Computer Vision, Graphics, and Image Processing, 31, (2), 156-177. <a href="https://doi.org/10.1016/S0734-189X(85)80004-9">https://doi.org/10.1016/S0734-189X(85)80004-9</a>.</li><br/>
                    <li>Triesman, A. and Gormican, S. (1988). "Feature analysis in early vision: Evidence from search asymmetries". Psychological Review 95 (1), 15-48. <a href="http://www2.psychology.uiowa.edu/faculty/hollingworth/prosem/Treisman_Gormican_88_PR_FeatureAnalysisIn.pdf">http://www2.psychology.uiowa.edu/faculty/hollingworth/prosem/Treisman_Gormican_88_PR_FeatureAnalysisIn.pdf</a>.</li><br/>
                    <li>Wolfe, J. and Friedman-Hill, S. (1992). "Visual Search for Oriented Lines: The role of angular relations between targets and distractors". Spatial Vision 76 (3), 199-207. <a href="https://doi.org/10.1163/156856892X00082">https://doi.org/10.1163/156856892X00082</a>.</li><br/>
                </ul>
            </div>
            <a href="https://github.com/hemanrobinson/preattentive/">Code Shared on GitHub</a>
        </div>
    );
}

export default App;
