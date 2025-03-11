import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const ModalTaskCss = StyleSheet.create({
    modalBackground: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#56acff',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
    },
    label: {
        fontSize: 15,
        color: '#333',
        marginBottom: 5,
        fontWeight: '600',
        marginTop: 10,
    },
    dropdown: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    placeholderStyle: {
        color: '#5b5b5b',
        fontSize: 15,
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    sendButton: {
        backgroundColor: '#56acff',
        width: '48%',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        paddingVertical: 10,
        width: '48%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        width: '100%',
    },
    dateInput: {
        justifyContent: 'center',
    },
});

export default ModalTaskCss;
