import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ANGE_RANGE = 0.1;
const HALF_ANGLE_RANGE = ANGE_RANGE / 2;
const HALF_PI = Math.PI / 2;
const ANGLE_SEED = 100;
const ANGLE_DIVISOR = 10000;
const INCREMENT_LOWER = 2;
const INCREMENT_UPPER = 4;
const FLAKE_SIZE_LOWER = 6;
const FLAKE_SIZE_UPPER = 12;

const BallStyleSnowflake = ({ ...props }) => {
  const { width, height } = props;
  const [config, setConfig] = useState(() =>
    getConfig({ width: false, height: false, angle: false })
  );

  const userefSize = useRef(config.FlakeSize).current;
  const userefOpacity = useRef(config.Opacity).current;

  function getRandom(lower, upper) {
    const min = Math.min(lower, upper);
    const max = Math.max(lower, upper);
    return getRandomFloat(max - min) + min;
  }
  function getRandomFloat(upper) {
    return Math.random() * upper;
  }

  function getRandomInt(upper) {
    return Math.floor(Math.random() * (upper - 1 + 1)) + 1;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      move();
    }, 50);
    return () => clearInterval(interval);
  });

  function getConfig({ x, y, angle }) {
    const X = x ? x : getRandomInt(width);
    const Y = y ? y : getRandomInt(height);
    const Angle = angle
      ? angle
      : (getRandomFloat(ANGLE_SEED) / ANGLE_SEED) * ANGE_RANGE +
        HALF_PI -
        HALF_ANGLE_RANGE;

    const Increment = getRandom(INCREMENT_LOWER, INCREMENT_UPPER);
    const FlakeSize = getRandom(FLAKE_SIZE_LOWER, FLAKE_SIZE_UPPER);
    const Opacity = Math.random();
    return {
      X,
      Y,
      Angle,
      Increment,
      FlakeSize,
      Opacity,
    };
  }

  const move = () => {
    const x = Math.floor(config.X + config.Increment * Math.cos(config.Angle));
    const y = Math.floor(config.Y + config.Increment * Math.sin(config.Angle));

    const angle =
      config.Angle + getRandom(-ANGLE_SEED, ANGLE_SEED) / ANGLE_DIVISOR;

    const newConfig = getConfig({ x, y, angle });
    setConfig(newConfig);

    if (!isInside()) {
      reset();
    }
  };

  const isInside = () => {
    const x = config.X;
    const y = config.Y;
    const flakeSize = config.FlakeSize;
    return (
      x >= -flakeSize - 1 &&
      x + flakeSize <= width &&
      y >= -flakeSize - 1 &&
      y - flakeSize < height
    );
  };

  const reset = () => {
    const x = getRandomInt(width);
    const y = -config.FlakeSize - 1;
    const angle =
      (getRandomFloat(ANGLE_SEED) / ANGLE_SEED) * ANGE_RANGE +
      HALF_PI -
      HALF_ANGLE_RANGE;

    const newConfig = getConfig({ x, y, angle });
    setConfig(newConfig);
  };

  const getPosition = () => {
    return {
      top: config.Y,
      left: config.X,
      width: userefSize,
      height: userefSize,
      borderRadius: userefSize / 2,
      opacity: userefOpacity,
    };
  };

  const snowShape = getPosition();

  return <View style={[styles.snow, snowShape]} />;
};

export default BallStyleSnowflake;

// Styles
const styles = StyleSheet.create({
  snow: {
    position: 'absolute',
  },
});
