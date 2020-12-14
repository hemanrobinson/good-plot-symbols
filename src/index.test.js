import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Mocks react-dom and its render method
// so that we can assert that render is
// called with <App /> and HTML element with id = root.
// See https://joaoforja.com/blog/how-to-test-a-rect-app-indexjs/.
jest.mock( "react-dom", () => ({ render: jest.fn()}))

test( "renders with App and root div", () => {
    
    // Create and append to document body an HTML element with id = root.
    const root = document.createElement( "div" );
    root.id = "root";
    document.body.appendChild( root );

    // Require index.js so that react-dom render method is called.
    require( "./index.js" );

    // Assert render was called with <App /> and HTML element with id = root.
    expect( ReactDOM.render ).toHaveBeenCalledWith( <React.StrictMode><App /></React.StrictMode>, root );
});
