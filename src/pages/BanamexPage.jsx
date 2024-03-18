/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  setConceptosBanamex,
  setMensualidad,
  setConceptosBanamexProcesados,
} from "../store/slices/banamexSlice";
import { useEffect, useState } from "react";
import { getMsi } from "../store/slices/thunks";
import { RegistroBanamex } from "./components/RegistroBanamex";
import { setRedibujar } from "../store/slices/registroBanamex";

export const BanamexPage = () => {
  const { conceptosBanamex, conceptosBanamexProcesados, mensualidad } =
    useSelector((state) => state.getMsi);
  const { quincena } = useSelector((state) => state.generales);
  const { redibujar } = useSelector((state) => state.registroBanamex);

  const dispatch = useDispatch();
  const [mensualidadPagar, setMensualidadPagar] = useState([]);
  const [newConcept, setNewConcept] = useState([]);
  let quin;
  let mes;
  //Funciones***************************************************
  switch (quincena) {
    case "1Enero":
      quin = 1;
      break;
    case "2Enero":
      quin = 2;
      break;
    case "1Febrero":
      quin = 3;
      break;
    case "2Febrero":
      quin = 4;
      break;
    case "1Marzo":
      quin = 5;
      break;
    case "2Marzo":
      quin = 6;
      break;
    case "1Abril":
      quin = 7;
      break;
    case "2Abril":
      quin = 8;
      break;
    case "1Mayo":
      quin = 9;
      break;
    case "2Mayo":
      quin = 10;
      break;
    case "1Junio":
      quin = 11;
      break;
    case "2Junio":
      quin = 12;
      break;
    case "1Julio":
      quin = 13;
      break;
    case "2Julio":
      quin = 14;
      break;
    case "1Agosto":
      quin = 15;
      break;
    case "2Agosto":
      quin = 16;
      break;
    case "1Septiembre":
      quin = 17;
      break;
    case "2Septiembre":
      quin = 18;
      break;
    case "1Octubre":
      quin = 19;
      break;
    case "2Octubre":
      quin = 20;
      break;
    case "1Noviembre":
      quin = 21;
      break;
    case "2Noviembre":
      quin = 22;
      break;
    case "1Diciembre":
      quin = 23;
      break;
    case "2Diciembre":
      quin = 24;
      break;
    default:
      // Valor predeterminado si no coincide con ninguna quincena conocida
      quin = 0;
  }
  const calcularPagoMsi = () => {
    const mensualidades = Object.entries(conceptosBanamex).map(
      ([, cantidad]) => {
        const result = cantidad[2] / cantidad[3];
        return result.toFixed(2);
      }
    );
    setMensualidadPagar(mensualidades);
  };


let apareceMsi = false;


  const calculoMes = () => { 
    const nuevoConceptos = Object.entries(conceptosBanamex).map(([, mesD]) => {
      const msi = mesD[0];
      const concepto = mesD[1];
      const cantidad = mesD[2];
      const aCuantosMeses = mesD[3];
      let qRegistro;
      

      if (mesD[4] % 2 === 0) {
        qRegistro = mesD[4] + 2;
      } else {
        qRegistro = mesD[4] + 1;
      }

      if (qRegistro >= quin+2 && qRegistro <= qRegistro+(mesD[3]*2) && mesD[3] >= 2) {
        apareceMsi=true;
      } else {
        apareceMsi= false;
      }

      return [msi, concepto, cantidad, aCuantosMeses, qRegistro, apareceMsi];
    });
    console.log(apareceMsi);
    console.log(`Funcion Nuevo concepto ${nuevoConceptos}`);
    setNewConcept(nuevoConceptos);
  };

  //Efectos*********************************************************

  useEffect(() => {
    dispatch(getMsi()); //Escribe conceptosBanamex del thunks
  }, [dispatch, redibujar]);

  useEffect(() => {
    calcularPagoMsi();
  }, [conceptosBanamex]);

  useEffect(() => {
    calculoMes();
  }, [conceptosBanamex, redibujar]);

  useEffect(() => {
    dispatch(setMensualidad({ mensualidad: mensualidadPagar }));
  }, [mensualidadPagar, redibujar]);

  useEffect(() => {
    dispatch(
      setConceptosBanamexProcesados({ conceptosBanamexProcesados: newConcept })
    );
  }, [newConcept, redibujar]);

  useEffect(() => {
    console.log(apareceMsi)
  }, [newConcept]);
  

  useEffect(() => {
    console.log(`Conceptos Banamex ${conceptosBanamex}`);
    console.log(`Conceptos Procesados ${conceptosBanamexProcesados}`);
  }, [conceptosBanamex, conceptosBanamexProcesados]);

  return (
    <>
      <div>BanamexPage</div>
      <h3>Meses sin intereses</h3>
      <h3>{quincena}</h3>
      <table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Cantidad</th>
            <th>MSI</th>
            <th>Quincena de Registro</th>
            <th>Debo</th>
            <th>A pagar</th>
            <th>Mes a Pagar</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(conceptosBanamexProcesados).map(
            ([index, concepto], indice1) => {
              if (concepto[4] === quin || concepto[4] === quin - 1 || concepto[5] === true) {
                return (
                  <tr key={index}>
                    <td>{concepto[1]}</td>
                    <td>{`$ ${concepto[2]}`}</td>
                    <td>{concepto[3]}</td>
                    <td>{concepto[4]}</td>
                    <td></td>
                    <td>{`$ ${mensualidad[indice1]}`}</td>
                  </tr>
                );
              } else {
                return null; // Si no se cumple la condición, retornamos null para no renderizar nada
              }
            }
          )}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <RegistroBanamex />
      <div>mensualidad del slice {mensualidad}</div>
    </>
  );
};
