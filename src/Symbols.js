// Equally weighted symbols with preattentive features.
const Symbols = () => {
}
    
// Circle.
Symbols.symbolCircle = {
    draw: function( g, size ) {
        let s = ( size === 0 ) ? 0 : Math.sqrt( size / Math.PI );                           // matches d3.symbolCircle
        g.arc( 0, 0, s, 0, 2 * Math.PI );
        g.closePath();
    }
};

// Plus.
Symbols.symbolPlus = {
    draw: function( g, size ) {
        let s = Math.sqrt( size / Math.PI );
        s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 2 - 0.25 );                      // -0.25 accounts for center pixel.
        g.moveTo( -s,  0 );
        g.lineTo(  s,  0 );
        g.moveTo(  0, -s );
        g.lineTo(  0,  s );
        g.closePath();
    }
};

// X.
Symbols.symbolX = {
    draw: function( g, size ) {
        let s = Math.sqrt( size / Math.PI );
        s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / ( 2 * Math.SQRT2 ) - 0.25 );     // -0.25 accounts for center pixel.
        g.moveTo( -s, -s );
        g.lineTo(  s,  s );
        g.closePath();
        g.moveTo( -s,  s );
        g.lineTo(  s, -s );
        g.closePath();
    }
};

// Triangle.
Symbols.symbolTriangle = {
    draw: function( g, size ) {
        let s = Math.sqrt( size / Math.PI );
        s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 3 + 1 );                         // +1 accounts for overlap.
        let t = Math.round( s * Math.sin( Math.PI / 6 )),
            u = Math.round( s * Math.cos( Math.PI / 6 ));
        g.moveTo(  0, -s );
        g.lineTo(  u,  t );
        g.lineTo( -u,  t );
        g.closePath();
    }
};

// Asterisk.
Symbols.symbolAsterisk = {
    draw: function( g, size ) {
        let s = Math.sqrt( size / Math.PI );
        s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 3 + 1 );                         // +1 accounts for overlap.
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
};

// Square.
Symbols.symbolSquare = {
    draw: function( g, size ) {
        let s = Math.sqrt( size / Math.PI );
        s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / 4 ) + 0.5;                       // +0.5 minimizes anti-aliasing.
        g.moveTo(  s,  s );
        g.lineTo(  s, -s );
        g.lineTo( -s, -s );
        g.lineTo( -s,  s );
        g.closePath();
    }
};

// Diamond.
Symbols.symbolDiamond = {
    draw: function( g, size ) {
        let s = Math.sqrt( size / Math.PI );
        s = ( size === 0 ) ? 0 : Math.round( s * Math.PI / ( 2 * Math.SQRT2 ) + 0.25 );     // +0.25 accounts for center pixel.
        s -= 0.5;                                                                           // 0.5 draws to center of pixels
        g.moveTo( 0.5, -s );
        g.lineTo( s, -0.5 );
        g.closePath();
        g.moveTo( s, -0.5 );
        g.lineTo( 0.5, s - 1 );
        g.closePath();
        g.moveTo( 0.5, s - 1 );
        g.lineTo( 1 - s, -0.5 );
        g.closePath();
        g.moveTo( 1 - s, -0.5 );
        g.lineTo( 0.5, -s );
        g.closePath();
    }
};

// Symbol set.
Symbols.symbols = [ Symbols.symbolCircle, Symbols.symbolPlus, Symbols.symbolX, Symbols.symbolTriangle, Symbols.symbolAsterisk, Symbols.symbolSquare, Symbols.symbolDiamond ];
    
export default Symbols;
