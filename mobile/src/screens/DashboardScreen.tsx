import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PatientContext } from '../context/PatientContext';

export default function DashboardScreen({ navigation }: any) {
  const { t } = useTranslation();
  const context = useContext(PatientContext);

  useEffect(() => {
    // Eğer hekim görüşmeyi kabul ederse chat ekranına yönlendir
    if (context?.activeTriageSession?.status === 'accepted') {
      navigation.navigate('ChatScreen', { session: context.activeTriageSession });
    }
  }, [context?.activeTriageSession?.status, navigation]);

  const startBebekNobeti = () => {
    Alert.alert(
      t('bebekNobeti.alert1Title', 'Canlı ebe desteği başlatılsın mı?'),
      '',
      [
        { text: t('common.no', 'Hayır'), style: 'cancel' },
        { 
          text: t('common.yes', 'Evet'), 
          onPress: () => {
            Alert.alert(
              t('bebekNobeti.alert2Title', 'Ebe ile canlı görüşme başlatılıyor. Onaylıyor musunuz?'),
              '',
              [
                { text: t('common.cancel', 'İptal'), style: 'cancel' },
                { 
                  text: t('common.confirm', 'Onaylıyorum'), 
                  onPress: () => {
                    // Global state'e canlı destek talebi gönder
                    context?.setActiveTriageSession({
                      id: Math.random().toString(36).substr(2, 9),
                      patientName: 'Yeni Doğan Annesi (Simülasyon)',
                      reason: 'BebekNöbeti Canlı Destek',
                      status: 'pending'
                    });
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
    context?.endTriageSession();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SentryCompanion-AI</Text>
      <Text style={styles.subtitle}>Hasta Ana Sayfası</Text>

      <View style={styles.moduleCard}>
        <Text style={styles.cardTitle}>{t('bebekNobeti.title', 'BebekNöbeti')}</Text>
        <Text style={styles.cardDesc}>{t('bebekNobeti.description', 'Lohusa annelerimiz için canlı ebe ve hemşire desteği.')}</Text>
        
        {context?.activeTriageSession?.status === 'pending' ? (
          <View style={styles.callingView}>
            <ActivityIndicator size="small" color="#00ff00" />
            <Text style={styles.callingText}>Hekim/Ebe bekleniyor...</Text>
            <Button title={t('bebekNobeti.endCall', 'Görüşmeyi Sonlandır')} color="red" onPress={endCall} />
          </View>
        ) : (
          <Button title={t('bebekNobeti.startCall', 'Görüntülü/Sesli Canlı Destek')} onPress={startBebekNobeti} />
        )}
      </View>
      
      {/* Nöbetçi Eczane ve SentryMD Hekim Panelini Aç butonları GÖREVE İSTİNADEN KALDIRILMIŞTIR */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30
  },
  moduleCard: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },
  callingView: {
    alignItems: 'center',
    marginTop: 10
  },
  callingText: {
    color: '#006600',
    marginVertical: 10
  }
});
