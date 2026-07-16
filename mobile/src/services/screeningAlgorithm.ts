export interface Vitals {
  respiratoryRate: number; // Soluk/dk
  heartRate: number;       // Nabız
  temperature: number;     // °C
  systolicBP: number;      // Tansiyon (Büyük)
}

export interface MewsResult {
  score: number;
  isEmergency: boolean;
  message: string;
}

export function calculateMews(vitals: Vitals): MewsResult {
  let respiratoryScore = 0;
  let heartRateScore = 0;
  let temperatureScore = 0;
  let systolicBPScore = 0;
  
  // Solunum Hızı
  if (vitals.respiratoryRate < 9) respiratoryScore = 3;
  else if (vitals.respiratoryRate >= 9 && vitals.respiratoryRate <= 14) respiratoryScore = 0;
  else if (vitals.respiratoryRate >= 15 && vitals.respiratoryRate <= 17) respiratoryScore = 1;
  else if (vitals.respiratoryRate >= 18 && vitals.respiratoryRate <= 20) respiratoryScore = 2;
  else if (vitals.respiratoryRate > 20) respiratoryScore = 3;
  
  // Kalp Atış Hızı
  if (vitals.heartRate < 40) heartRateScore = 3;
  else if (vitals.heartRate >= 40 && vitals.heartRate <= 50) heartRateScore = 1;
  else if (vitals.heartRate >= 51 && vitals.heartRate <= 100) heartRateScore = 0;
  else if (vitals.heartRate >= 101 && vitals.heartRate <= 110) heartRateScore = 1;
  else if (vitals.heartRate >= 111 && vitals.heartRate <= 129) heartRateScore = 2;
  else if (vitals.heartRate >= 130) heartRateScore = 3;
  
  // Vücut Sıcaklığı
  if (vitals.temperature < 35) temperatureScore = 2;
  else if (vitals.temperature >= 35.0 && vitals.temperature <= 38.4) temperatureScore = 0;
  else if (vitals.temperature >= 38.5) temperatureScore = 2;
  
  // Sistolik Kan Basıncı
  if (vitals.systolicBP < 70) systolicBPScore = 3;
  else if (vitals.systolicBP >= 70 && vitals.systolicBP <= 80) systolicBPScore = 2;
  else if (vitals.systolicBP >= 81 && vitals.systolicBP <= 100) systolicBPScore = 1;
  else if (vitals.systolicBP >= 101 && vitals.systolicBP <= 199) systolicBPScore = 0;
  else if (vitals.systolicBP >= 200) systolicBPScore = 2;
  
  const totalScore = respiratoryScore + heartRateScore + temperatureScore + systolicBPScore;
  
  const isEmergency = totalScore >= 5 || 
                      respiratoryScore === 3 || 
                      heartRateScore === 3 || 
                      systolicBPScore === 3;
                      
  return {
    score: totalScore,
    isEmergency,
    message: isEmergency ? "ACİL HEKİM ALARMI" : "Normal",
  };
}
