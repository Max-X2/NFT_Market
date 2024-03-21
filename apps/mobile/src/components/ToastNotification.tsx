import React from 'react';
import { View, StyleSheet, ToastAndroid, Button, StatusBar } from 'react-native';

export default function App() {
  function showToast() {
    ToastAndroid.show('NFT Listed!', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <Button title="Show Toast" onPress={showToast} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#6638f0',
    padding: 8,
  },
});
