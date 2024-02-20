import { FlatList } from 'react-native';

import StyeledMusicItems from './music-items';

const StyledMusicsList = ({ ...props }) => {
  const { data, process, setMp3 } = props;
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <StyeledMusicItems
          {...item}
          process={process}
          setMp3={setMp3}
        />
      )}
      keyExtractor={({ id }) => id.toString()}
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

export default StyledMusicsList;
