import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, Animated, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

const BallStyleSnowflakeAnimated = () => {
  const random_range = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomX = (Math.random() * 100 * width) / 100;
  const randomOffset = (random_range(-100, 100) * width) / 100;
  const randomXEnd = randomX + randomOffset;
  const randomXEndYo = randomX + randomOffset / 2;
  const randomYoTime = random_range(0, 80) / 100;
  const randomYoY = randomYoTime * height;
  const randomScale = Math.random() * 100 * 0.01;
  const fallDuration = random_range(10, 30) * 500;
  const opacity = Math.random() * 100 * 0.01;

  const animValue = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    animValue.setValue(randomYoTime);
    Animated.timing(animValue, {
      toValue: 1,
      duration: fallDuration,
      useNativeDriver: false,
    }).start(() => {
      animate();
    });
  }, [animValue, fallDuration, randomYoTime]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <Animated.View
      style={[
        styles.snow,
        { opacity },
        {
          transform: [
            {
              translateX: animValue.interpolate({
                inputRange: [randomYoTime, 1],
                outputRange: [
                  parseInt(randomXEnd, 10),
                  parseInt(randomXEndYo, 10),
                ],
              }),
            },
            {
              translateY: animValue.interpolate({
                inputRange: [randomYoTime, 1],
                outputRange: [parseInt(randomYoY, 10), height],
              }),
            },
            {
              scale: randomScale,
            },
          ],
        },
      ]}
    />
  );
};

const BallStyleSnowAnimated = ({
  colors = ['#1b2735', '#090a0f'],
  snowCount = 500,
}) => {
  return (
    <View colors={colors} style={styles.container}>
      {new Array(snowCount).fill(0).map((_, i) => (
        <BallStyleSnowflakeAnimated key={i} />
      ))}
    </View>
  );
};

export default BallStyleSnowAnimated;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  snow: {
    width: 10,
    height: 10,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    top: 0,
  },
});
