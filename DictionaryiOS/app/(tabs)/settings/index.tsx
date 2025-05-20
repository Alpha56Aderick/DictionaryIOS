import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = () => {
  const { darkMode, toggleDarkMode, theme } = useTheme();
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [doNotDisturb, setDoNotDisturb] = React.useState(false);
  const [hapticFeedback, setHapticFeedback] = React.useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Section title="Account Settings" theme={theme}>
        <SettingItem label="Profile" icon="person-outline" onPress={() => console.log('Profile')} theme={theme} />
        <SettingItem label="Email & Phone" icon="mail-outline" theme={theme} />
        <SettingItem label="Password" icon="lock-closed-outline" theme={theme} />
      </Section>

      <Section title="Appearance" theme={theme}>
        <SettingToggle label="Dark Mode" value={darkMode} onToggle={toggleDarkMode} icon="moon-outline" theme={theme} />
        <SettingItem label="Font Size" icon="text-outline" theme={theme} />
        <SettingItem label="App Icon" icon="apps-outline" theme={theme} />
      </Section>

      <Section title="Notifications" theme={theme}>
        <SettingToggle label="Push Notifications" value={pushNotifications} onToggle={setPushNotifications} icon="notifications-outline" theme={theme} />
        <SettingItem label="Notification Categories" icon="list-outline" theme={theme} />
        <SettingToggle label="Do Not Disturb" value={doNotDisturb} onToggle={setDoNotDisturb} icon="remove-circle-outline" theme={theme} />
      </Section>

      <Section title="Privacy" theme={theme}>
        <SettingItem label="Data Sharing" icon="share-social-outline" theme={theme} />
        <SettingItem label="Permissions" icon="shield-checkmark-outline" theme={theme} />
        <SettingItem label="Blocked Users" icon="close-circle-outline" theme={theme} />
      </Section>

      <Section title="Accessibility" theme={theme}>
        <SettingToggle label="Haptic Feedback" value={hapticFeedback} onToggle={setHapticFeedback} icon="pulse-outline" theme={theme} />
        <SettingItem label="Text-to-Speech" icon="mic-outline" theme={theme} />
        <SettingItem label="Screen Reader" icon="eye-off-outline" theme={theme} />
      </Section>

      <Section title="Support" theme={theme}>
        <SettingItem label="Help Center" icon="help-circle-outline" theme={theme} />
        <SettingItem label="Report a Bug" icon="bug-outline" theme={theme} />
        <SettingItem label="Feedback" icon="chatbubble-ellipses-outline" theme={theme} />
      </Section>

      <Section title="About" theme={theme}>
        <SettingItem label="App Version" icon="information-circle-outline" theme={theme} />
        <SettingItem label="Terms & Privacy" icon="document-text-outline" theme={theme} />
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, children, theme }: { title: string; children: React.ReactNode; theme: any }) => (
  <View style={[styles.section]}>
    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{title}</Text>
    <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.borderColor, borderWidth: 1 }]}>
      {children}
    </View>
  </View>
);

const SettingItem = ({ label, icon, onPress, theme }: { label: string; icon: string; onPress?: () => void; theme: any }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { borderBottomColor: theme.borderColor }]}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={20} color={theme.iconColor} style={styles.icon} />
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
    </View>
    <Icon name="chevron-forward-outline" size={20} color="#aaa" />
  </TouchableOpacity>
);

const SettingToggle = ({ label, value, onToggle, icon, theme }: { label: string; value: boolean; onToggle: (val: boolean) => void; icon: string; theme: any }) => (
  <View style={[styles.item, { borderBottomColor: theme.borderColor }]}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={20} color={theme.iconColor} style={styles.icon} />
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
    </View>
    <Switch value={value} onValueChange={onToggle} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
  },
  icon: {
    marginRight: 15,
  },
});

export default SettingsScreen;
