import { useState, useEffect } from 'react';

// data
import { getByRef } from '../../firebase/index';

// consts
import { Strings } from '../../consts/index';

// context
import {
  UseLan,
  GetLan,
} from '../../context/index';

// component
import {
  ContentsContainers,
  StyledMusicsList,
  StyledTextInput,
  StyledView,
} from '../../components/index';

// screens
import { MusicsPlayer } from '../../screens/index';

const Musics = ({ ...props }) => {
  const { language } = UseLan();
  const lan = GetLan(language);

  const [listMusic, setListMusic] = useState([]);
  const [filteredData, setFilteredData] = useState(listMusic);
  const [filter, setFilter] = useState('');
  const [visibleShort, setVisibleShort] = useState(false);
  const [mp3, setMp3] = useState('');

  useEffect(() => {
    const filteredData = filter
      ? listMusic.filter(
        (x) =>
          String(x.title.toLowerCase()).includes(filter.toLowerCase()) ||
          String(x.artist.toLowerCase()).includes(filter.toLowerCase())
      )
      : listMusic;
    setFilteredData(filteredData);
  }, [filter, listMusic]);

  useEffect(() => {
    const loadMusic = async () => {
      var jsonArray = [];
      const res = await getByRef('musics');
      var i = 0;
      res.forEach((itemRef) => {
        let fileName = itemRef._location.path_.split('/')[1];
        let musicName = fileName
          .split('.')[0]
          .substring(0, fileName.lastIndexOf('-'));
        let author = fileName
          .split('.')[0]
          .substring(fileName.lastIndexOf('-') + 1);

        var jsonObject = {
          id: i,
          title: musicName,
          artist: author,
          url: '',
          artwork: '',
          fullName: fileName,
        };
        jsonArray.push(jsonObject);
        i++;
      });
      setListMusic(jsonArray);
    };
    loadMusic();
  }, []);

  const toggleBottomNavigationView = () => {
    setVisibleShort(true);
  };

  return (
    <ContentsContainers
      title={lan.music_screen.header}
      stickToTopView={
        <StyledView
          style={{
            alignItems: 'center',
            width: '100%',
            marginBottom: 10,
          }}
          transparent
          border>
          <StyledTextInput
            icon={Strings.icons.nomarl.magnify}
            placeholder={lan.music_screen.search_place_holder}
            onChangeText={(val) => setFilter(val)}
            left
            pdL
            pdR
          />
        </StyledView>
      }
    >
      <StyledMusicsList
        data={filter ? filteredData : listMusic}
        process={toggleBottomNavigationView}
        setMp3={setMp3}
      />
    </ContentsContainers>
  );
};

export default Musics;
