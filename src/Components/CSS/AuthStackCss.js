import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const styles2 = StyleSheet.create({
  container: {
    width: width, 
    height: height,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  rightImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign:'center',
    marginBottom:10
  },
  input: {
    width: '90%',
    height: 45,
    marginTop: 10,
    backgroundColor: '#f5f7fd',
  },
  button: {
    width: '50%',
    height: 45,
    backgroundColor: '#56acff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    color: '#666',
    marginTop: 20,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#56acff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
})

export default styles2