import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import Share from 'react-native-share';
import ShareNews from './src/components/ShareNews';
import ReportNews from './src/components/ReportNews';
import CommentScreen from './src/components/CommentScreen';

const {height, width} = Dimensions.get('window');

const newsData = [
  {
    id: 1,
    title: 'Breaking News: Market Hits Record High',
    description:
      'The stock market reaches an all-time high as investors remain optimistic...',
    image:
      'https://res.cloudinary.com/dfoquniuy/image/upload/v1686654080/News/Thumbnail/ooihwwotsjousqxeggrq.jpg',
  },
  {
    id: 2,
    title: 'Tech Innovation: AI is Changing the World',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://res.cloudinary.com/dfoquniuy/image/upload/v1691308134/News/Thumbnail/vfc8ldwnmeavqjeqw9vs.jpg',
  },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const onSwipeUp = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % newsData.length);
    setIsVisible(false);
  };

  const onSwipeDown = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? newsData.length - 1 : prevIndex - 1,
    );
    setIsVisible(false);
  };

  const handleScreenTap = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {isVisible && (
        <View style={styles.header}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderActive}>समाचार</Text>
            <Text style={styles.sliderInactive}>वायरल</Text>
          </View>
        </View>
      )}

      {/* Gesture Controls for Swiping */}
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        style={styles.gestureContainer}>
        <View style={styles.newsContainer}>
          <Image
            source={{uri: newsData[currentIndex].image}}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <TouchableWithoutFeedback onPress={handleScreenTap}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>{newsData[currentIndex].title}</Text>
                <Text style={styles.description}>
                  {newsData[currentIndex].description}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View>
              <View style={styles.dateContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={18}
                    color="gray"
                  />
                  <Text style={styles.timeText}>2h ago</Text>
                  <Text style={styles.pagesText}>
                    {' '}
                    / {currentIndex + 1} of {newsData.length} pages
                  </Text>
                </View>
              </View>

              <View style={styles.iconsContainer}>
                <View style={styles.leftIcons}>
                  <TouchableOpacity style={styles.sliderItem}>
                    <Text style={styles.centerIcon}>
                      <AntDesign name="like2" size={20} color="gray" />{' '}
                      <Text style={{color: 'gray'}}>21</Text>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sliderItem}>
                    <Text>
                      <AntDesign name="dislike2" size={20} color="gray" />{' '}
                      <Text style={{color: 'gray'}}>21</Text>
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sliderItem}>
                    <CommentScreen />
                  </TouchableOpacity>
                </View>
                <View style={styles.rightIcons}>
                  <ReportNews />
                  <ShareNews />
                </View>
              </View>
            </View>
          </View>
        </View>
      </GestureRecognizer>

      {/* Footer */}
      {isVisible && (
        <View style={styles.footer}>
          <View style={styles.sliderFooter}>
            <TouchableOpacity style={styles.sliderItem}>
              <Icon name="menu" size={24} color="gray" />
              <Text style={styles.sliderText}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sliderItem}>
              <Icon name="search" size={24} color="gray" />
              <Text style={styles.sliderText}>Search</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sliderItem}>
              <Icon name="visibility-off" size={24} color="gray" />
              <Text style={styles.sliderText}>Unread</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sliderItem}>
              <Icon name="refresh" size={24} color="gray" />
              <Text style={styles.sliderText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gestureContainer: {
    flex: 1,
  },
  newsContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  image: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
  },
  textContainer: {
    height: '60%',
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timeText: {
    color: 'black',
    marginLeft: 5,
    fontSize: 12,
  },
  pagesText: {
    color: 'lightgray',
    marginLeft: 5,
    fontSize: 12,
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F7F7FF',
    alignItems: 'center',
    zIndex: 10,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  sliderActive: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    width: '50%',
    paddingVertical: 10,
    textAlign: 'center',
    borderBottomColor: '#6B6B6B',
    borderBottomWidth: 4,
  },
  sliderInactive: {
    color: 'gray',
    paddingVertical: 10,
    fontSize: 26,
    width: '50%',
    textAlign: 'center',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F7F7FF',
    paddingVertical: 14,
  },
  sliderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sliderItem: {
    alignItems: 'center',
  },
  sliderText: {
    color: 'gray',
    fontSize: 12,
  },
});
