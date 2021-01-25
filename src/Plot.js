import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import Data from './Data';
import Symbols from './Symbols';
import './Plot.css';

/**
 * Scatter plot in an SVG element.
 *
 * @param  {Object}  props  properties
 * @return component
 */
const Plot = ( props ) => {
    
    // Create reference and scales.
    const padding = 20, marginAxis = 50, marginLegend = 100, height = 400, width = 400;
    let ref = useRef(),
        { symbolSet, dataSet, size } = props,
        data = Data.getValues( dataSet ),
        scale = ( dataSet === "Business" ) ? d3.scaleLog : d3.scaleLinear,
        xMin = d3.min( data, d => d[ 2 ]),
        xMax = d3.max( data, d => d[ 2 ]),
        yMin = d3.min( data, d => d[ 1 ]),
        yMax = d3.max( data, d => d[ 1 ]),
        xMargin = (( dataSet === "Business" ) ? .2 : .05 ) * ( xMax - xMin ),
        yMargin = (( dataSet === "Business" ) ? .2 : .05 ) * ( yMax - yMin ),
        xScale = scale().domain([ xMin, xMax + xMargin ]).range([ marginAxis + padding, width - padding ]),
        yScale = scale().domain([ yMin, yMax + yMargin ]).range([ height - marginAxis - padding, padding ]);
    
    // Set hook to draw on mounting.
    useEffect(() => {
        Plot.draw( width, height, marginAxis, marginLegend, padding, ref, xScale, yScale, symbolSet, dataSet, size );
    });
    
    // Return the component.
    return <svg width={( width + marginLegend )} height={height} ref={ref}></svg>;
};

/**
 * Draws the points.
 *
 * @param {number}     width       width, in pixels
 * @param {number}     height      height, in pixels
 * @param {number}     marginAxis  margin for axis, in pixels
 * @param {number}     marginLegend  margin for legend, in pixels
 * @param {number}     padding     padding in pixels
 * @param {Array}      ref         reference to SVG element
 * @param {d3.scale*}  xScale      X scale
 * @param {d3.scale*}  yScale      Y scale
 * @param {string}     symbolSet   one of "geometric", "preattentive"
 * @param {Array}      dataSet     one of "Iris", "Business", "Cytometry"
 * @param {number}     size        size in pixels
 */
Plot.draw = ( width, height, marginAxis, marginLegend, padding, ref, xScale, yScale, symbolSet, dataSet, size ) => {
    
    // Initialization.
    const svg = d3.select( ref.current ),
        colorLight = "#ebeeef";
    let data = Data.getValues( dataSet ),
        columnNames = Data.getColumnNames( dataSet );
    svg.selectAll( "*" ).remove();
        
    // Clear the margins.
    svg.append( "rect" )
        .attr( "x", 0 )
        .attr( "y", 0 )
        .attr( "width", width + marginLegend )
        .attr( "height", padding )
        .style( "fill", colorLight );
    svg.append( "rect" )
        .attr( "x", width - padding )
        .attr( "y", 0 )
        .attr( "width", marginLegend + padding )
        .attr( "height", height )
        .style( "fill", colorLight );
    svg.append( "rect" )
        .attr( "x", 0 )
        .attr( "y", height - marginAxis )
        .attr( "width", width )
        .attr( "height", marginAxis )
        .style( "fill", colorLight );
    svg.append( "rect" )
        .attr( "x", 0 )
        .attr( "y", 0 )
        .attr( "width", marginAxis )
        .attr( "height", height )
        .style( "fill", colorLight );
    
    // Choose the symbol scale.
    let symbols = ( symbolSet === "geometric" ) ? d3.symbols : Symbols.symbols,
        symbolScale = d3.scaleOrdinal( data.map( datum => datum[ 0 ]), symbols.map( s => d3.symbol().type( s ).size( size )()));
    
    // Draw the points.
    data.forEach(( datum ) => {
        svg.append( "path" )
        .attr( "d", symbolScale( datum[ 0 ]))
        .attr( "transform", d => "translate( " + ( Math.floor( xScale( datum[ 2 ])) + 0.5 ) + ", " + ( Math.floor( yScale( datum[ 1 ])) + 0.5 ) + " )" )
        .style( "fill", "none" )
        .style( "stroke", "black" );
    });
    
    // Draw the X axis.
    svg.append( "g" )
        .attr( "class", "axis" )
        .attr( "transform", "translate( 0, " + ( height - marginAxis ) + " )" )
        .call( d3.axisBottom( xScale ).ticks( 2.5 ).tickFormat(( x ) => (( dataSet === "Business" ) ? x.toFixed( 0 ) : x )));
    svg.append( "text" )
        .attr( "transform", "translate( " + ( width / 2 ) + " ," + ( height - padding / 2 ) + ")" )
        .style( "text-anchor", "middle" )
        .text( columnNames[ 2 ]);
        
    // Draw the Y axis.
    svg.append( "g" )
        .attr( "class", "axis" )
        .attr( "transform", "translate( " + marginAxis + ", 0 )" )
        .call( d3.axisLeft( yScale ).ticks(( dataSet === "Business" ) ? 2 : 3 ).tickFormat(( x ) => (( dataSet === "Business" ) ? x.toFixed( 0 ) : x )));
    svg.append( "text" )
        .attr( "transform", "rotate( -90 )" )
        .attr( "x", -height / 2 )
        .attr( "y", padding * 0.75 )
        .style( "text-anchor", "middle" )
        .text( columnNames[ 1 ]);
        
    // Draw the legend.
    const domain = symbolScale.domain(),
        d = 20 + 4 * Math.floor( size / 100 );
    let x = width + d / 2 + 4.5,
        y = Math.floor(( height - d * domain.length ) / 2 ) + 0.5;
    svg.append( "text" )
        .attr( "x", x - d - 1 )
        .attr( "y", Math.max( y, y + (( d > 20 ) ? d / 4 : 0 )))
        .text( columnNames[ 0 ]);
    domain.forEach(( item ) => {
        y += d;
        svg.append( "text" )
            .attr( "x", x )
            .attr( "y", y )
            .text( item );
        svg.append( "path" )
            .attr( "d", symbolScale( item ))
            .attr( "transform", "translate( " + ( x - d / 2 ) + ", " + ( y - 3 ) + " )" )
            .style( "fill", "none" )
            .style( "stroke", "black" );
    });
};

export default Plot;
