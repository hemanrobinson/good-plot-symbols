import { act, render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

let container;

beforeEach(() => {
    container = document.createElement( "div" );
    document.body.appendChild( container );
});

afterEach(() => {
    document.body.removeChild( container );
    container = null;
});

it( "renders App with childnodes", () => {
    
    // Test first render and componentDidMount
    act(() => {
        ReactDOM.render(<App />, container );
    });
    
    // Test structure.
    const div = container.querySelector( "div" );
    expect( div.className ).toBe( "Column" );
    let controls = div.childNodes[ 1 ];
    expect( controls.childNodes.length ).toBe( 6 );
    for( let i = 0; ( i < 3 ); i++ ) {
        let label = controls.childNodes[ 2 * i ];
        expect( label.nodeName ).toBe( "LABEL" );
        let slider = controls.childNodes[ 2 * i + 1 ];
        expect( slider.className ).toMatch( /Slider/ );
    }
});
