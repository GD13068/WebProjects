/*
 * Class: SWE2511 - React Filter
 *
 * App component
 *
 *  * Names: Alex Pearsall and Gavin Danner-Rivers
 * Section: 121
 * Lab: React Filter
 */

import { useState } from 'react';
import SearchBar from "./SearchBar";
import TextDisplay from "./TextDisplay";
import CapitalFilter from "./CapitalFilter";

const App = (props) => {

    const [searchString, setSearchString] = useState("");
    let [capitalSearch, setCheckStatus] = useState(false);

    /**
     * Changes the search function depending on if the checkbox is checked
     * @param value
     */
    const capitalSearchChange = (value) => {
        setCheckStatus(value);
    }

    // Search event handler - called when text for the
    //    search field is changed
    const onSearchChanged = (value) => {
        // Set the state for the new string filter
        //   this will cause a re-render of the App
        setSearchString(value);
    }

    // Filter the words based on the current search text
    const words = props.text.split(" ");
    const filteredWords = words.filter((word) => {
        if (capitalSearch) {
            return word.includes(searchString);
        } else {
            return word.toLowerCase().includes(searchString.toLowerCase());
        }
    });
    const filteredString = filteredWords.join(" ");

    // Return the rendered App
    return (
        <div className="m-3">
            <div className="d-flex">
                <SearchBar
                    onSearchChange={onSearchChanged}
                />

                <CapitalFilter
                    onChange={capitalSearchChange}
                />
            </div>
            <TextDisplay
                text={filteredString}
            />
        </div>
    );
};

export default App;
