import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedWords, setSavedWords] = useState<number[]>([]);
  const [trendingIndex, setTrendingIndex] = useState(0);

  const toggleSearch = () => setSearchOpen(!searchOpen);

  const toggleSave = (id: number) => {
    setSavedWords((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  const renderSaveButton = (id: number) => (
    <TouchableOpacity
      onPress={() => toggleSave(id)}
      style={[
        styles.saveButton,
        savedWords.includes(id) && { backgroundColor: '#DBEAFE' },
      ]}
    >
      <Feather
        name="bookmark"
        size={18}
        color={savedWords.includes(id) ? '#1D4ED8' : '#1F2937'}
      />
    </TouchableOpacity>
  );

  const words = [
    {
      id: 1,
      word: 'Ubiquitous',
      meaning: 'Present, appearing, or found everywhere.',
    },
  ];

  const trendingWords = [
    {
      id: 2,
      word: 'Ephemeral',
      meaning: 'Lasting for a very short time.',
    },
    {
      id: 3,
      word: 'Serendipity',
      meaning: 'The occurrence of events by chance in a happy or beneficial way.',
    },
    {
      id: 4,
      word: 'Petrichor',
      meaning: 'A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.',
    },
    {
      id: 5,
      word: 'Ineffable',
      meaning: 'Too great or extreme to be expressed or described in words.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prevIndex) => (prevIndex + 1) % trendingWords.length);
    }, 20000); // auto-switch every 20 seconds
    return () => clearInterval(interval);
  }, [trendingWords.length]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/icon.png')}
            style={styles.appIcon}
          />
          {!searchOpen && <Text style={[styles.title, { color: theme.textColor }]}>WordWise</Text>}
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={toggleSearch} style={styles.iconWrapper}>
            <Feather name={searchOpen ? 'x' : 'search'} size={20} color={theme.iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <MaterialCommunityIcons name="microphone-outline" size={20} color={theme.iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      {searchOpen && (
        <TextInput
          style={[styles.searchInput, { backgroundColor: theme.cardBackground, color: theme.textColor, borderColor: theme.borderColor }]}
          placeholder="Search for a word"
          placeholderTextColor={theme.borderColor}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Word of the Day */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Word of the Day</Text>
          <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.borderColor }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.wordTitle, { color: theme.textColor }]}>{words[0].word}</Text>
              {renderSaveButton(words[0].id)}
            </View>
            <Text style={[styles.wordMeaning, { color: theme.textColor }]}>{words[0].meaning}</Text>
          </View>
        </View>

        {/* Daily Quote */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Daily Quote</Text>
          <View style={[styles.quoteCard, { backgroundColor: '#DBEAFE', borderColor: '#BFDBFE' }]}>
            <Text style={styles.quoteText}>
              The limits of my language mean the limits of my world.
            </Text>
            <Text style={styles.quoteAuthor}>– Ludwig Wittgenstein</Text>
          </View>
        </View>

        {/* Trending Words */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Trending Words</Text>
          <View style={[styles.trendingCard, { backgroundColor: theme.cardBackground, borderColor: theme.borderColor }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.trendingTitle, { color: theme.textColor }]}>
                {trendingWords[trendingIndex].word}
              </Text>
              {renderSaveButton(trendingWords[trendingIndex].id)}
            </View>
            <Text style={[styles.trendingDesc, { color: theme.textColor }]}>
              {trendingWords[trendingIndex].meaning}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    borderRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginHorizontal: 0,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  wordMeaning: {
    fontSize: 16,
  },
  saveButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  trendingCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginHorizontal: 0,
    marginTop: 10,
    width: '100%',
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  trendingDesc: {
    fontSize: 14,
    marginTop: 6,
  },
  quoteCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginHorizontal: 0,
    marginTop: 8,
    width: '100%',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
    alignSelf: 'flex-end',
  },
});
