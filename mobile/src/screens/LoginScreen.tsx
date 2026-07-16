import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [tcIdentity, setTcIdentity] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (tcIdentity === '22222222222' && password === '1234') {
      navigation.navigate('HekimNobeti');
    } else {
      Alert.alert(t('login.errorTitle', 'Hata'), t('login.errorMessage', 'Hatalı T.C. Kimlik veya Şifre!'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login.title', 'Hekim Girişi')}</Text>
      
      <TextInput
        style={styles.input}
        placeholder={t('login.tcPlaceholder', 'T.C. Kimlik No')}
        value={tcIdentity}
        onChangeText={setTcIdentity}
        keyboardType="numeric"
        maxLength={11}
      />
      <TextInput
        style={styles.input}
        placeholder={t('login.passwordPlaceholder', 'Şifre')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title={t('login.loginButton', 'Giriş Yap')} onPress={handleLogin} />

      <View style={{ marginTop: 40 }}>
        <Button 
          title={t('login.guestButton', 'BebekNöbeti (Hasta/Lohusa Girişi)')} 
          onPress={() => navigation.navigate('BebekNobeti')} 
          color="#888" 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8
  }
});
