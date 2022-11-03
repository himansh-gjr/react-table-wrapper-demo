import React from "react"
import { Link } from "react-router-dom"

export const HomePage = () => {
	return (
		<div className="home-page-container">
			<div className="table-links">
				<Link to={'basic-table'} ><h3>Basic Table</h3></Link>
				<Link to={'row-select-table'} ><h3>RowSelect Table</h3></Link>
				<Link to={'sorting-table'} ><h3>Sorting Table</h3></Link>
				<Link to={'demo-table'} ><h3>Complete table Demo</h3></Link>
			</div>
		</div>
	)
}