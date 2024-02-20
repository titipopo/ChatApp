import { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

// Auth
import { db } from '../../firebase/index';

// context
import {
  UseTheme,
  GetTheme,
} from '../../context/index';

// components
import {
  StyledTextInput,
  StyledIcon,
  StyledText,
  StyledView,
  StyledImage,
  StyledTouchable,
  StyledSafeAreaView,
} from '../../components/index';

import { BottomSheet } from 'react-native-btr';
import Slider from '@react-native-community/slider';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

const MusicsPlayer = ({ ...props }) => {
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  const { mp3, setMp3, visibleShort, listMusic } = props;

  const sound = useRef(new Audio.Sound());

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState('');
  const [lyrics, setLyrics] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    let unsubscribe = sound.current;
    setIsPlaying(false);
    setPercent(0);
    setDuration('00:00:00');
    setTimeElapsed('00:00:00');
    return () => unsubscribe.unloadAsync();
  }, [mp3]);

  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    let uri = '';
    if (checkLoading.isLoaded === false) {
      try {
        await db.ref('musics')
          .child(mp3.fullName)
          .getDownloadURL()
          .then((url) => {
            uri = url;
          })
          .catch((error) => {
            console.log(error);
          });

        const result = await sound.current.loadAsync(
          {
            uri: uri,
          },
          { shouldPlay: true },
          true
        );
        if (result.isLoaded === false) {
          console.log('Error in Loading Audio');
        } else {
          await PlayAudio();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Error in Loading Audio111');
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          setIsPlaying(false);
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            playThroughEarpieceAndroid: false,
          });

          sound.current.playAsync();
          setIsPlaying(true);

          sound.current.setOnPlaybackStatusUpdate(async (newStatus) => {
            if (newStatus.positionMillis === newStatus.durationMillis - 1000) {
              console.log(111)
              await sound.current.stopAsync();
              NextSong();
            }
            setStatus(newStatus);

            var positonMinutes = Math.floor(
              Math.floor(newStatus.positionMillis) / 60000
            );
            var positionSeconds = (
              (Math.floor(newStatus.positionMillis) % 60000) /
              1000
            ).toFixed(0);
            var durationMinutes = Math.floor(
              Math.floor(newStatus.durationMillis) / 60000
            );
            var durationSeconds = (
              (Math.floor(newStatus.durationMillis) % 60000) /
              1000
            ).toFixed(0);

            const duration =
              durationMinutes +
              ':' +
              (durationSeconds < 10 ? '0' : '') +
              durationSeconds;
            const positon =
              positonMinutes +
              ':' +
              (positionSeconds < 10 ? '0' : '') +
              positionSeconds;

            let percent =
              parseInt(positon.split(':')[0]) * 60 +
              parseInt(positon.split(':')[1]);

            setTimeElapsed(positon);
            setPercent(percent);
            setDuration(duration);
          });
        }
      } else {
        await LoadAudio();
      }
    } catch (error) {
      console.log('Error in Playing Audio');
    }
  };

  const NextSong = () => {
    console.log(222)
    if (mp3.id === listMusic[listMusic.length - 1].id) {
      setMp3(listMusic[0]);
    } else {
      setMp3(listMusic[mp3.id + 1]);
    }
  };

  const PrevSong = () => {
    if (mp3.id === 0) {
      setMp3(listMusic[listMusic.length - 1]);
    } else {
      setMp3(listMusic[mp3.id - 1]);
    }
  };

  const changeTime = async (seconds) => {
    try {
      if (isNaN(seconds)) return;

      let seektime = Math.round(seconds * 1000);
      await sound.current.setPositionAsync(seektime);
    } catch (error) {
      console.log('seekToMiddle - error', error);
    }
  };

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  return visibleShort ? (
    expanded ? (
      <BottomSheet visible={expanded}>
        <StyledSafeAreaView>
          <StyledView style={styles.mainContainer} transparent>
            <StyledView style={styles.mainbar} border>
              <StyledTouchable process={toggleDropdown} transparent>
                <StyledIcon
                  name="arrow-left-bold"
                  size={25}
                  color={activeColors.accent}
                />
              </StyledTouchable>

              <StyledText big> Now Playing </StyledText>

              <StyledTouchable process={() => {}} transparent>
                <StyledIcon
                  name="dots-horizontal"
                  size={25}
                  color={activeColors.accent}
                />
              </StyledTouchable>
            </StyledView>

            <StyledView style={styles.image_view} transparent>
              {lyrics ? (
                <StyledView transparent border style={{ height: 350 }}>
                  <StyledTextInput
                    style={{ height: '100%' }}
                    multiline
                    left
                    pdL
                    pdR
                    value="ssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
                  />
                </StyledView>
              ) : (
                <StyledImage
                  imgUri={'https://picsum.photos/200'}
                  resizeMode="cover"
                  style={styles.image}
                />
              )}
              <StyledTouchable
                process={() => {
                  setLyrics(!lyrics);
                }}
                transparent>
                <StyledIcon
                  name={lyrics ? 'music-note-off' : 'music-note'}
                  size={25}
                  color={activeColors.accent}
                />
              </StyledTouchable>
            </StyledView>

            <StyledView style={styles.name_of_song_View} transparent>
              <StyledText numberOfLines={1} bold>
                {mp3.title ? mp3.title : null}
              </StyledText>
              <StyledText numberOfLines={1} small>
                {mp3.artist ? mp3.artist : null}
              </StyledText>
            </StyledView>

            <StyledView style={styles.slider_view} transparent>
              <StyledView style={styles.duration} transparent>
                <StyledText>{timeElapsed}</StyledText>
                <StyledText>{duration}</StyledText>
              </StyledView>
              <Slider
                style={styles.slider_style}
                step={1}
                minimumValue={0}
                maximumValue={
                  parseInt(duration.split(':')[0]) * 60 +
                  parseInt(duration.split(':')[1])
                }
                minimumTrackTintColor={activeColors.accent}
                maximumTrackTintColor={activeColors.tint}
                thumbTintColor={activeColors.accent}
                value={percent}
                onValueChange={(seconds) => changeTime(seconds)}
              />
            </StyledView>

            <StyledView style={styles.functions_view} transparent>
              <StyledIcon
                name="shuffle-variant"
                size={25}
                color={activeColors.accent}
              />
              <StyledTouchable process={PrevSong} transparent>
                <StyledIcon
                  name="skip-backward"
                  size={25}
                  color={activeColors.accent}
                />
              </StyledTouchable>

              <StyledTouchable
                process={() => {
                  isPlaying ? PauseAudio() : PlayAudio();
                }}
                style={{ height: 70 }}
                transparent>
                <StyledIcon
                  name={isPlaying ? 'pause-circle' : 'play-circle'}
                  size={70}
                  color={activeColors.accent}
                />
              </StyledTouchable>
              <StyledTouchable process={NextSong} transparent>
                <StyledIcon
                  name="skip-forward"
                  size={25}
                  color={activeColors.accent}
                />
              </StyledTouchable>

              <StyledIcon
                name="repeat-variant"
                size={25}
                color={activeColors.accent}
              />
            </StyledView>
          </StyledView>
        </StyledSafeAreaView>
      </BottomSheet>
    ) : (
      <StyledTouchable
        transparent
        style={styles.button}
        process={toggleDropdown}>
        <StyledView style={styles.currentcurrent_played_song}>
          <StyledImage
            imgUri={'https://picsum.photos/200'}
            style={styles.current_played_image}
            border
          />
          <StyledView style={styles.infor}>
            <StyledText numberOfLines={1} bold>
              {mp3.title ? mp3.title : null}
            </StyledText>
            <StyledText numberOfLines={1} small>
              {mp3.artist ? mp3.artist : null}
            </StyledText>
          </StyledView>
          <StyledTouchable
            process={() => {
              isPlaying ? PauseAudio() : PlayAudio();
            }}
            transparent>
            <StyledIcon
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={50}
              color={activeColors.accent}
            />
          </StyledTouchable>
        </StyledView>
      </StyledTouchable>
    )
  ) : null;
};

export default MusicsPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    padding: 20,
  },
  mainbar: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image_view: {
    height: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 350,
    width: 350,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: '#fff',
  },
  name_of_song_View: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider_view: {
    height: 70,
    width: '100%',
    alignItems: 'center',
  },
  duration: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider_style: {
    width: '90%',
  },
  functions_view: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    height: 70,
  },
  currentcurrent_played_song: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  infor: {
    flexBasis: 200,
  },
  current_played_image: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 100,
  },
});
