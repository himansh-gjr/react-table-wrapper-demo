import React, { useEffect, useMemo } from "react"
import {
	useExpanded,
	useRowSelect,
	useSortBy,
	useTable,
	usePagination,
} from "react-table/dist/react-table.development"
import classnames from "classnames"
import PropTypes from "prop-types"
import { DEFAULT_TABLE_ID } from "./constants"
import "./table.css"

const Table = ({
	id,
	showPagination,
	useManualSorting,
	useManualPagination,
	pageCount: controlledPageCount,
	sortBy,
	updateColProps,
	className,
	showSelect,
	loading,
	EmptyStates,
	PaginationComponent,
	LoaderScreen,
	Checkbox,
	setSelectedRows,
	hideHeader,
	SortIcon,
	onPageChangeCallback,
	...props
}) => {
	/**
	 * recommended to use useMemo hook for the columns
	 * if your component re-renders then a new columns array will be created
	 * to optimizse and re-calculate all the underlying logic again, we use useMemo hook and memorize the cloumns
	 * we can always re-render/re-calculate the columns array by passing the depend variable on in the dependency array of the 'useMemo' hook
	 */
	const columns = useMemo(() => props.columns, [sortBy, ...updateColProps])
	// Data that needs to render inside the table
	const data = props.data

	/**
	 * required to use useTable hook from react-table to a table instance
	 * data and columns are the required props, rest are additional requirement props like for sorting, pagination and filter
	 */
	const tableInstance = useTable(
		{
			columns,
			data,
			autoResetExpanded: false,
			disableSortBy: useManualSorting,
			manualPagination: useManualPagination,
			initialState: {
				pageIndex: 0,
				pageSize: 21,
			},
			pageCount: controlledPageCount,
		},
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		/**
		 * custom hook that is responsible to render a selection checkbox on both header and on each row
		 */
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				let defaultSelection = {
					id: "selection",
					align: "left",
					width: 15,
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<Checkbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),

					Cell: ({ row }) => (
						<div>
							<Checkbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				}
				let hasCustomSelection = columns.findIndex((c) => c.id === "selection")

				if (hasCustomSelection < 0) {
					columns.unshift(defaultSelection)
				}

				if (!showSelect) {
					columns = columns.filter((col) => col.id !== "selection")
				}
				return columns
			})
		}
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		/**
		 * Instead of using 'rows', we'll use page
		 * which has only the rows for the active page
		 */
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = tableInstance

	/**
	 * selectedFlatRows contains all the selected rows from the active table rows
	 * we call setSelectedRows callback everytime selectedFlatRows updates
	 */
	useEffect(() => {
		setSelectedRows && setSelectedRows(selectedFlatRows, id)
	}, [selectedFlatRows, id])

	/**
	 * page contains the current active/displayed rows if pagination is enabled
	 * rows contains array of all rows
	 * we decide to choose between these two based on the pagination is enabled or not
	 */
	const visibleRows = showPagination && !useManualPagination ? page : rows

	return (
		<div className={className} id={id}>
			{loading && <LoaderScreen />}
			<table {...getTableProps()}>
				<thead
					className=""
					style={{
						visibility: hideHeader && pageIndex === 0 ? "collapse" : "unset",
					}}
				>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()} className="expanded_table_tr">
							{headerGroup.headers.map((column) => {
								return (
									<th
										{...column.getHeaderProps(column.getSortByToggleProps())}
										className="d-button"
										style={{
											textAlign: column.align || "right",
											cursor: "pointer",
											width: column.width,
										}}
									>
										{column.canSort ? (
											<div
												className="d-button"
												style={{
													display: "flex",
													alignItems: "center",
													gap: "var(--extra-tight-spacing)",
													justifyContent:
														column.align === "left"
															? "start"
															: column.align === "center"
															? "center"
															: "end",
													cursor: "pointer",
												}}
											>
												{column.render("Header")}
												{column.canSort && <img src={SortIcon} />}
											</div>
										) : (
											column.render("Header")
										)}
									</th>
								)
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{visibleRows.map((row, i) => {
						prepareRow(row)
						return (
							<React.Fragment key={i}>
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps()}
												className={`${
													cell.column.align !== "left" &&
													(cell.column.manualSorting ||
														cell.column.canSort) &&
													"sort-padding"
												}`}
												style={{
													textAlign: cell.column.align || "right",
													width: cell.column.width,
												}}
											>
												{cell.render("Cell")}
											</td>
										)
									})}
								</tr>
							</React.Fragment>
						)
					})}
				</tbody>
			</table>
			{visibleRows.length === 0 && !loading && <>{EmptyStates}</>}
			{(canNextPage || canPreviousPage) && showPagination && (
				<div className="pagination flex justify-between">
					<span className="d-body" style={{ color: "var(--dark-light)" }}>
						Showing page {pageIndex + 1} of {pageOptions.length}
					</span>
					<div className="flex justify-between prev_next_section">
						<div className="pagination_nav_section">
							<label
								className={classnames(
									"d-button prev-button",
									!canPreviousPage && "disabled"
								)}
								onClick={() => {
									previousPage()
									onPageChangeCallback(pageIndex + 1)
								}}
							>
								Prev
							</label>
							<PaginationComponent
								currentPage={pageIndex + 1}
								totalCount={data.length}
								pageSize={pageSize}
								totalPageCount={pageCount}
								onPageChange={(page) => {
									gotoPage(page - 1)
									onPageChangeCallback(page)
								}}
							/>
							<label
								className={classnames(
									"d-button next-button",
									!canNextPage && "disabled"
								)}
								onClick={() => {
									nextPage()
									onPageChangeCallback(pageIndex + 1)
								}}
							>
								Next
							</label>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

Table.prototype = {
	id: PropTypes.string, // id attribute to distinguish between multiple table container
	className: PropTypes.string, // custom className attribute for the table container
	showPagination: PropTypes.bool, // set 'true' if you want to show pagination on the table
	useManualPagination: PropTypes.bool, // 'true' if you wish to use pagination on your custom implementaion of pagination
	useManualSorting: PropTypes.bool, // set to 'true' if you want to implement your own sorting and not the sorting that react table provides out of the box
	pageCount: PropTypes.number, // this feild is required in order to work with the pagination component only if showPagination is set to true
	sortBy: PropTypes.shape({
		sort: PropTypes.string,
		type: PropTypes.string,
	}), // custom sorting object
	/**
	 * we will receive this 'updateColProps' as an dependency array for 'columns' prop in the useMemo hook
	 */
	updateColProps: PropTypes.array,
	showSelect: PropTypes.bool, // to enable row selection on the table
	loading: PropTypes.bool, // renders a loading screen if it is true
	LoaderScreen: PropTypes.elementType, // loading screen react component
	EmptyStates: PropTypes.element, // empty state react component
	PaginationComponent: PropTypes.elementType, // react component that is responsible to render UI of the pagination and in it's props we will provide all the hanlders that pagination needs like : pageIndex, pageCount, onPageChange.
	/**
	 * when showSelect is set to 'true'
	 * our table renders a selection component that we receive from this prop
	 */
	Checkbox: PropTypes.elementType,
	setSelectedRows: PropTypes.func, // callback function that accepts all the selected rows and id as arguments
	hideHeader: PropTypes.bool, // handy in the cases where we wish to hide the header of our table
	SortIcon: PropTypes.any, // Sort Icon that we need to display in the header
	onPageChangeCallback: PropTypes.func, // callback that will accept current pageIndex as an argument and will trigger on every page change of pagination
	data: PropTypes.array, // data that table needs to render
	columns: PropTypes.array, // columns for table
}

/**
 * Set deatult Props for the component
 */
Table.defaultProps = {
	id: DEFAULT_TABLE_ID,
	showPagination: false,
	useManualSorting: false,
	useManualPagination: false,
	pageCount: 0,
	sortBy: "",
	updateColProps: [],
	className: "table_container",
	showSelect: true,
	loading: false,
	hideHeader: false,
	onPageChangeCallback: () => {},
}

export default Table