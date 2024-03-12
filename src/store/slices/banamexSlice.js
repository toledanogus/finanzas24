import {  createSlice } from '@reduxjs/toolkit';


export const getMsiSlice = createSlice({
name: 'getMsi',
  initialState:{
    conceptosBanamex: [''],
    
  },
  reducers: {
    setConceptosBanamex: (state, action) => {
      state.conceptosBanamex = action.payload.conceptosBanamex;
    },
  },
})
// Action creators are generated for each case reducer function
export const { setConceptosBanamex} = getMsiSlice.actions  