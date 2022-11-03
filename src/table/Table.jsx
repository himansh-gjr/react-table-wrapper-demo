import React, { useEffect, useMemo } from "react"
import "./table.css"
import {
	useExpanded,
	useRowSelect,
	useColumnOrder,
	useSortBy,
	useTable,
	usePagination,
} from "react-table/dist/react-table.development"
import classnames from "classnames"
import PropTypes from "prop-types"
import { DEFAULT_TABLE_ID } from "./constants"

const Table = ({
	id, //
	showPagination,
	useManualSorting,
	useManualPagination,
	pageCount: controlledPageCount,
	sortBy,
	updateColProps,
	className,
	showSelect,
	loading,
	EmptyStates, // react component
	PaginationComponent, // react component
	LoaderScreen, // react component
	Checkbox, // react component
	setSelectedRows,
	hideHeader,
	SortIcon, //icon
	onPageChangeCallback,
	...props
}) => {
	const columns = useMemo(() => props.columns, [sortBy, ...updateColProps])
	const data = props.data

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
		useColumnOrder,
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
		// useBlockLayout
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		visibleColumns,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setColumnOrder,
		setHiddenColumns,
		allColumns,
		state: {
			pageIndex,
			pageSize,
			// expanded,
			hiddenColumns,
		},
	} = tableInstance

	useEffect(() => {
		setSelectedRows && setSelectedRows(selectedFlatRows, id)
	}, [selectedFlatRows, id])

	const visibleRows = showPagination && !useManualPagination ? page : rows // show pagination but don't use manualPagination then

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
	id: PropTypes.string,
	showPagination: PropTypes.bool,
	useManualSorting: PropTypes.bool,
	useManualPagination: PropTypes.bool,
	pageCount: PropTypes.number,
	sortBy: PropTypes.shape({
		sort: PropTypes.string,
		type: PropTypes.string,
	}),
	updateColProps: PropTypes.array,
	className: PropTypes.string,
	showSelect: PropTypes.bool,
	loading: PropTypes.bool,
	EmptyStates: PropTypes.element,
	PaginationComponent: PropTypes.elementType,
	LoaderScreen: PropTypes.elementType,
	Checkbox: PropTypes.elementType,
	setSelectedRows: PropTypes.func,
	hideHeader: PropTypes.bool,
	SortIcon: PropTypes.any,
	onPageChangeCallback: PropTypes.func,
	data: PropTypes.array,
	columns: PropTypes.array,
}

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