import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import CryptoCard from '../components/CryptoCard';
import { getCryptoPrices } from '../services/cryptoService';

const HomeScreen = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Fetch crypto prices when the component mounts
    fetchCryptoPrices();
  }, []);

  const fetchCryptoPrices = async () => {
    try {
      setLoading(true);
      const data = await getCryptoPrices(['bitcoin', 'ethereum', 'litecoin']);
      const formattedData = Object.keys(data).map(key => ({
        id: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        price: data[key].usd,
      }));
      setCryptos(formattedData);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCryptoPrices();
    setRefreshing(false);
  };

  const renderCrypto = ({ item }) => (
    <CryptoCard name={item.name} price={item.price} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={cryptos}
          renderItem={renderCrypto}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
});

export default HomeScreen;
