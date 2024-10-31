/*
 * Class: SWE2511 - React Filter
 *
 * SearchBar component
 *
 *  * Names: Alex Pearsall and Gavin Danner-Rivers
 * Section: 121
 * Lab: React Filter
 */

/**
 * SearchBar for the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBar = (props) => {
    /**
     * Event handler
     * @param event
     */
    const onSearchChangeHandler = (event) => {
        props.onSearchChange(event.target.value);
    }

    return (
        <input
            type="text"
            className="form-control "
            placeholder="Search..."
            onChange={onSearchChangeHandler}
        />
    )
};

export default SearchBar;