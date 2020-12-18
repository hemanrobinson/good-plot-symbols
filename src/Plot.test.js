import React from 'react';
import ReactDOM from 'react-dom';

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Plot from './Plot';

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
        render( <svg width="400" height="400" />, container );
    });
    expect( container.childNodes.length ).toBe( 1 );
    let svg = container.firstChild;
    expect( svg.nodeName ).toBe( "svg" );
});
