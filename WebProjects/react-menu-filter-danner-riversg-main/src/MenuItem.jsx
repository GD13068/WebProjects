/*
 * Class: SWE2511 - React Menu Filter
 *
 * MenuItem component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */
const MenuItem = (props) => {
    // An array to hold the allergen indicators
    let allergens = [];

    // A loop to create the allergen indicators
    for (let j=0; j<props.allergens.length; j++) {
        // Checks if the item contains the allergen
        if (props.data[props.allergens[j]]) {
            // Creates the allergen indicator
            allergens.push(
                <span
                    className="badge rounded-pill text-bg-primary"
                    key={props.allergens[j]}
                >
                    {props.allergens[j]}
                </span>
            )
        }
    }

    // Returns the MenuItem component
    return (
        <>
            <div
                className="col"
            >
                <div
                    className="card"
                >
                    <div
                        className="card-body"
                    >
                        <h5
                            className="card-title"
                        >
                            {props.data.name}
                        </h5>
                        <h6
                            className="card-subtitle"
                        >
                            {props.data.type}
                        </h6>
                        <p
                            className="card-text"
                        >
                            {"Allergens:"}
                            <br/>
                            {allergens}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuItem;