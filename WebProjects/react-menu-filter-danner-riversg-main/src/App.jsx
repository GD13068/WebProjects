/*
 * Class: SWE2511 - React Menu Filter
 *
 * App component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */

import { useState } from 'react';

// Import layout to use the holy grail layout
import './layout.css';
import Header from "./Header";
import FilterBar from "./FilterBar";
import MenuGrid from "./MenuGrid";
import Footer from "./Footer";

// The list of possible allergens
const allergenList = ["soy", "egg", "milk", "fish", "peanut", "shellfish", "treeNut", "gluten", "sesame"];

// The list of possible types
const typeList = ["All", "Burger", "Chicken", "Side", "Dessert", "Seafood", "Salad", "Dressing"];

const App = (props) => {
    // States for the filters
    const [searchString, setSearchString] = useState("");
    const [typeSelection, setTypeSelection] = useState("All");
    const [allergenSelections, setAllergenSelections] = useState([false, false, false, false, false, false, false, false, false]);

    // Method to update the search string
    const onSearchChanged = (value) => {
        setSearchString(value);
    }

    // Method to update the type selection
    const onTypeChanged = (value) => {
        setTypeSelection(value);
    }

    // Method to update the allergens selected
    const onAllergensChanged = (value) => {
        setAllergenSelections(value);
    }

    // Return the rendered App using the holy grail layout
    return (
        <div className="HolyGrail">
            <div className="HolyGrail-header">
                <Header
                    text={"Culver's Menu"}
                />
            </div>
            <div className="HolyGrail-content">
                <MenuGrid
                    menuItems={props.menuItems}
                    searchString={searchString}
                    typeSelection={typeSelection}
                    allergenSelections={allergenSelections}
                    allergens={allergenList}
                />
            </div>
            <div className="HolyGrail-nav">
                <FilterBar
                    allergens={allergenList}
                    types={typeList}
                    onSearchChanged={onSearchChanged}
                    onTypeChanged={onTypeChanged}
                    onAllergensChanged={onAllergensChanged}
                    allergenSelections={allergenSelections}
                />
            </div>
            <div className="HolyGrail-footer">
                <Footer
                    text={"© 2022 Culver Franchising System, LLC. All Rights Reserved."}
                />
            </div>
        </div>
    );
};

export default App;
