import Data from './Data';

it( "returns column names", () => {
    expect( Data.getColumnNames()).toEqual([ "Species", "Sepal Length (cm)", "Sepal Width (cm)", "Petal Length (cm)", "Petal Width (cm)" ]);
    expect( Data.getColumnNames( "Iris" )).toEqual([ "Species", "Sepal Length (cm)", "Sepal Width (cm)", "Petal Length (cm)", "Petal Width (cm)" ]);
    expect( Data.getColumnNames( "Business" )).toEqual([ "Industry", "Sales ($M)", "Employees" ]);
    expect( Data.getColumnNames( "Cytometry" )).toEqual([ "Cluster", "Prin 1", "Prin 2" ]);
});

it( "returns values", () => {
    expect( Data.getValues().length ).toBe( 150 );
    expect( Data.getValues( "Iris" ).length ).toBe( 150 );
    expect( Data.getValues( "Business" ).length ).toBe( 88 );
    expect( Data.getValues( "Cytometry" ).length ).toBe( 500 );
});

