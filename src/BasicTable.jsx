import React from "react"
import Table from "./table/Table"
import MOCK_DATA from "./MOCK_DATA.json"

const Colums = () => [
	{
		Header: "id",
		accessor: "id",
		Cell: ({ row }) => <p>{row.original.id}</p>,
        align:"left"
	},
	{
		Header: "first_name",
		accessor: "first_name",
		Cell: ({ row }) => <p>{row.original.first_name}</p>,
        align:"left"
	},
	{
		Header: "last_name",
		accessor: "last_name",
		Cell: ({ row }) => <p>{row.original.last_name}</p>,
        align:"left"
	},
	{
		Header: "date",
		accessor: "date",
		Cell: ({ row }) => <p>{row.original.date}</p>,
        align:"left"
	},
]

const BasicTable = () => {
	return (
		<div>
			<Table
				showSelect={false}
				data={MOCK_DATA.slice(0,20)}
				columns={Colums()}
                useManualSorting={true}
			/>
		</div>
	)
}

export default BasicTable