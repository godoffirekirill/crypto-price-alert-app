import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AlertForm = ({ onAddAlert }) => {
  const [cryptoSymbol, setCryptoSymbol] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  const handleAddAlert = () => {
    if (!cryptoSymbol || !targetPrice) {
      Alert.alert('Error', 'Please enter both a cryptocurrency symbol and target price.');
      return;
    }

    onAddAlert({ cryptoSymbol, targetPrice: parseFloat(targetPrice) });
    setCryptoSymbol('');
    setTargetPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cryptocurrency Symbol</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., BTC"
        value={cryptoSymbol}
        onChangeText={setCryptoSymbol}
      />
      <Text style={styles.label}>Target Price</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 50000"
        value={targetPrice}
        onChangeText={setTargetPrice}
        keyboardType="numeric"
      />
      <Button title="Add Alert" onPress={handleAddAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AlertForm;
