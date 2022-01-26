import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Calculator from './Calculator'
import About from './About'
import { Ionicons } from '@expo/vector-icons'
import { FAB, Card, Title, Paragraph, Subheading } from 'react-native-paper'
import LottieView from 'lottie-react-native'
import Modal from './Modal'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { db } from '././firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Selama',
    imageUrl:
      'https://www.orangperak.com/wp-content/uploads/2016/12/selama.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Kuala Kangsar',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9J-CiHl_JzyFCaXpfXG-b-91BoGIZm_f-Vw&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Gerik',
    imageUrl:
      'https://ngamrealestate.com/wp-content/uploads/2020/02/SC-20-01-265-1024x576.jpg',
  },
]

const Item = ({ title, image }) => (
  <View style={styles.card}>
    <Card>
      <Card.Cover source={{ uri: image }} />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>
          Memasang menguji dan mentauliah paip UPVC PN12 berukuran 100mm G.P
          bagi menggantikan paip 100mm AC sedia ada...
        </Paragraph>
      </Card.Content>
    </Card>
  </View>
)

const Home = () => {
  const [files, setFiles] = useState(null)

  const renderItem = ({ item }) => (
    <Item title={item.title} details={item.details} />
  )

  useEffect(() => {
    const firebaseHandler = async () => {
      const fileCol = collection(db, 'records')
      const fileSnapshot = await getDocs(fileCol)
      const fileList = fileSnapshot.docs.map((doc) => doc.data())
      setFiles(fileList)
    }
    firebaseHandler()
  }, [])

  if (!files) {
    return (
      <View style={styles.container}>
        <LottieView
          ref={(animation) => {
            animation = animation
          }}
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#fff',
          }}
          source={require('../assets/water.json')}
          autoPlay
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Subheading style={styles.title}>Strelise Records</Subheading>
        <FlatList
          data={files}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
        <Modal />
      </SafeAreaView>
    )
  }
}

const Tab = createBottomTabNavigator()
export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator barStyle={{ fontFamily: 'Quicksand_400Regular' }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => (
              <Ionicons name="home" size={28} color="deepskyblue" />
            ),
          }}
        />
        <Tab.Screen
          name="Calculator"
          component={Calculator}
          options={{
            tabBarIcon: () => (
              <Ionicons name="calculator" size={28} color="deepskyblue" />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: () => (
              <Ionicons
                name="help-circle-outline"
                size={28}
                color="deepskyblue"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerAnim: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontFamily: 'Quicksand_700Bold',
    paddingTop: 15,
    paddingBottom: 15,
  },
  card: {
    paddingBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
