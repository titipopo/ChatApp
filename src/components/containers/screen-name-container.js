import { StyleSheet } from 'react-native';

// component
import { StyledView, StyledText } from '../../components/index';

const ScreenNameContainer = ({ ...props }) => {
  const { name } = props;
  return (
    <StyledView style={styles.container}>
      <StyledText style={styles.screenName} big>
        {name}
      </StyledText>
    </StyledView>
  );
};

export default ScreenNameContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: 'tomato',
    overflow: 'hidden',
    marginBottom: 10,
  },
  screenName: {
    marginLeft: 10,
  },
});
