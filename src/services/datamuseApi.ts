// import axios from 'axios';
import { DataMuseWord } from '../types';

// const DATAMUSE_API_BASE = 'https://api.datamuse.com';

/**
 * Fetch words that are strongly associated with the given word
 * @param word - The word to find associations for
 * @param maxResults - Maximum number of results to return (default: 10)
 * @returns Promise with array of associated words
 */
export async function fetchAssociatedWords(
  _word: string,
  _maxResults: number = 10
): Promise<DataMuseWord[]> {
  // TEMPORARY: Return same 8 words while API is down
  // TODO: Remove this when API is back up
  const mockWords: DataMuseWord[] = [
    { word: 'happy', score: 1000 },
    { word: 'joy', score: 950 },
    { word: 'cheerful', score: 900 },
    { word: 'pleased', score: 850 },
    { word: 'content', score: 800 },
    { word: 'glad', score: 750 },
    { word: 'delighted', score: 700 },
    { word: 'satisfied', score: 650 },
  ];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockWords;
  
  // Original API call code (will be used when API is back up)
  /* eslint-disable no-unreachable */
  // try {
  //   const response = await axios.get<DataMuseWord[]>(`${DATAMUSE_API_BASE}/words`, {
  //     params: {
  //       ml: word,
  //       max: maxResults
  //     },
  //     timeout: 15000, // 15 second timeout
  //   });
  //   
  //   return response.data;
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     if (error.code === 'ECONNABORTED') {
  //       throw new Error('Request timed out. Please try again.');
  //     }
  //     if (error.response) {
  //       throw new Error(`API error: ${error.response.status} - ${error.response.statusText}`);
  //     }
  //     if (error.request) {
  //       throw new Error('No response from API. Please check your internet connection.');
  //     }
  //   }
  //   throw new Error('Failed to fetch word associations. Please try again.');
  // }
  /* eslint-enable no-unreachable */
}
