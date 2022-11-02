import React, { useState } from "react"
import Table from "./table/Table"
import MOCK_DATA from "./MOCK_DATA.json"
import EmptyStates from "./components/empty-states/EmptyStates"
import Pagination from "./table/pagination"
import LoaderScreen from "./components/LoaderScreen/LoaderScreen"
import Checkbox from "./components/checkbox/index"
import SortIcon from "./assets/image/sort.png"

const DATA = [
	{
		keyword: "phrase",
		search_volume: "",
		competition: "",
		cost_per_click: "",
		keyword_intent: "",
		cluster_label: "",
		representative_keyword: false,
		keyPercentage: 100,
		subRows: [
			{
				keyword: "pure diamond ring",
				search_volume: 880,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1772",
				cost_per_click: 0.05,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "beautiful diamond rings",
				search_volume: 720,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1750",
				cost_per_click: 0.06,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "unique diamond rings",
				search_volume: 390,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1747",
				cost_per_click: 0.06,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "fancy diamond rings",
				search_volume: 260,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "-1",
				cost_per_click: 0.11,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "biggest diamond ring",
				search_volume: 140,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1651",
				cost_per_click: 0.05,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "stylish diamond rings",
				search_volume: 140,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1824",
				cost_per_click: 0.05,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "cute diamond rings",
				search_volume: 110,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1660",
				cost_per_click: 0.04,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "biggest diamond ring in the world",
				search_volume: 110,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1650",
				cost_per_click: 0.17,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "sleek diamond rings",
				search_volume: 90,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1443",
				cost_per_click: 0.06,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "contemporary diamond rings",
				search_volume: 90,
				competition: "MEDIUM",
				match_type: "phrase",
				cluster_label: "1227",
				cost_per_click: 0.03,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "chunky diamond rings",
				search_volume: 90,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "711",
				cost_per_click: 0.29,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "beautiful diamond engagement rings",
				search_volume: 70,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1550",
				cost_per_click: 0.1,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "casual diamond rings",
				search_volume: 30,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "999",
				cost_per_click: 0.11,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "unique diamond engagement rings",
				search_volume: 30,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1573",
				cost_per_click: 0.11,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "trendy diamond rings",
				search_volume: 20,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1793",
				cost_per_click: 0.1,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "minimalist diamond ring",
				search_volume: 20,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1368",
				cost_per_click: 0.12,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "exquisite diamond rings",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1750",
				cost_per_click: 0.17,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "flawless diamond ring",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1796",
				cost_per_click: 0.11,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "pretty diamond rings",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1660",
				cost_per_click: 0.15,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "classic diamond ring",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1838",
				cost_per_click: 0.06,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "sparkly diamond ring",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "711",
				cost_per_click: 0.04,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "stunning diamond rings",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1523",
				cost_per_click: 0.08,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "real looking diamond rings",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1514",
				cost_per_click: 0.27,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "modern diamond ring",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1502",
				cost_per_click: 0.17,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "brilliant diamond rings",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1496",
				cost_per_click: 0.07,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
			{
				keyword: "really big diamond rings",
				search_volume: 10,
				competition: "LOW",
				match_type: "phrase",
				cluster_label: "1427",
				cost_per_click: 0.06,
				keyword_intent: "Buy",
				representative_keyword: false,
			},
		],
	},
]

const columns = (handleKeywordDelete, handleSort, key) => {
	return [
		{
			id: "expander",
			width: 35,
			align: "center",
			Header: (props) => {
				if (Object.keys(props?.state?.expanded || {}).length === 0) {
					props?.state?.pageIndex !== 0 && props?.gotoPage && props.gotoPage(0)
				}
				return props?.state?.pageIndex > 0 ? (
					<span {...props.getToggleAllRowsExpandedProps()}>
						<img src={props.expandedDepth > 0 ? <>{'-'}</> : <>{'+'}</>} alt="+" width={20} />
					</span>
				) : (
					<span />
				)
			},
			Cell: ({ row }) =>
				row.depth === 0 ? (
					<span {...row.getToggleRowExpandedProps({})}>
						<img src={row.isExpanded ? <>{'-'}</> : <>{'+'}</>} alt="+" width={20} />
					</span>
				) : (
					<span />
				),
		},
		{
			id: "selection",
			align: "left",
			disableSortBy: true,
			width: 20,
			Header: ({ getToggleAllRowsSelectedProps, state: { pageIndex } }) =>
				pageIndex > 0 ? (
					<div>
						<Checkbox {...getToggleAllRowsSelectedProps()} className="checkbox_mr" />
					</div>
				) : (
					<span />
				),

			Cell: ({ row }) => {
				return (
					<div>
						<Checkbox
							{...row.getToggleRowSelectedProps()}
							className="checkbox_mr"
							disabled={row?.original?.subRows?.length === 0}
						/>
					</div>
				)
			},
		},
		{
			Header: "",
			align: "left",
			accessor: "keyword",
			disableSortBy: true,
			Header: ({
				getToggleAllRowsSelectedProps,
				state: { pageIndex },
				expandedDepth,
				data,
				...props
			}) => {
				const percentageOfKeyword = data[0].keyPercentage
				return (
					<span>{"UI"}</span>				)
			},
			Cell: ({ row, value, flatRows, data, state: { pageIndex }, ...props }) => {
				return(
					<span className="d-body">{"90"}</span>
				)
			},
			width: 200,
		},
		{
			Header: (props) => {
				return (
					<div style={{ float: "right", opacity: key > 0 ? 0 : 1 }}>
						Intent{" "}
						<img
							src={SortIcon}
							onClick={() => {
								handleSort("keyword_intent")
							}}
						/>
					</div>
				)
			},
			align: "right",
			accessor: "keyword_intent",
			manualSorting: true,
			width: 40,
		},
		{
			Header: (props) => {
				return (
					<div style={{ float: "right", opacity: key > 0 ? 0 : 1 }}>
						Search Volume (30d){" "}
						<img
							src={SortIcon}
							onClick={() => {
								handleSort("search_volume")
							}}
						/>
					</div>
				)
			},
			align: "right",
			accessor: "search_volume",
			manualSorting: true,
			width: 150,
			Cell: ({ value }) => (value !== ""),
		},
		{
			Header: (props) => {
				return (
					<div style={{ float: "right", opacity: key > 0 ? 0 : 1 }}>
						CPC{" "}
						<img
							src={SortIcon}
							onClick={() => {
								handleSort("cost_per_click")
							}}
						/>
					</div>
				)
			},
			align: "right",
			accessor: "cost_per_click",
			Cell: ({ value }) => (value ? value : ""),
			manualSorting: true,
			width: 60,
		},
		{
			Header: (props) => (
				<div style={{ justifyContent: "center", opacity: key > 0 ? 0 : 1 }}>
					Competition{" "}
					<img
						src={SortIcon}
						onClick={() => {
							handleSort("competition")
						}}
					/>
				</div>
			),
			accessor: "competition",
			manualSorting: true,
			width: 100,
			Cell: ({ row }) => {
				let chipClassName = "high_competition_tag"
				return row.original.competition === "" ? (
					""
				) : (
					<p>HIGH</p>
				)
			},
			align: "center",
		},
		{
			Header: " ",
			align: "center",
			disableSortBy: true,
			width: 20,
			Cell: ({ row }) => {
				return row.depth > 0 ? (
					<div className="table_icon">
						<img src={SortIcon} onClick={() => handleKeywordDelete(row)} />
					</div>
				) : (
					<div className="table_icon" style={{ visibility: "hidden" }}>
						<img src={SortIcon} />
					</div>
				)
			},
		},
	]
}

const tableCol = (index) => columns(()=>{}, ()=>{}, index)

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

const Table2 = () => {
	return (
		<div>
			<Table
				showEmptyState={true}
				emptyState={renderEmptyState}
				showPagination={true}
				className="table_container"
				showSelect={true}
				loading={false}
				// emptyMsg="No Data Found"
				data={DATA}
				columns={tableCol(0)}
				EmptyStates={<EmptyStates message={"No Data Found"} />}
				updateColProps={[]}
				// enableSearch={true}
				// handleSearchChange={handleSearchChange}
				PaginationComponent={PaginationComponent}
				LoaderScreen={LoaderScreen}
				Checkbox={Checkbox}
				SortIcon={SortIcon}
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

export default Table2