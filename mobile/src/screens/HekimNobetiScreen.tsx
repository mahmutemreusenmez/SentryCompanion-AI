import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { calculateMews } from '../services/screeningAlgorithm';
import { PatientContext } from '../context/PatientContext';

// Mock patient data
const patients = [
  { id: '1', name: 'Ayşe Yılmaz', vitals: { respiratoryRate: 22, heartRate: 135, temperature: 39, systolicBP: 60 } },
  { id: '2', name: 'Fatma Kaya', vitals: { respiratoryRate: 16, heartRate: 80, temperature: 37, systolicBP: 120 } },
];

export default function HekimNobetiScreen({ navigation }: any) {
  const { t } = useTranslation();
  const context = useContext(PatientContext);

  const handleAction = (action: string, patientName: string) => {
    Alert.alert(
      t('hekimNobeti.actionTitle', 'İşlem Başarılı'),
      `${patientName} için '${action}' simülasyonu başlatıldı.`
    );
  };

  const renderPatient = ({ item }: { item: typeof patients[0] }) => {
    const mews = calculateMews(item.vitals);
    const isHighRisk = mews.isEmergency;

    return (
      <View style={[styles.patientCard, { borderColor: isHighRisk ? 'red' : 'green', borderWidth: 2 }]}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text>Solunum: {item.vitals.respiratoryRate} | Nabız: {item.vitals.heartRate}</Text>
        <Text>Ateş: {item.vitals.temperature} | Tansiyon: {item.vitals.systolicBP}</Text>
        
        <View style={styles.mewsBadge}>
          <Text style={{ color: isHighRisk ? 'red' : 'green', fontWeight: 'bold' }}>
            MEWS Skoru: {mews.score} - {isHighRisk ? t('hekimNobeti.highRisk', 'YÜKSEK RİSK!') : t('hekimNobeti.normal', 'Normal')}
          </Text>
        </View>

        {isHighRisk && (
          <View style={styles.actionButtons}>
            <Button title={t('hekimNobeti.observe', 'Gözlem Öner')} onPress={() => handleAction(t('hekimNobeti.observe', 'Gözlem Öner'), item.name)} />
            <Button title={t('hekimNobeti.updatePrescription', 'Reçete Güncelle')} onPress={() => handleAction(t('hekimNobeti.updatePrescription', 'Reçete Güncelle'), item.name)} />
            <Button title={t('hekimNobeti.callAmbulance', 'Acil Ambulans Yönlendir')} color="red" onPress={() => handleAction(t('hekimNobeti.callAmbulance', 'Acil Ambulans Yönlendir'), item.name)} />
          </View>
        )}
      </View>
    );
  };

  const acceptCall = () => {
    context?.acceptTriageSession();
    navigation.navigate('ChatScreen', { isPhysician: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('hekimNobeti.title', 'HekimNöbeti Paneli')}</Text>
      
      {context?.activeTriageSession?.status === 'pending' && (
        <View style={styles.triageAlert}>
          <Text style={styles.triageTitle}>🚨 Canlı Triyaj Talebi 🚨</Text>
          <Text>Hasta: {context.activeTriageSession.patientName}</Text>
          <Text>Sebep: {context.activeTriageSession.reason}</Text>
          <View style={{ marginTop: 10 }}>
            <Button title="Görüşmeyi Kabul Et" color="green" onPress={acceptCall} />
          </View>
        </View>
      )}

      <FlatList
        data={patients}
        keyExtractor={item => item.id}
        renderItem={renderPatient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  triageAlert: {
    backgroundColor: '#ffffe0',
    borderColor: '#ffcc00',
    borderWidth: 2,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  triageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d97706',
    marginBottom: 5
  },
  patientCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  mewsBadge: {
    marginVertical: 10,
    padding: 5,
    backgroundColor: '#eee',
    borderRadius: 5
  },
  actionButtons: {
    marginTop: 10,
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
