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
    
    // Test first render and componentDidMount.
    act(() => {
        ReactDOM.render(<App />, container );
    });
    
    // Test structure.
    const div = container.querySelector( "div" );
    expect( div.className ).toBe( "Column" );
    expect( div.childNodes.length ).toBe( 3 );
    expect( div.childNodes[ 0 ].className ).toBe( "GridPlots" );
    expect( div.childNodes[ 1 ].className ).toBe( "GridControls" );
    expect( div.childNodes[ 2 ].className ).toBe( "Description" );
    let controls = div.childNodes[ 1 ];
    expect( controls.childNodes[ 0 ].nodeName ).toBe( "LABEL" );
    expect( controls.childNodes[ 1 ].nodeName ).toBe( "SPAN" );
    expect( controls.childNodes[ 2 ].nodeName ).toBe( "LABEL" );
    expect( controls.childNodes[ 3 ].nodeName ).toBe( "DIV" );
});
