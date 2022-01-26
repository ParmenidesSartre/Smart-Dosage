import { StyleSheet, Text, View } from 'react-native'


const About = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>About</Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text : {
      fontFamily: 'Quicksand_400Regular',
    }
  })