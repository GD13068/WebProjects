/*
 * Class: SWE2511 - React Menu Filter
 *
 * MenuGrid component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */
import MenuItem from "./MenuItem";

const MenuGrid = (props) => {
    // An array to hold the menu items that match the criteria
    let menuItems = [];

    // A loop to determine if each menu item matches the criteria
    for (let i=0; i<props.menuItems.length; i++) {
        // Checks if the item name contains the search string
        if (props.menuItems[i].name.toLowerCase().includes(props.searchString.toLowerCase())) {
            // Checks if the selected type matches the item or if "All" is selected
            if (props.typeSelection === "All" || props.menuItems[i].type === props.typeSelection) {
                // A variable to determine if the item is safe
                let safe = true;
                // A loop to cycle through the allergen options
                for (let j=0; j<props.allergens.length; j++) {
                    // Checks if the allergen is selected
                    if (props.allergenSelections[j] === true) {
                        // Checks if the item contains the allergen
                        if (!(!props.allergenSelections[j] === props.menuItems[i][props.allergens[j]])) {
                            // The item contains the selected allergen and is not safe
                            safe = false;
                        }
                    }
                }

                // Checks if the item is safe
                if (safe) {
                    // Creates the menu item
                    menuItems.push(
                        <MenuItem
                            data={props.menuItems[i]}
                            allergens={props.allergens}
                            key={props.menuItems[i].name}
                        />
                    )
                }
            }
        }
    }

    // Returns the MenuGrid component
    return (
        <>
            <div
                className="row row-cols-3 g-4"
            >
                {menuItems}
            </div>
        </>
    )
}

export default MenuGrid;