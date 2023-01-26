import Data from './Data';

it( "executes Data function", () => {
    expect( Data()).toBe( undefined );
});

it( "returns column names", () => {
    expect( Data.getColumnNames()).toEqual([ "Species", "Sepal Length (cm)", "Sepal Width (cm)", "Petal Length (cm)", "Petal Width (cm)" ]);
    expect( Data.getColumnNames( "Iris" )).toEqual([ "Species", "Sepal Length (cm)", "Sepal Width (cm)", "Petal Length (cm)", "Petal Width (cm)" ]);
    expect( Data.getColumnNames( "Business" )).toEqual([ "Industry", "Sales ($M)", "Employees" ]);
    expect( Data.getColumnNames( "Cytometry" )).toEqual([ "Cluster", "Prin 1", "Prin 2" ]);
    expect( Data.getColumnNames( "Decathlon" )).toEqual([ "Country", "100 Meters", "Long Jump", "High Jump", "100 Meter Hurdles" ]);
    expect( Data.getColumnNames( "Random" )).toEqual([ "Smile", "Y", "X"]);
});

it( "returns values", () => {
    expect( Data.getValues().length ).toBe( 150 );
    expect( Data.getValues( "Iris" ).length ).toBe( 150 );
    expect( Data.getValues( "Business" ).length ).toBe( 67 );
    expect( Data.getValues( "Cytometry" ).length ).toBe( 500 );
    expect( Data.getValues( "Decathlon" ).length ).toBe( 50 );
    expect( Data.getValues( "Random" ).length ).toBe( 4980 );
});

