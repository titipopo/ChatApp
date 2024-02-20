import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

// context
import {
  UseLan,
  GetLan,
} from '../../context/index';

// component
import {
  ContentsContainers,
  StyledText,
  StyledNewsList,
  StyledTouchable,
} from '../../components/index';

const Home = ({ ...props }) => {
  const { language } = UseLan();
  const lan = GetLan(language);
  const [listImage, setListImage] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${
          Math.floor(Math.random() * 10) + 1
        }&limit=30`
      );
      const responsJson = await res.json();
      setListImage(responsJson);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContentsContainers
      isScrollEnable
      title={lan.main_screen.header}
      isReload={refreshing}
      reLoad={loadImage}>
      <StyledText style={styles.sectionTitle} big>
        {lan.main_screen.news}
      </StyledText>
      <StyledNewsList data={listImage} row />
      <StyledTouchable process={loadImage}>
        <StyledText style={styles.sectionTitle} big>
          TEST
        </StyledText>
      </StyledTouchable>
    </ContentsContainers>
  );
};

export default Home;

const styles = StyleSheet.create({
  sectionTitle: {
    paddingLeft: 20,
  },
});
