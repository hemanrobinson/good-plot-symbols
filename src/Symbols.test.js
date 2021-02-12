import Symbols from './Symbols';

it( "creates a symbol set", () => { 
    expect( Symbols.pSymbols ).toEqual([ Symbols.pSymbolCircle, Symbols.pSymbolPlus, Symbols.pSymbolX, Symbols.pSymbolTriangle, Symbols.pSymbolAsterisk, Symbols.pSymbolSquare, Symbols.pSymbolDiamond ]);
});
