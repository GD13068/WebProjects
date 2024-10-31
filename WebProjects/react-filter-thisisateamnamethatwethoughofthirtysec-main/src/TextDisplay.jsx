/*
 * Class: SWE2511 - React Filter
 *
 * TextDisplay component
 *
 *  * Names: Alex Pearsall and Gavin Danner-Rivers
 * Section: 121
 * Lab: React Filter
 */

/**
 * TestDisplay for the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TextDisplay = (props) => {
    return (
        <p
            style={{
                borderStyle: "double",
                padding: "5px",
                backgroundColor: "lightgray",
                marginTop: "5px"
            }}
        >
            {props.text}
        </p>
    )
};

export default TextDisplay;