/*
 * Class: SWE2511 - React Filter
 *
 * CapitalFilter component
 *
 *  * Names: Alex Pearsall and Gavin Danner-Rivers
 * Section: 121
 * Lab: React Filter
 */
import React from 'react';

/**
 * Filter that searches based on capital
 * @param props
 * @returns {Element}
 * @constructor
 */
const CapitalFilter = (props) => {

    const onFilterChange = (event) => {
        const newChecked = event.target.checked;
        props.onChange(newChecked);
    }

    return (
        <div className="d-flex m-2">

            <input
                type="checkbox"
                className="btn-check"
                id="buttonCheck"
                autoComplete="off"
                onChange={onFilterChange}
            >
            </input>
            <label
                className="btn btn-outline-primary"
                htmlFor="buttonCheck">Capital Filter
            </label>
        </div>
    )
};

export default CapitalFilter;