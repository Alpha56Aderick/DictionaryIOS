import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { JSX } from 'react';

// Tab layout component
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// Define tab screen type
type TabScreen = {
  name: string;
  title: string;
  icon: JSX.Element;
};

// Tab configuration
const tabScreens: TabScreen[] = [
  {
    name: 'home/index',
    title: 'Home',
    icon: <Feather name="home" size={22} />,
  },
  {
    name: 'saved/index',
    title: 'Saved',
    icon: <Feather name="bookmark" size={22} />,
  },
  {
    name: 'words/index',
    title: 'Words',
    icon: <MaterialCommunityIcons name="book-outline" size={22} />,
  },
  {
    name: 'settings/index',
    title: 'Settings',
    icon: <Feather name="settings" size={22} />,
  },
];

// Extract styles into constants
const tabBarLabelStyle = {
  fontSize: 11,
  fontWeight: '700' as '700',
};

// Function to render tab icons
const renderTabIcon = (icon: JSX.Element, color: string, size: number) =>
  React.cloneElement(icon, { color, size });

export default function TabLayout() {
  const { theme } = useTheme();

  const tabBarStyle = {
    backgroundColor: theme.backgroundColor, // Use backgroundColor for tab bar background
    borderTopColor: theme.borderColor,
    borderTopWidth: 0.5,
    height: 65,
    paddingTop: 5,
  };

  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.iconColor,
          tabBarInactiveTintColor: theme.borderColor,
          tabBarStyle,
          tabBarLabelStyle,
          // Removed tabBarIndicatorStyle as it is not supported in this context
        }}
      >
        {tabScreens.map(({ name, title, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title,
              tabBarIcon: ({ color, size }) => renderTabIcon(icon, color, size),
          tabBarActiveBackgroundColor: theme.cardBackground, // Active tab has cardBackground color
          tabBarInactiveBackgroundColor: theme.backgroundColor, // Inactive tab has backgroundColor
            }}
          />
        ))}
      </Tabs>
    </ThemeProvider>
  );
}
