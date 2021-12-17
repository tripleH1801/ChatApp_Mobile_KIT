import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input, Text as PaperText } from 'react-native-paper'
import { theme } from '../core/theme'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

export default function TextInput({ errorText, description, ...props }) {

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  input: {
    // backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    // color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    // color: theme.colors.error,
    paddingTop: 8,
  },
})
