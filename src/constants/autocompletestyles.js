import { theme } from "../theme";

export const autoComplteStyles = {
    container: {
        flex: 0,
        marginHorizontal: 24,
        color: "black",
    },
    textInputContainer: {

    },
    textInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        color: theme.colors.black

    },
    listView: {
        color: 'black', //To see where exactly the list is
        zIndex: 1000, //To popover the component outwards
    },
    description: {
        color: "black"
    }
}