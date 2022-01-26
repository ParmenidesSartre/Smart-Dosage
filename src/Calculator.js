import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'
import axios from 'axios'
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Modal,
  Center,
  NativeBaseProvider,
} from 'native-base'

const Calculator = () => {
  const [pH, setpH] = useState('')
  const [kekeruhan, setKekeruhan] = useState('')
  const [warna, setWarna] = useState('')
  const [dosage, setDosage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handlepH = (pHvalue) => {
    setpH(pHvalue)
    console.log(pHvalue)
  }
  const handleKekeruhan = (kekeruhanValue) => {
    setKekeruhan(kekeruhanValue)
  }

  const handleWarna = (warnaValue) => {
    setWarna(warnaValue)
  }

  data = {
    pH: pH,
    Kekeruhan: kekeruhan,
    Warna: warna,
  }

  const handleSubmit = async () => {
    console.log(data)
    axios
      .post('https://faizalazman.pythonanywhere.com/v1/api/results/', data)
      .then((response) => {
        setDosage(response.data['Predicted Dosage (mg/l)'])
        setShowModal(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          style={styles.heading}
        >
          AI Powered Dosage Calculator
        </Heading>

        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
          fontFamily={'Quicksand_700Bold'}
        >
          Just key in your data and we'll do the rest!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>
              <Text style={styles.text}>pH of Raw Water</Text>
            </FormControl.Label>
            <Input value={pH} onChangeText={handlepH} />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text style={styles.text}>Turbidity of Raw Water</Text>
            </FormControl.Label>
            <Input value={kekeruhan} onChangeText={handleKekeruhan} />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text style={styles.text}>Color of Raw Water</Text>
            </FormControl.Label>
            <Input value={warna} onChangeText={handleWarna} />
          </FormControl>
          <Button mt="2" colorScheme="hsl(194,100%,44%)" onPress={handleSubmit}>
            <Text style={{ fontFamily: 'Quicksand_700Bold' }}>Calculate</Text>
          </Button>
        </VStack>
      </Box>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Suggested Aluminium Dosage</Modal.Header>
          <Modal.Body>
            <Text fontSize="xl">{`${dosage} mg/l`}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  )
}

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

export default () => {
  return (
    <NativeBaseProvider>
      <Calculator />
    </NativeBaseProvider>
  )
}
