/*
 * Class: SWE2511 - React Menu Filter
 *
 * FilterBar component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */
import SearchBar from "./SearchBar";
import TypeSelect from "./TypeSelect";
import AllergenSelect from "./AllergenSelect";

const FilterBar = (props) => {
    // Return the components of the FilterBar
    return (
        <>
            <SearchBar
                onSearchChanged={props.onSearchChanged}
            />
            <TypeSelect
                types={props.types}
                onTypeChanged={props.onTypeChanged}
            />
            <AllergenSelect
                allergens={props.allergens}
                onAllergensChanged={props.onAllergensChanged}
                allergenSelections={props.allergenSelections}
            />
        </>
    )
}

export default FilterBar;