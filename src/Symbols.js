/**
 * Popular symbols with preattentive features to improve pattern detection.
 *
 * These symbols have approximately equal weight, though this can always be tweaked.
 *
 * Symbols are centered at (0,0).  When translating,
 * round to the center of the pixel to minimize anti-aliasing, e.g.
 *      .attr( "transform", "translate( " + ( Math.floor( x ) + 0.5 ) + ", " + ( Math.floor( y ) + 0.5 ) + " )" )
 *
 * @param  {Object}  props  properties
 * @return component
 */
const Symbols = () => {
}
    
/**
 * Circle.
 */
Symbols.pSymbolCircle = {
    draw: function( g, size ) { if( size > 0 ) {
        let s = Math.sqrt( size / Math.PI );                // radius
        g.arc( 0, 0, s, 0, 2 * Math.PI );
        g.closePath();
    }}
};

/**
 * Plus.
 */
Symbols.pSymbolPlus = {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = Math.max( 1.5, r * Math.PI / 2 - 0.25 );    // -0.25 accounts for center pixel.
        g.moveTo( -s,  0 );
        g.lineTo(  s,  0 );
        g.closePath();
        g.moveTo(  0,  s );
        g.lineTo(  0, -s );
        g.closePath();
    }}
};

/**
 * X.
 */
Symbols.pSymbolX = {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = r * Math.PI / 2 + 0.25;                     // +0.25 accounts for center pixel and line width.
        let t = Math.max( 1, s / Math.SQRT2 );
        g.moveTo( -t, -t );
        g.lineTo(  t,  t );
        g.closePath();
        g.moveTo( -t,  t );
        g.lineTo(  t, -t );
        g.closePath();
    }}
};

/**
 * Triangle.
 */
Symbols.pSymbolTriangle = {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = r * Math.PI / 3 + 0.5;                      // +0.5 accounts for overlap.
        let t = s * Math.sin( Math.PI / 6 ),
            u = s * Math.cos( Math.PI / 6 );
        g.moveTo(  0, -s );
        g.lineTo(  u,  t );
        g.lineTo( -u,  t );
        g.closePath();
    }}
};

/**
 * Asterisk.
 */
Symbols.pSymbolAsterisk = {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = Math.max( 1.5, r * Math.PI / 3 + 0.5 );     // +0.5 accounts for overlap.
        let t = s * Math.sin( Math.PI / 6 ),
            u = s * Math.cos( Math.PI / 6 );
        g.moveTo(  0,  s );
        g.lineTo(  0, -s );
        g.closePath();
        g.moveTo( -u, -t );
        g.lineTo(  u,  t );
        g.closePath();
        g.moveTo( -u,  t );
        g.lineTo(  u, -t );
        g.closePath();
    }}
};

/**
 * Square.
 */
Symbols.pSymbolSquare = {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = r * Math.PI / 4 + 0.25;                     // +0.25 accounts for overlap.
        g.moveTo(  s,  s );
        g.lineTo(  s, -s );
        g.lineTo( -s, -s );
        g.lineTo( -s,  s );
        g.closePath();
    }}
};

/**
 * Diamond.
 */
Symbols.pSymbolDiamond = {
    draw: function( g, size ) { if( size > 0 ) {
        let r = Math.sqrt( size / Math.PI );                // radius
        let s = r * Math.PI / ( 2 * Math.SQRT2 ) + 0.5;     // +0.5 accounts for overlap.
        let t = 1 / ( 2 * Math.SQRT2 );                     // t accounts for line width.
        g.moveTo(      -t, - s - t );
        g.lineTo(   s + t,       t );
        g.closePath();
        g.moveTo(   s + t,      -t );
        g.lineTo(      -t,   s + t );
        g.closePath();
        g.moveTo(       t,   s + t );
        g.lineTo( - s - t,      -t );
        g.closePath();
        g.moveTo( - s - t,       t );
        g.lineTo(       t, - s - t );
        g.closePath();
    }}
};

/**
 * Popular symbol set with preattentive features.
 */
Symbols.pSymbols = [ Symbols.pSymbolCircle, Symbols.pSymbolPlus, Symbols.pSymbolX, Symbols.pSymbolTriangle, Symbols.pSymbolAsterisk, Symbols.pSymbolSquare, Symbols.pSymbolDiamond ];
    
export default Symbols;
