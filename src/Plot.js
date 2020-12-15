import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import Data from './Data';
import './Plot.css';

// Scatter plot in an SVG element.
const Plot = ( props ) => {
    
    // Create reference and scales.
    const width = 400, height = 400;
    let ref = useRef(),
        { symbols, dataSet } = props,
        data = Data.getValues( dataSet ),
        xMin = d3.min( data, d => d[ 2 ]),
        xMax = d3.max( data, d => d[ 2 ]),
        yMin = d3.min( data, d => d[ 1 ]),
        yMax = d3.max( data, d => d[ 1 ]),
        xScale = d3.scaleLinear().domain([ xMin, xMax ]).range([ 0, width ]),
        yScale = d3.scaleLinear().domain([ yMin, yMax ]).range([ height, 0 ]);
    
    // Hook to draw on mounting, or on any other lifecycle update.
    useEffect(() => {
        Plot.draw( height, ref, xScale, yScale, symbols, dataSet );
    });
    
    // Return the component.
    return <svg width={width} height={height} ref={ref}></svg>;
};

// Draws the points.
Plot.draw = ( height, ref, xScale, yScale, symbols, dataSet ) => {
    
    // Draw the points.  +0.5 minimizes anti-aliasing.
    const svg = d3.select( ref.current ),
        size = 4;
    
    let data = Data.getValues( dataSet );
    let symbol = d3.scaleOrdinal( data.map( datum => datum[ 0 ]), d3.symbols.map( s => d3.symbol().type( s )()));
    
    svg.selectAll( "*" ).remove();
    data.forEach(( datum ) => {
        svg.append( "path" )
        .attr( "d", symbol( datum[ 0 ]))
        .attr( "transform", d => `translate( ${ Math.round( xScale( datum[ 2 ]) + 0.5 )}, ${ Math.round( yScale( datum[ 1 ]) + 0.5 )})` )
        .attr( "r", size / 2 )
        .style( "fill", "none" )
        .style( "stroke", "black" );
    });
};

export default Plot;
