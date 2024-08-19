// ScreenPrincipal.tsx

import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Image, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';

interface Props extends StackScreenProps<any, any> {}

export const ScreenPrincipal = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/ice-cream-parlor-ad-flyer-template-design-c7a552033996d6e21c2d2cf0aced9495_screen.jpg?ts=1637011545' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  button: {
    padding: 15,
    backgroundColor: '#FF6347', 
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
