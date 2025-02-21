import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ReportNews = () => {
  const refRBSheet = React.useRef();

  return (
    <View>
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Entypo name="dots-three-vertical" size={20} color="gray" />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        height={200}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: '#fff',
          },
        }}>
        <View style={styles.sheetContainer}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.close()}
            style={styles.closeButton}>
            <Entypo name="cross" size={25} color="black" style={{backgroundColor: 'lightgray', borderRadius: 50}} />
          </TouchableOpacity>
          <View style={styles.sheetMain}>
            <View style={styles.sheetItem}>
              <MaterialIcons name="error" size={20} color="black" />
              <Text style={styles.sheetText}>Report News</Text>
            </View>
            <View style={styles.sheetItem}>
              <Entypo name="download" size={20} color="black" />
              <Text style={styles.sheetText}>Download</Text>
            </View>
            <View style={styles.sheetItem}>
              <Entypo name="bookmark" size={20} color="black" />
              <Text style={styles.sheetText}>Bookmark</Text>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sheetMain: {
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sheetText: {
    marginLeft: 10,
  },
});

export default ReportNews;
