import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import Data from './Data';
import Symbols from './Symbols';
import './Plot.css';

// Scatter plot in an SVG element.
const Plot = ( props ) => {
    
    // Create reference and scales.
    const padding = 10, marginAxis = 40, marginLegend = 150, height = 400, width = 400;
    let ref = useRef(),
        { symbolSet, dataSet, size } = props,
        data = Data.getValues( dataSet ),
        xMin = d3.min( data, d => d[ 2 ]),
        xMax = d3.max( data, d => d[ 2 ]),
        yMin = d3.min( data, d => d[ 1 ]),
        yMax = d3.max( data, d => d[ 1 ]),
        xScale = d3.scaleLog().domain([ xMin, xMax ]).range([ marginAxis + padding, width - padding ]),
        yScale = d3.scaleLog().domain([ yMin, yMax ]).range([ height - marginAxis - padding, padding ]);
    
    // Hook to draw on mounting, or on any other lifecycle update.
    useEffect(() => {
        Plot.draw( height, width, marginAxis, padding, ref, xScale, yScale, symbolSet, dataSet, size );
    });
    
    // Return the component.
    return <svg width={( width + marginLegend )} height={height} ref={ref}></svg>;
};
    
// Draws the points.
Plot.draw = ( height, width, marginAxis, padding, ref, xScale, yScale, symbolSet, dataSet, size ) => {
    
    // Initialization.
    const svg = d3.select( ref.current );
    let data = Data.getValues( dataSet );
    let columnNames = Data.getColumnNames( dataSet );
    
    // Choose the symbol set.
    let symbols = ( symbolSet === "geometric" ) ? d3.symbols : Symbols.symbols;
    let radius = ( size === 0 ) ? 0 : size + 0.5;
    let symbolSize = Math.PI * radius * radius;
    let symbolScale = d3.scaleOrdinal( data.map( datum => datum[ 0 ]), symbols.map( s => d3.symbol().type( s ).size( symbolSize )()));
    
    // Draw the points.
    svg.selectAll( "*" ).remove();
    data.forEach(( datum ) => {
        svg.append( "path" )
        .attr( "d", symbolScale( datum[ 0 ]))
        .attr( "transform", d => `translate( ${ Math.round( xScale( datum[ 2 ]))}, ${ Math.round( yScale( datum[ 1 ]))})` )
        .style( "fill", "none" )
        .style( "stroke", "black" );
    });
    
    // Draw the X axis.
    let xAxis = d3.axisBottom( xScale ).ticks( 2.5 ).tickFormat(x => `${x.toFixed(0)}`);
    svg.append( "g" )
        .attr( "class", "axis" )
        .attr( "transform", "translate( 0, " + ( height - marginAxis ) + " )" )
        .call( xAxis );
    svg.append( "text" )
        .attr( "transform", "translate( " + ( width / 2 ) + " ," + ( height - padding ) + ")" )
        .style( "text-anchor", "middle" )
        .style( "font-size", "10px" )
        .text( columnNames[ 2 ]);
        
    // Draw the Y axis.
    let yAxis = d3.axisLeft( yScale ).ticks( 2 ).tickFormat(x => `${x.toFixed(0)}`);
    svg.append( "g" )
        .attr( "class", "axis" )
        .attr( "transform", "translate( " + marginAxis + ", 0 )" )
        .call( yAxis );
    svg.append( "text" )
        .attr( "transform", "rotate( -90 )" )
        .attr( "y", padding / 2 )
        .attr( "x", -height / 2 )
        .attr( "dy", "1em" )
        .style( "text-anchor", "middle" )
        .style( "font-size", "10px" )
        .text( columnNames[ 1 ]);
        
    // Draw the legend.
    let x = width + marginAxis + 3 * padding,
        y = height / 3;
    svg.append( "text" )
        .attr( "x", x )
        .attr( "y", y )
        .style( "font-size", "10px" )
        .text( columnNames[ 0 ]);
    let domain = symbolScale.domain();
    for( let i = 0; ( i < domain.length ); i++ ) {
        svg.append( "text" )
            .attr( "x", x )
            .attr( "y", y + 20 + 20 * i )
            .style( "font-size", "10px" )
            .text( domain[ i ]);
        svg.append( "path" )
            .attr( "d", symbolScale( domain[ i ]))
            .attr( "transform", d => `translate( ${( x - 12 )}, ${( y + 16 + 20 * i )})` )
            .style( "fill", "none" )
            .style( "stroke", "black" );
    };
};

export default Plot;
