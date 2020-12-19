import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import Data from './Data';
import Symbols from './Symbols';
import './Plot.css';

// Scatter plot in an SVG element.
const Plot = ( props ) => {
    
    // Create reference and scales.
    const padding = 20, marginAxis = 40, marginLegend = 100, height = 400, width = 400;
    let ref = useRef(),
        { symbolSet, dataSet, size } = props,
        data = Data.getValues( dataSet ),
        scale = ( dataSet === "Business" ) ? d3.scaleLog : d3.scaleLinear,
        xScale = scale().domain([ d3.min( data, d => d[ 2 ]), d3.max( data, d => d[ 2 ])]).range([ marginAxis + padding, width - padding ]),
        yScale = scale().domain([ d3.min( data, d => d[ 1 ]), d3.max( data, d => d[ 1 ])]).range([ height - marginAxis - padding, padding ]);
    
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
    let data = Data.getValues( dataSet ),
        columnNames = Data.getColumnNames( dataSet );
    svg.selectAll( "*" ).remove();
    
    // Choose the symbol scale.
    let symbols = ( symbolSet === "geometric" ) ? d3.symbols : Symbols.symbols,
        symbolScale = d3.scaleOrdinal( data.map( datum => datum[ 0 ]), symbols.map( s => d3.symbol().type( s ).size( size )()));
    
    // Draw the points.
    data.forEach(( datum ) => {
        svg.append( "path" )
        .attr( "d", symbolScale( datum[ 0 ]))
        .attr( "transform", d => "translate( " + Math.round( xScale( datum[ 2 ])) + ", " + Math.round( yScale( datum[ 1 ])) + " )" )
        .style( "fill", "none" )
        .style( "stroke", "black" );
    });
    
    // Draw the X axis.
    svg.append( "g" )
        .attr( "class", "axis" )
        .attr( "transform", "translate( 0, " + ( height - marginAxis ) + " )" )
        .call( d3.axisBottom( xScale ).ticks( 2.5 ).tickFormat(( x ) => { return x.toFixed( 0 )}));
    svg.append( "text" )
        .attr( "transform", "translate( " + ( width / 2 ) + " ," + ( height - padding / 2 ) + ")" )
        .style( "text-anchor", "middle" )
        .text( columnNames[ 2 ]);
        
    // Draw the Y axis.
    svg.append( "g" )
        .attr( "class", "axis" )
        .attr( "transform", "translate( " + marginAxis + ", 0 )" )
        .call( d3.axisLeft( yScale ).ticks(( dataSet === "Business" ) ? 2 : 3 ).tickFormat(( x ) => { return x.toFixed( 0 )}));
    svg.append( "text" )
        .attr( "transform", "rotate( -90 )" )
        .attr( "x", -height / 2 )
        .attr( "y", padding * 0.75 )
        .style( "text-anchor", "middle" )
        .text( columnNames[ 1 ]);
        
    // Draw the legend.
    const domain = symbolScale.domain(),
        n = domain.length,
        d = 20,
        x = width + marginAxis,
        y = ( height + marginAxis - d * n ) / 2;
    svg.append( "text" )
        .attr( "x", x - d )
        .attr( "y", y - d )
        .text( columnNames[ 0 ]);
    for( let i = 0; ( i < n ); i++ ) {
        svg.append( "text" )
            .attr( "x", x )
            .attr( "y", y + d * i )
            .text( domain[ i ]);
        svg.append( "path" )
            .attr( "d", symbolScale( domain[ i ]))
            .attr( "transform", "translate( " + ( x - 12 ) + ", " + ( y + d * i - 4 ) + " )" )
            .style( "fill", "none" )
            .style( "stroke", "black" );
    };
};

export default Plot;
