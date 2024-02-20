import { StyleSheet } from 'react-native';

import { StyledText, StyledView } from '../../components/index';

const CircelContainer = ({ ...props }) => {
  const { greeting, title, back } = props;
  return (
    <StyledView transparent>
      <StyledView
        style={[styles.circle, styles.type2, styles.circle1]}
        border
      />
      <StyledView style={[styles.circle, styles.type1]} border />
      <StyledView
        style={[styles.circle, styles.type2, styles.circle2]}
        border
      />
      <StyledView style={styles.nameContainer} transparent>
        <StyledText bold>{greeting}</StyledText>
        <StyledText big>{title}</StyledText>
        {back}
      </StyledView>
    </StyledView>
  );
};

export default CircelContainer;

const styles = StyleSheet.create({
  circle: {
    borderRadius: 200,
  },
  type1: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 300,
    height: 300,
  },
  type2: {
    width: 100,
    height: 100,
  },
  circle1: {
    marginLeft: 200,
    marginTop: 50,
  },
  circle2: {
    left: -20,
    top: 20,
  },
  nameContainer: { position: 'absolute', top: 70, left: 50 },
});
