import { selectPagados, selectQuincena, setConceptos } from "./generalesSlice";

import {setConceptosBanamex} from "./banamexSlice"


export const getConceptos = () => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch, getState) => {
    const quincena = selectQuincena(getState());
    const jsonQuincena = { quincena };
    

    const resp = await fetch("./php/recibirConceptos.php", {
      method: "POST",
      body: JSON.stringify(jsonQuincena),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    

    dispatch(setConceptos({ conceptos: data }));
  };
};

export const sendPagados = () => {
  return async (dispatch, getState) => {
    const pagados = selectPagados(getState());
    const quincena = selectQuincena(getState());
    const unidos = {
      objetoPagados:{pagados},
      objetoQuincena:{quincena}
    }
    /* const jsonPagados = { pagados };
    console.log(jsonPagados); */

    // eslint-disable-next-line no-unused-vars
    const resp = await fetch("./php/enviarPagados.php", {
      method: "POST",
      body: JSON.stringify(unidos),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

export const getMsi = () => {
  return async (dispatch, getState) => {
    const quincena2 = selectQuincena(getState());
    let jsonQuincena2 = new Object();
    jsonQuincena2['quincena']=quincena2;
    console.log(`Quincena actual ${JSON.stringify(jsonQuincena2)}`);
    

    const resp = await fetch("./php/recibirMsi.php", {
      method: "POST",
      body: JSON.stringify(jsonQuincena2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    console.log(`Data como viene del JSON ${data}`);
    
    dispatch(setConceptosBanamex({ conceptosBanamex: data }));
  };
};
