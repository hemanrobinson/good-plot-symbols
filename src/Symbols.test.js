import Symbols from './Symbols';

it( "creates a symbol set", () => {
    expect( Symbols.symbols ).toEqual([ Symbols.symbolCircle, Symbols.symbolPlus, Symbols.symbolX, Symbols.symbolTriangle, Symbols.symbolAsterisk, Symbols.symbolSquare ]);
});
