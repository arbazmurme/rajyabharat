import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

const HeaderAndFooter = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScreenTap = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={styles.container}>
        {/* Header */}
        {isVisible && (
          <View style={styles.header}>
            <Text style={styles.headerText}>Top Bar</Text>
          </View>
        )}

        {/* Footer */}
        {isVisible && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Bottom Bar</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute', // Fix it at the bottom
    bottom: 0,
    width: '100%', // Take full width
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HeaderAndFooter;
