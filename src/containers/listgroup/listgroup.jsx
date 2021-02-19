import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const ListGroup = ({sortChange,loading,data}) => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'title', headerName: 'name', width: 500 },
        {
          field: 'price',
          headerName: 'price',
          type: 'number',
          width: 90,
        },
      ];

    return(
            <div>
            
                {!loading && (
                    <div>
                        <h1>Result Not Fetched</h1>
                    </div>
                )}

                {loading && (
                    <div style={{ height: "80vh", width: '100%' }}>
                        <DataGrid sortModel={() => (typeof data)}
                                  rows={data} 
                                  columns={columns} 
                                  pageSize={10} 
                                  checkboxSelection/>
                    </div>
                )}
            </div>
        )
}

export default ListGroup;