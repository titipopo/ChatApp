import { FlatList, View } from 'react-native';

import StyeledChatItems from './chat-items';

const StyledChatsList = ({ ...props }) => {
  const { data, row, setShowChat, setTarget } = props;

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <StyeledChatItems
          {...item}
          setShowChat={setShowChat}
          setTarget={setTarget}
        />
      )}
      ItemSeparatorComponent={ItemSeparatorView}
      keyExtractor={({ id }) => id.toString()}
      horizontal={row}
      showsHorizontalScrollIndicator={true}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{}}
      removeClippedSubviews={true} // Unmount components when outside of window
      initialNumToRender={2} // Reduce initial render amount
      maxToRenderPerBatch={1} // Reduce number in each render batch
      updateCellsBatchingPeriod={100} // Increase time between renders
      windowSize={7} // Reduce the window size
    />
  );
};

export default StyledChatsList;
