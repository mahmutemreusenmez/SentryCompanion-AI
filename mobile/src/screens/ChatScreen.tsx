import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { PatientContext } from '../context/PatientContext';
import { useTranslation } from 'react-i18next';

export default function ChatScreen({ route, navigation }: any) {
  const { t } = useTranslation();
  const context = useContext(PatientContext);
  const [messages, setMessages] = useState<{ id: string, sender: string, text: string }[]>([]);
  const [inputText, setInputText] = useState('');

  const session = route.params?.session || context?.activeTriageSession;
  const isPhysician = route.params?.isPhysician || false;
  const senderName = isPhysician ? 'Hekim/Ebe' : 'Hasta';

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Math.random().toString(), sender: senderName, text: inputText }]);
      setInputText('');
    }
  };

  const endChat = () => {
    context?.endTriageSession();
    // Geri dön veya anasayfaya at
    navigation.goBack();
  };

  if (!session) {
    return (
      <View style={styles.container}>
        <Text>Aktif bir görüşme bulunamadı.</Text>
        <Button title="Geri Dön" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Canlı Görüşme: {session.patientName}</Text>
        <Button title="Sonlandır" color="red" onPress={endChat} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === senderName ? styles.myMessage : styles.theirMessage]}>
            <Text style={styles.senderText}>{item.sender}</Text>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı yazın..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Gönder" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%'
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end'
  },
  theirMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start'
  },
  senderText: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2
  },
  msgText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fafafa'
  }
});
