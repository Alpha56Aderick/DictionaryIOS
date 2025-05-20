import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Mock words data (this would normally be in a words.json file)
const wordsData = [
  {
    word: "Courage",
    definition: "The ability to do something that frightens one.",
    partOfSpeech: "noun"
  },
  {
    word: "Inspire",
    definition: "To fill someone with the urge or ability to do or feel something.",
    partOfSpeech: "verb"
  },
  {
    word: "Success",
    definition: "The accomplishment of an aim or purpose.",
    partOfSpeech: "noun"
  }
];

export default function FavoriteWordsScreen() {
  const { theme } = useTheme();
  const [favoriteWords, setFavoriteWords] = useState<any[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade in animation

  // Load favorite words from the mock data (simulating loading from words.json)
  useEffect(() => {
    setFavoriteWords(wordsData);
  }, []);

  // Function to add a new favorite word
  const addFavoriteWord = () => {
    const newWord = {
      word: `Word ${favoriteWords.length + 1}`,
      definition: "A placeholder definition.",
      partOfSpeech: "noun"
    };
    setFavoriteWords([...favoriteWords, newWord]);

    // Fade-in effect when a new word is added
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Function to remove a favorite word
  const removeFavoriteWord = (index: number) => {
    setFavoriteWords(favoriteWords.filter((_, i) => i !== index));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Favorite Words</Text>
      <FlatList
        data={favoriteWords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Animated.View style={[styles.item, { opacity: fadeAnim, backgroundColor: theme.cardBackground }]}>
            <View style={styles.itemContent}>
              <View style={styles.wordRow}>
                <Text style={[styles.itemText, { color: theme.textColor }]}>{item.word}</Text>
                <View style={[styles.partOfSpeechContainer, { backgroundColor: theme.borderColor }]}>
                  <Text style={[styles.partOfSpeechText, { color: theme.textColor }]}>{item.partOfSpeech}</Text>
                </View>
              </View>
              <Text style={[styles.definitionText, { color: theme.textColor }]}>{item.definition}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFavoriteWord(index)} style={{ position: 'absolute', right: 10, top: 18 }}>
              <Ionicons name="trash-bin-outline" size={24} color="#FF6347" />
            </TouchableOpacity>
          </Animated.View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={addFavoriteWord}>
        <Text style={styles.buttonText}>Add Favorite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  item: {
    padding: 18,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ translateY: 10 }],
    opacity: 1,
  },
  itemContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partOfSpeechContainer: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  partOfSpeechText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemText: {
    fontSize: 18,
  },
  definitionText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
