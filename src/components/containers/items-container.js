import { StyleSheet } from 'react-native';

// component
import { StyledText, StyledView } from '../../components/index';

const ItemContainer = ({ ...props }) => {
  const { children, lable, big, bold } = props;

  return (
    <StyledView style={styles.settingsItem}>
      <StyledText style={styles.lable} bold={bold} big={big}>
        {lable}
      </StyledText>
      {children}
    </StyledView>
  );
};

export default ItemContainer;

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
  },
  lable: {
    fontStyle: 'italic',
    paddingRight: 10,
  },
});
