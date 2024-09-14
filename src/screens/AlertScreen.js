import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure you install this package
import { checkAndSendAlerts } from '../services/alertService';

const AlertScreen = () => {
  const [coin, setCoin] = useState('');
  const [condition, setCondition] = useState('above');
  const [targetPrice, setTargetPrice] = useState('');

  const handleSetAlert = () => {
    if (!coin || !targetPrice) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const newAlert = {
      coin: coin.toLowerCase(),
      condition,
      targetPrice: parseFloat(targetPrice),
    };

    checkAndSendAlerts([newAlert]);
    Alert.alert('Alert Set', `Alert set for ${coin} at ${condition} ${targetPrice} USD`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Price Alert</Text>
      <TextInput
        placeholder="Cryptocurrency (e.g., bitcoin)"
        value={coin}
        onChangeText={setCoin}
        style={styles.input}
      />
      <Picker
        selectedValue={condition}
        onValueChange={(itemValue) => setCondition(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Above" value="above" />
        <Picker.Item label="Below" value="below" />
      </Picker>
      <TextInput
        placeholder="Target Price (USD)"
        value={targetPrice}
        onChangeText={setTargetPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Set Alert" onPress={handleSetAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    marginVertical: 8,
    backgroundColor: '#fff',
  },
});

export default AlertScreen;
