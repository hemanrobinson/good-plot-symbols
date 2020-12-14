import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import './Plot.css';

// Scatter plot in an SVG element.
const Plot = ( props ) => {
    
    // Create reference and scales.
    const width = 400, height = 400;
    let ref = useRef(),
        { symbols, data } = props,
        xMin = d3.min( data, d => d[ 0 ]),
        xMax = d3.max( data, d => d[ 0 ]),
        yMin = d3.min( data, d => d[ 1 ]),
        yMax = d3.max( data, d => d[ 1 ]),
        xScale = d3.scaleLinear().domain([ xMin, xMax ]).range([ 0, width ]),
        yScale = d3.scaleLinear().domain([ yMin, yMax ]).range([ height, 0 ]);
    
    // Hook to draw on mounting, or on any other lifecycle update.
    useEffect(() => {
        Plot.draw( height, ref, xScale, yScale, symbols, data );
    });
    
    // Return the component.
    return <svg width={width} height={height} ref={ref}></svg>;
};

// Draws the points.
Plot.draw = ( height, ref, xScale, yScale, symbols, data ) => {
    
    // Draw the points.  +0.5 minimizes anti-aliasing.
    const svg = d3.select( ref.current ),
        size = 4;
    
    let symbol = d3.scaleOrdinal( data.map( datum => datum[ 2 ]), d3.symbols.map( s => d3.symbol().type( s )()));
    
    console.log( "##### " + data );
    
    svg.selectAll( "*" ).remove();
    data.forEach(( datum ) => {
        svg.append( "path" )
        .attr( "d", symbol( datum[ 2 ]))
        .attr( "transform", d => `translate( ${ xScale( datum[ 0 ])}, ${ yScale( datum[ 1 ])})` )
//        .attr( "cx", Math.round( xScale( datum[ 0 ]) + 0.5 ))
//        .attr( "cy", Math.round( yScale( datum[ 1 ]) + 0.5 ))
        .attr( "r", size / 2 )
        .style( "fill", "none" )
        .style( "stroke", "black" );
    });
};

export default Plot;
