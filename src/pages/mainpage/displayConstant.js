// MARK - the constant used for displaying

const customer =['ID','Name','Postal','Address','Telephone','Contactor','Contactor Phone','Bank','Bank Account','Email','Fax','Status'];
const supplyer =['ID','Name','Postal','Address','Telephone','Contactor','Contactor Phone','Bank','Bank Account','Email','Fax','Status'];

const imports =['ID','Supplyer ID','Payment Method','Time','Operator','Quantity','Note','SKU'];
const importsreturn =['ID','Supplyer ID','Payment Method','Time','Operator','Quantity','Note','SKU'];
const sales =['ID','Customer ID','Payment Method','Time','Operator','Quantity','Note','SKU'];
const salesreturn =['ID','Customer ID','Payment Method','Time','Operator','Quantity','Note','SKU'];

const goods =['ID','Name','Origin','Standard','Package','Batch','Approval','Note','Price','Supplyer ID','Status'];
const inventory =['ID','SKU','Stock'];

const displayList = {
    'customer':customer,
    'imports':imports,
    'importsreturn':importsreturn,
    'supplyer':supplyer,
    'sales':sales,
    'salesreturn':salesreturn,
    'goods':goods,
    'inventory':inventory
}

export default displayList;