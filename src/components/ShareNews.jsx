import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import { Linking, Alert } from 'react-native';

const ShareNews = () => {
  const refRBSheet = useRef();

  const shareContent = async platform => {
    const shareOptions = {
      message: 'Check out this news article!',
      url: 'https://yournewswebsite.com/news-id',
    };

    try {
      if (platform === 'whatsapp') {
        const whatsappURL = `whatsapp://send?text=${encodeURIComponent(
          shareOptions.message + ' ' + shareOptions.url,
        )}`;

        const supported = await Linking.canOpenURL(whatsappURL);
        if (supported) {
          await Linking.openURL(whatsappURL);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on your device.');
        }
      } else if (platform === 'instagram') {
        await Share.shareSingle({
          url: shareOptions.url, // Instagram prefers images/videos
          social: Share.Social.INSTAGRAM,
        });
      } else if (platform === 'facebook') {
        await Share.shareSingle({
          ...shareOptions,
          social: Share.Social.FACEBOOK,
        });
      } else if (platform === 'twitter') {
        await Share.shareSingle({
          ...shareOptions,
          social: Share.Social.TWITTER,
        });
      } else if (platform === 'linkedin') {
        await Share.shareSingle({
          ...shareOptions,
          social: Share.Social.LINKEDIN,
        });
      } else {
        await Share.open(shareOptions);
      }
    } catch (error) {
      console.log('Error sharing: ', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.sliderItem}
        onPress={() => refRBSheet.current.open()}>
        <FontAwesome name="share" size={20} color="lightblue" />
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        height={200}
        openDuration={200}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            ...styles.bottomSheet,
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
        }}>
        <Text style={styles.sheetTitle}>Share with</Text>
        <View style={styles.iconContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareContent('whatsapp')}>
              <FontAwesome name="whatsapp" size={40} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareContent('facebook')}>
              <FontAwesome name="facebook" size={40} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareContent('twitter')}>
              <FontAwesome name="twitter" size={40} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareContent('instagram')}>
              <FontAwesome name="instagram" size={40} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareContent('linkedin')}>
              <FontAwesome name="linkedin" size={40} color="#0077B5" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => shareContent('default')}>
              <FontAwesome name="share-alt" size={40} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomSheet: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  iconContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
});

export default ShareNews;
