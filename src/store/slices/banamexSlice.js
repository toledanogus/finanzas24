import {  createSlice } from '@reduxjs/toolkit';


export const getMsiSlice = createSlice({
name: 'getMsi',
  initialState:{
    conceptosBanamex: [],
    mensualidad: [],
    
  },
  reducers: {
    setConceptosBanamex: (state, action) => {
      state.conceptosBanamex = action.payload.conceptosBanamex;
    },
    setMensualidad: (state, action) => {
      state.mensualidad = action.payload.mensualidad;
    }
  },
})
// Action creators are generated for each case reducer function
export const { setConceptosBanamex, setMensualidad } = getMsiSlice.actions  