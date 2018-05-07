export function selectPatient(patient){
  return{
    type: 'PATIENT_SELECTED',
    payload: patient
  };
}