import Data from './Data';

it( "returns column names", () => {
    expect( Data.getColumnNames()).toEqual([ "Species", "Sepal Length (cm)", "Sepal Width (cm)", "Petal Length (cm)", "Petal Width (cm)" ]);
    expect( Data.getColumnNames( "Iris" )).toEqual([ "Species", "Sepal Length (cm)", "Sepal Width (cm)", "Petal Length (cm)", "Petal Width (cm)" ]);
    expect( Data.getColumnNames( "Business" )).toEqual([ "Industry", "Sales ($M)", "Employees" ]);
    expect( Data.getColumnNames( "Rice" )).toEqual([ "Cluster", "Panicle weight (g)", "Panicle length (cm)", "NS", "NFS", "FG (%)", "HG W (g)", "YLD (g/plant)", "PH (cm)", "NT", "NFT", "Name" ]);
});

it( "returns values", () => {
    expect( Data.getValues().length ).toBe( 150 );
    expect( Data.getValues( "Iris" ).length ).toBe( 150 );
    expect( Data.getValues( "Business" ).length ).toBe( 95 );
    expect( Data.getValues( "Rice" ).length ).toBe( 100 );
});

