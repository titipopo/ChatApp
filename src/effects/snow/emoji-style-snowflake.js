import { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, Easing, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const START_Y_POSITION = -50;
const FALL_SPEEDS = ['slow', 'medium', 'fast'];
const FALL_DURATIONS = {
  fast: [8000, 15000],
  medium: [15000, 30000],
  slow: [30000, 60000],
};
const SNOWFLAKE_TYPES = ['❄', '❅', '❆'];

function getConfig({ scene, initialDelay = false, fallSpeed } = {}) {
  const { width } = scene;
  let speed = 'medium';
  if (FALL_SPEEDS.includes(fallSpeed)) {
    speed = fallSpeed;
  }

  const size = randomInt(10, 18);
  const opacity = randomInt(4, 10) / 10;
  const type = SNOWFLAKE_TYPES[randomInt(0, 2)];
  const xPosition = randomInt(0, width);

  //fall animation
  const fallDuration = randomInt(...FALL_DURATIONS[speed]);
  const fallDelay = randomInt(500, initialDelay ? 20000 : 10000);
  // rotate animation
  const rotationDuration = randomInt(2000, 10000);
  const rotationDirection = randomInt(0, 1);
  // side shake animation
  const sideMovementDuration = randomInt(3000, 8000);
  const sideMovementAmplitude = randomInt(0, 50);

  return {
    size,
    opacity,
    type,
    xPosition,
    fallDuration,
    fallDelay,
    rotationDuration,
    rotationDirection,
    sideMovementDuration,
    sideMovementAmplitude,
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const EmojiStyleSnowflake = ({ ...props }) => {
  const { scene, fallSpeed } = props;
  const [config, setConfig] = useState(() =>
    getConfig({ scene, fallSpeed, initialDelay: true })
  );
  const test = randomInt(0, height);
  const animatedY = useRef(new Animated.Value(START_Y_POSITION)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedSideMovement = useRef(new Animated.Value(0)).current;

  const runAnimation = () => {
    animatedY.setValue(START_Y_POSITION);
    animatedRotation.setValue(0);
    animatedSideMovement.setValue(0);

    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: config.rotationDuration,
        useNativeDriver: false,
        easing: Easing.linear,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedSideMovement, {
          toValue: -1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedSideMovement, {
          toValue: 1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
        }),
      ])
    ).start();

    Animated.sequence([
      Animated.delay(config.fallDelay),
      Animated.timing(animatedY, {
        toValue: scene.height,
        duration: config.fallDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      const newConfig = getConfig({ scene, fallSpeed });
      setConfig(newConfig);
    });
  };

  useEffect(() => {
    if (config) {
      console.log(config);
      runAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const rotate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: config.rotationDirection
      ? ['0deg', '360deg']
      : ['360deg', '0deg'],
    extrapolate: 'clamp',
  });

  const translateX = animatedSideMovement.interpolate({
    inputRange: [-1, 1],
    outputRange: [-config.sideMovementAmplitude, config.sideMovementAmplitude],
  });

  return (
    <Animated.Text
      style={[
        styles.snowflake,
        {
          transform: [{ translateY: animatedY }, { rotate }, { translateX }],
        },
        {
          left: config.xPosition,
          fontSize: config.size,
          opacity: config.opacity,
        },
      ]}>
      {config.type}
    </Animated.Text>
  );
};

export default EmojiStyleSnowflake;

const styles = StyleSheet.create({
  snowflake: {
    color: 'white',
    position: 'absolute',
  },
});
