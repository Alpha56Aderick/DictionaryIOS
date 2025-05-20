import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import wordsData from '../../../assets/data/words.json';
import { useTheme } from '../../context/ThemeContext';

type Word = {
  id: number;
  word: string;
  partOfSpeech?: string;
  meaning?: string;
  synonyms?: string[];
  example?: string;
};

const { height } = Dimensions.get('window');

const filterOptions = ['All', 'A-Z', 'Z-A', 'Short Words', 'Long Words'];

const WordsScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const filteredWords = wordsData
    .filter((w: Word) => w.word.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a: Word, b: Word) => {
      if (filter === 'A-Z') return a.word.localeCompare(b.word);
      if (filter === 'Z-A') return b.word.localeCompare(a.word);
      return 0;
    })
    .filter((w: Word) => {
      if (filter === 'Short Words') return w.word.length <= 6;
      if (filter === 'Long Words') return w.word.length >= 9;
      return true;
    });

  const handleWordPress = (word: Word) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  const renderWordCard = ({ item }: { item: Word }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleWordPress(item)}>
      <View style={styles.cardContent}>
        <Ionicons name="book-outline" size={24} color={theme.iconColor} style={{ marginRight: 10 }} />
        <Text style={[styles.wordText, { color: theme.textColor }]}>{item.word}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={[styles.searchContainer, { backgroundColor: theme.cardBackground }]}>
          <Ionicons name="search" size={20} color={theme.iconColor} />
          <TextInput
            style={[styles.searchInput, { color: theme.textColor }]}
            placeholder="Search for a word..."
            placeholderTextColor={theme.borderColor}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color={theme.iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.filterButton, filter === option && styles.activeFilter, { backgroundColor: filter === option ? theme.iconColor : theme.cardBackground }]}
              onPress={() => setFilter(option)}
            >
              <Text style={[styles.filterText, filter === option && styles.activeFilterText, { color: filter === option ? theme.cardBackground : theme.textColor }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Word List Section */}
      <View style={styles.wordListSection}>
        <FlatList
          data={filteredWords}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={renderWordCard}
        />
      </View>

      {/* Modern Modal */}
      {selectedWord && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.bottomSheet, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalWord, { color: theme.textColor }]}>{selectedWord.word}</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color={theme.iconColor} />
                </Pressable>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.infoRow}>
                  <Ionicons name="reader-outline" size={18} color={theme.iconColor} />
                  <Text style={[styles.infoText, { color: theme.textColor }]}>
                    <Text style={styles.infoLabel}>Part of Speech:</Text>{' '}
                    {selectedWord.partOfSpeech || 'N/A'}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="bulb-outline" size={18} color={theme.iconColor} />
                  <Text style={[styles.infoText, { color: theme.textColor }]}>
                    <Text style={styles.infoLabel}>Meaning:</Text>{' '}
                    {selectedWord.meaning || 'N/A'}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="swap-horizontal-outline" size={18} color={theme.iconColor} />
                  <Text style={[styles.infoText, { color: theme.textColor }]}>
                    <Text style={styles.infoLabel}>Synonyms:</Text>{' '}
                    {selectedWord.synonyms?.join(', ') || 'N/A'}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="chatbox-ellipses-outline" size={18} color={theme.iconColor} />
                  <Text style={[styles.infoText, { color: theme.textColor }]}>
                    <Text style={styles.infoLabel}>Example:</Text>{' '}
                    {selectedWord.example || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 30,
    zIndex: 1,
  },
  searchSection: {
    marginBottom: 12,
  },
  filterSection: {
    marginBottom: 20,
  },
  wordListSection: {
    flex: 1,
  },
  filterButton: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  activeFilter: {
  },
  filterText: {
    fontWeight: '600',
  },
  activeFilterText: {
    fontWeight: '600',
  },
  list: {
    paddingBottom: 100,
    marginTop: 10,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordText: {
    fontSize: 18,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: height * 0.4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalWord: {
    fontSize: 24,
    fontWeight: '700',
  },
  modalBody: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontWeight: '600',
  },
});

export default WordsScreen;
