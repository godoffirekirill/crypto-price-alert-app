import axios from 'axios';

export const getPrediction = async (prices) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/predict', {
      prices,
    });
    return response.data.prediction;
  } catch (error) {
    console.error('Error fetching AI prediction:', error);
    throw err
  }
};