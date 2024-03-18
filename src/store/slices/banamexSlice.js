import {  createSlice } from '@reduxjs/toolkit';


export const getMsiSlice = createSlice({
name: 'getMsi',
  initialState:{
    conceptosBanamex: [],
    conceptosBanamexProcesados: [],
    mensualidad: [],
    
  },
  reducers: {
    setConceptosBanamex: (state, action) => {
      state.conceptosBanamex = action.payload.conceptosBanamex;
    },
    setMensualidad: (state, action) => {
      state.mensualidad = action.payload.mensualidad;
    },
    setConceptosBanamexProcesados: (state, action) => {
      state.conceptosBanamexProcesados = action.payload.conceptosBanamexProcesados;
    },
  },
})
// Action creators are generated for each case reducer function
export const { setConceptosBanamex, setMensualidad, setConceptosBanamexProcesados } = getMsiSlice.actions;