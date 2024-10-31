/*
 * Class: SWE2511 - React Menu Filter
 *
 * Footer component
 *
 * Name: Gavin Danner-Rivers
 * Section: 121
 */
const Footer = (props) => {
    // Returns the Footer component
    return (
        <p
            style={{
                textAlign: "center"
            }}
        >
            {props.text}
        </p>
    )
}

export default Footer;