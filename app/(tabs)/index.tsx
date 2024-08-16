import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, withTiming, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

import { useEffect } from 'react';

export default function HomeScreen() {
  const titlePosition = useSharedValue(-400) // Posicion inicial del Titulo
  const titleOpacity = useSharedValue(1) // Opacidad inicial del Titulo
  const backgroundColorValue = useSharedValue(0) // Color inicial del Fondo

  useEffect(() => {
    setTimeout(() => {
      titlePosition.value = withSpring(titlePosition.value + 400, {
        damping: 50,
      }) // Movimiento del Titulo
    }, 1000)
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      backgroundColorValue.value,
      [0, 1],
      ['#f64', '#64f']
    ) // Cambio de color con la animacion de 'desvanecimiento'

    return {
      backgroundColor
    }

  })

  const handleInitialize = () => {
    backgroundColorValue.value = withTiming(1, {
      duration: 1000
    }) // Cambio de color del fondo

    titleOpacity.value = withTiming(0, {
      duration: 1000
    }) // Opacidad del Titulo
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.View style={styles.titleContainer}>
        <View style={{
          minHeight: 32,
        }}>
          <Animated.Text
            style={[styles.title, {
              top: titlePosition,
              opacity: titleOpacity
            }]}
          >
            Bienvenido!
          </Animated.Text>
        </View>
      </Animated.View>
      <Text style={styles.subtitle}>
        Esta es una aplicación de React Native con animaciones, una vez presion el boton se iniciara la animacion.
      </Text>
      <TouchableOpacity 
        onPress={handleInitialize}
        style={styles.btn}
      >
        <Text>Iniciar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    position: 'absolute',
    left: -90,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    width: 300,
    textAlign: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  btn: {
    backgroundColor: 'white',
    width: 120,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  }
});
