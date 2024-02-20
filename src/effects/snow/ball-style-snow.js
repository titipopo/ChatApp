import { useState } from 'react';
import { View } from 'react-native';

import Snow from './ball-style-snowflake';

const BallStyleSnow = ({ ...props }) => {
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  const snow = [];

  if (state.width > 0 && state.height > 0) {
    for (let i = 0; i < 100; i++) {
      snow.push(<Snow key={i} width={state.width} height={state.height} />);
    }
  }

  return (
    <View
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setState({
          width: width,
          height: height,
        });
      }}>
      {snow}
    </View>
  );
};

export default BallStyleSnow;
