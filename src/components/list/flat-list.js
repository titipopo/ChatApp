import { FlatList } from 'react-native';

const StyledFlatList = ({ ...props }) => {
  const { data, row, renderItem } = props;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      inverted={true}
      keyExtractor={({ id }) => id}
      horizontal={row}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode={'on-drag'}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default StyledFlatList;
