/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  setConceptosBanamex,
  setMensualidad,
} from "../store/slices/banamexSlice";
import { useEffect, useState } from "react";
import { getMsi } from "../store/slices/thunks";
import { RegistroBanamex } from "./components/RegistroBanamex";
import { setRedibujar } from "../store/slices/registroBanamex";

export const BanamexPage = () => {
  const { conceptosBanamex, mensualidad } = useSelector(
    (state) => state.getMsi
  );
  const { quincena } = useSelector((state) => state.generales);
  const { redibujar } = useSelector((state) => state.registroBanamex);

  const dispatch = useDispatch();
  const [mensualidadPagar, setMensualidadPagar] = useState([]);

  const calcularPagoMsi = () => {
    const mensualidades = Object.entries(conceptosBanamex).map(
      ([, cantidad]) => {
        const result = cantidad[2] / cantidad[3];
        return result.toFixed(2);
      }
    );
    setMensualidadPagar(mensualidades);
  };

  useEffect(() => {
    dispatch(getMsi()); //Escribe conceptosBanamex del thunks
  }, [dispatch, redibujar]);

  useEffect(() => {
    console.log(conceptosBanamex);
  }, [conceptosBanamex]);

  useEffect(() => {
    calcularPagoMsi();
  }, [conceptosBanamex]);

  useEffect(() => {
    dispatch(setMensualidad({ mensualidad: mensualidadPagar }));
  }, [mensualidadPagar, redibujar]);
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
            <th>Meses</th>
            <th>Mes a pagar</th>
            <th>Debo</th>
            <th>A pagar</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(conceptosBanamex).map(
            ([index, concepto], indice1) => (
              <tr key={index}>
                <td>{concepto[1]}</td>
                <td>{`$ ${concepto[2]}`}</td>
                <td>{concepto[3]}</td>
                <td>{concepto[4]}</td>
                <td></td>
                <td>{`$ ${mensualidad[indice1]}`}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <RegistroBanamex />
      <div>mensualidad del slice {mensualidad}</div>
    </>
  );
};
