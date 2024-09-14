import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getPrediction } from '../services/predictionService';  // Adjust the import path if necessary

const PredictionScreen = () => {
  const [prices, setPrices] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchPrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      const priceArray = prices.split(',').map(price => parseFloat(price.trim()));
      const result = await getPrediction(priceArray);
      setPrediction(result);
    } catch (err) {
      setError('Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Prediction</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter prices separated by commas"
        value={prices}
        onChangeText={setPrices}
        keyboardType="numeric"
      />
      <Button title="Get Prediction" onPress={handleFetchPrediction} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {prediction !== null && <Text style={styles.result}>Prediction: {prediction}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
  result: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default PredictionScreen;
