export default function(state = null, action){
  console.log(state, action);
  switch(action.type){
    case 'PATIENT_SELECTED':
      return action.payload;

  }
  return state;
};