/*
 * Class: SWE2511 - React Menu Filter
 *
 * TypeSelect component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */
const TypeSelect = (props) => {
    // Event handler to handle a change in the type selection
    const onTypeChangeHandler = (event) => {
        props.onTypeChanged(event.target.value);
    }

    // Array to hold the options
    let typeOptions = [];

    // Loop to create the options from the list
    for (let i=0; i<props.types.length; i++) {
        typeOptions.push(
            <option
                value={props.types[i]}
                key={props.types[i]}
            >
                {props.types[i]}
            </option>
        )
    }

    // Return the TypeSelect component
    return (
        <>
            <label
                htmlFor="typeSelect"
            >
                Filter by Item Type
            </label>
            <select
                className="form-select"
                id="typeSelect"
                defaultValue="All"
                onChange={onTypeChangeHandler}
            >
                {typeOptions}
            </select>
        </>
    )
}

export default TypeSelect;