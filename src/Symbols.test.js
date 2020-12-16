import Symbols from './Symbols';

let container = null;

// Sets up a DOM element as a render target.
beforeEach(() => {
    container = document.createElement( "div" );
    document.body.appendChild( container );
});

// Cleans up on exit.
afterEach(() => {
    unmountComponentAtNode( container );
    container.remove();
    container = null;
});

it( "creates an svg element", () => {
    act(() => {
        render( <canvas width="400" height="400" />, container );
    });
    expect( container.childNodes.length ).toBe( 1 );
    let canvas = container.firstChild;
    expect( canvas.nodeName ).toBe( "SVG" );
});
