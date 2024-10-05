import { useState, useEffect } from 'react';
import { firestore } from '@/firebase/firebaseConfig';
import { useAuth } from '@/hooks/useAuth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';

interface Asset {
  coinName: string;
  amount: number;
}

export const usePortfolio = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setAssets([]);
      setLoading(false);
      return;
    }

    const userRef = doc(collection(firestore, 'portfolios'), user.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setAssets(doc.data()?.assets || []);
      } else {
        setAssets([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) return;
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      setSuggestions(response.data.coins.map((coin: any) => coin.name));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return { assets, loading, suggestions, fetchSuggestions };
};