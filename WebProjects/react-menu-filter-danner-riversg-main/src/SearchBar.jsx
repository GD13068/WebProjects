/*
 * Class: SWE2511 - React Menu Filter
 *
 * SearchBar component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */
const SearchBar = (props) => {
    // Event handler to handle a change in the SearchBar
    const onSearchChangeHandler = (event) => {
        props.onSearchChanged(event.target.value);
    }

    // Return the SearchBar component
    return (
        <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={onSearchChangeHandler}
        />
    )
}

export default SearchBar;