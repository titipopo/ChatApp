import { StyleSheet, Image } from 'react-native';

const Splash = () => {
  return (
    <>
      <Image
        style={styles.image}
        source={{
          uri: 'https://picsum.photos/200',
        }}
      />
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
