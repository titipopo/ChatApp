import { FlatList } from 'react-native';

import StyeledListItems from './new-items';

const StyledNewsList = ({ ...props }) => {
  const { data, row } = props;
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <StyeledListItems {...item} />}
      keyExtractor={({ id }) => id.toString()}
      horizontal={row}
      showsHorizontalScrollIndicator={true}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingTop: 10,
      }}
      removeClippedSubviews={true} // Unmount components when outside of window
      initialNumToRender={2} // Reduce initial render amount
      maxToRenderPerBatch={1} // Reduce number in each render batch
      updateCellsBatchingPeriod={100} // Increase time between renders
      windowSize={7} // Reduce the window size
    />
  );
};

export default StyledNewsList;
