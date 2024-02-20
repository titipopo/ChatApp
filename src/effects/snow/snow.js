import BallStyleSnowAnimated from './ball-style-snow-animated';
import BallStyleSnow from './ball-style-snow';
import EmojiStyleSnow from './emoji-style-snow';

import { Animated, StyleSheet, Easing, Dimensions } from 'react-native';

import EmojiStyleSnowflake from './emoji-style-snowflake';
import BallStyleSnowflakeAnimated from './ball-style-snow-animated';
const fullDimensions = Dimensions.get('window');

const Snow = ({ ...props }) => {
  {
    /*
    {month == 12 ? <EmojiStyleSnow /> : null}
    {month == 12 ? <BallStyleSnowAnimated /> : null}
    {month == 12 ? <BallStyleSnow /> : null}
    {month == 12
        ? new Array(500)
            .fill(0)
            .map((_, i) => <BallStyleSnowflakeAnimated key={i} />)
        : null}
    */
  }
  var month = new Date().getMonth() + 1;
  return (
    <>
      {month == 1
        ? new Array(10)
            .fill(true)
            .map((_, i) => (
              <EmojiStyleSnowflake key={i} scene={fullDimensions} fallSpeed={'medium'} />
            ))
        : null}
    </>
  );
};

export default Snow;
