import React, { useEffect, useState } from "react"
import Table from "./table/Table"
import MOCK_DATA from "./MOCK_DATA.json"
import EmptyStates from "./components/empty-states/EmptyStates"
import Pagination from "./components/pagination"
import LoaderScreen from "./components/LoaderScreen/LoaderScreen"
import Checkbox from "./components/checkbox/index"
import SortIcon from "./assets/image/sort.png"

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
		align:"right"
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

// const [sortBy, setSortBy] = useState({
//     sort: "search_volume",
//     type: DESC,
//   });

// disable sort by on each row ....

const renderEmptyState = (row) => {
	return (
		<tr>
			<td
				colSpan={8}
				style={{
					background: "white",
					paddingLeft: "5rem",
					paddingRight: "0rem",
				}}
			>
				<div className="empty_block">
					<div className="d-caption">You don't have any data</div>
				</div>
			</td>
		</tr>
	)
}

const PAGE_SIZE = 20

const DemoTable = () => {

	const [pageCount, setPageCount] = useState(0)

	useEffect(()=>{
		setPageCount(Math.ceil(MOCK_DATA.length/PAGE_SIZE))
	},[MOCK_DATA])

	return (
		<div>
			<Table
				showEmptyState={true}
				emptyState={renderEmptyState}
				showPagination={true}
				className="table_container"
				showSelect={true}
				loading={false}
				data={MOCK_DATA}
				columns={Colums()}
				EmptyStates={<EmptyStates message={"No Data Found"} />}
				updateColProps={[]}
				PaginationComponent={PaginationComponent}
				LoaderScreen={LoaderScreen}
				Checkbox={Checkbox}
				SortIcon={SortIcon}
				pageCount={pageCount}
				onPageChangeCallback={(page)=>{}}
			/>
		</div>
	)
}

const PaginationComponent = ({
	currentPage,
	totalCount,
	pageSize,
	totalPageCount,
	onPageChange,
}) => {
	return (
		<Pagination
			currentPage={currentPage}
			totalCount={totalCount}
			pageSize={pageSize}
			totalPageCount={totalPageCount}
			onPageChange={onPageChange}
		/>
	)
}

export default DemoTable