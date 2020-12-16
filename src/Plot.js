import React, { useRef, useEffect }  from 'react';
import * as d3 from 'd3';
import Data from './Data';
import './Plot.css';

// Scatter plot in an SVG element.
const Plot = ( props ) => {
    
    // Create reference and scales.
    const width = 400, height = 400;
    let ref = useRef(),
        { symbolSet, dataSet, size } = props,
        data = Data.getValues( dataSet ),
        xMin = d3.min( data, d => d[ 2 ]),
        xMax = d3.max( data, d => d[ 2 ]),
        yMin = d3.min( data, d => d[ 1 ]),
        yMax = d3.max( data, d => d[ 1 ]),
        xScale = d3.scaleLog().domain([ xMin, xMax ]).range([ 0, width ]),
        yScale = d3.scaleLog().domain([ yMin, yMax ]).range([ height, 0 ]);
    
    // Hook to draw on mounting, or on any other lifecycle update.
    useEffect(() => {
        Plot.draw( height, ref, xScale, yScale, symbolSet, dataSet, size );
    });
    
    // Return the component.
    return <svg width={width} height={height} ref={ref}></svg>;
};

// Draws the points.
Plot.draw = ( height, ref, xScale, yScale, symbolSet, dataSet, size ) => {
    
    // Initialization.
    const svg = d3.select( ref.current );
    let data = Data.getValues( dataSet );
    
    // Preattentive symbols.
    let symbolCircle = {
        draw: function( g, size ) {
            let s = ( size === 0 ) ? 0 : Math.sqrt( size / Math.PI );
            g.arc( 0, 0, s, 0, 2 * Math.PI );
            g.closePath();
        }
    },
    symbolPlus = {
        draw: function( g, size ) {
            let s = Math.sqrt( size / Math.PI );
            s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 2 );
            g.moveTo( -s,  0 );
            g.lineTo(  s,  0 );
            g.moveTo(  0, -s );
            g.lineTo(  0,  s );
            g.closePath();
        }
    },
    symbolX = {
        draw: function( g, size ) {
            let s = Math.sqrt( size / Math.PI );
            s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / ( 2 * Math.SQRT2 ));
            g.moveTo( -s, -s );
            g.lineTo(  s,  s );
            g.closePath();
            g.moveTo( -s,  s );
            g.lineTo(  s, -s );
            g.closePath();
        }
    },
    symbolTriangle = {
        draw: function( g, size ) {
            let s = Math.sqrt( size / Math.PI );
            s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 3 ) + 0.5;
            let t = Math.round( s * Math.sin( Math.PI / 6 )),
                u = Math.round( s * Math.cos( Math.PI / 6 ));
            g.moveTo(  0, -s );
            g.lineTo(  u,  t );
            g.lineTo( -u,  t );
            g.closePath();
        }
    },
    symbolAsterisk = {
        draw: function( g, size ) {
            let s = Math.sqrt( size / Math.PI );
            s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 3 ) + 0.5;
            let t = Math.round( s * Math.sin( Math.PI / 6 )),
                u = Math.round( s * Math.cos( Math.PI / 6 ));
            g.moveTo(  0,  s );
            g.lineTo(  0, -s );
            g.closePath();
            g.moveTo( -u, -t );
            g.lineTo(  u,  t );
            g.closePath();
            g.moveTo( -u,  t );
            g.lineTo(  u, -t );
            g.closePath();
        }
    },
    symbolSquare = {
        draw: function( g, size ) {
            let s = Math.sqrt( size / Math.PI );
            s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 4 ) - 0.5;
            g.moveTo(  s,  s );
            g.lineTo(  s, -s );
            g.lineTo( -s, -s );
            g.lineTo( -s,  s );
            g.closePath();
        }
    };
    
    // Choose the symbol set.
    let symbols = ( symbolSet === "geometric" )
        ? d3.symbols.slice( 0, 6 )
        : [ symbolCircle, symbolPlus, symbolX, symbolTriangle, symbolAsterisk, symbolSquare ];
    let radius = ( size === 0 ) ? 0 : size + 0.5;
    let symbolSize = Math.PI * radius * radius;
    let symbol = d3.scaleOrdinal( data.map( datum => datum[ 0 ]), symbols.map( s => d3.symbol().type( s ).size( symbolSize )()));
    
    // Draw the points.  +0.5 minimizes anti-aliasing.
    svg.selectAll( "*" ).remove();
    data.forEach(( datum ) => {
        svg.append( "path" )
        .attr( "d", symbol( datum[ 0 ]))
//        .attr( "transform", d => `translate( ${ Math.round( xScale( datum[ 2 ]) + 0.5 )}, ${ Math.round( yScale( datum[ 1 ]) + 0.5 )})` )
        .attr( "transform", d => `translate( ${ Math.round( xScale( datum[ 2 ]))}, ${ Math.round( yScale( datum[ 1 ]))})` )
        .style( "fill", "none" )
        .style( "stroke", "black" );
    });
};

export default Plot;
