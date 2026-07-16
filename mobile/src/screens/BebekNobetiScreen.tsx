import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function BebekNobetiScreen() {
  const { t } = useTranslation();
  const [isCalling, setIsCalling] = useState(false);

  const startSupportCall = () => {
    // 1st Approval
    Alert.alert(
      t('bebekNobeti.alert1Title', 'Canlı ebe desteği başlatılsın mı?'),
      '',
      [
        { text: t('common.no', 'Hayır'), style: 'cancel' },
        { 
          text: t('common.yes', 'Evet'), 
          onPress: () => {
            // 2nd Approval
            Alert.alert(
              t('bebekNobeti.alert2Title', 'Ebe ile canlı görüşme başlatılıyor. Onaylıyor musunuz?'),
              '',
              [
                { text: t('common.cancel', 'İptal'), style: 'cancel' },
                { 
                  text: t('common.confirm', 'Onaylıyorum'), 
                  onPress: () => {
                    setIsCalling(true);
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const endCall = () => {
    setIsCalling(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('bebekNobeti.title', 'BebekNöbeti')}</Text>
      <Text style={styles.subtitle}>
        {t('bebekNobeti.description', 'Lohusa annelerimiz için canlı ebe ve hemşire desteği.')}
      </Text>

      {isCalling ? (
        <View style={styles.callContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.callText}>
            {t('bebekNobeti.calling', 'Canlı destek görüşmesi devam ediyor... (WebRTC Simülasyonu)')}
          </Text>
          <Button title={t('bebekNobeti.endCall', 'Görüşmeyi Sonlandır')} color="red" onPress={endCall} />
        </View>
      ) : (
        <Button 
          title={t('bebekNobeti.startCall', 'Görüntülü/Sesli Canlı Destek')} 
          onPress={startSupportCall} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666'
  },
  callContainer: {
    padding: 20,
    backgroundColor: '#e0ffe0',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%'
  },
  callText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
    color: '#006600'
  }
});
