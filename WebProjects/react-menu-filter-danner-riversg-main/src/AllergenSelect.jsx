/*
 * Class: SWE2511 - React Menu Filter
 *
 * AllergenSelect component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */
const AllergenSelect = (props) => {
    // Event handler to handle a change when an allergen is selected
    const onAllergensChangedHandler = (event) => {
        // An array to hold the existing selections
        const allergenSelections = [];

        // A loop to copy the existing to the new array
        for (let i=0; i<props.allergenSelections.length; i++) {
            allergenSelections.push(props.allergenSelections[i]);
        }

        // The selection that caused the event
        const selection = event.target.id;

        // A loop to update the corresponding value in the array
        for (let i=0; i<props.allergens.length; i++) {
            if (props.allergens[i] === selection) {
                allergenSelections[i] = event.target.checked;
                break;
            }
        }

        // Return the updated array
        props.onAllergensChanged(allergenSelections);
    }

    // An array to hold the allergen selectors
    let allergenOptions = [];

    // A loop to create the allergen selectors from the list
    for (let i=0; i<props.allergens.length; i++) {
        allergenOptions.push(
            <div
                className="form-check form-switch"
                key={props.allergens[i]}
            >
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={props.allergens[i]}
                    onChange={onAllergensChangedHandler}
                />
                <label
                    className="form-check-label"
                    htmlFor={props.allergens[i]}
                >
                    {props.allergens[i][0].toUpperCase() + props.allergens[i].slice(1) + " Free"}
                </label>
            </div>
        )
    }

    // Return the AllergenSelect component
    return (
        <>
            <label>
                Filter by Allergen:
            </label>
            {allergenOptions}
        </>
    )
}

export default AllergenSelect;