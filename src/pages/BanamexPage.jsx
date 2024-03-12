import { useDispatch, useSelector } from "react-redux";
import { setConceptosBanamex } from "../store/slices/banamexSlice";
import { useEffect, useState } from "react";
import { getMsi } from "../store/slices/thunks";

export const BanamexPage = () => {
  const { conceptosBanamex } = useSelector((state) => state.getMsi);
  const dispatch = useDispatch();
  const { quincena } = useSelector((state) => state.generales);

  useEffect(() => {
    dispatch(getMsi());
  }, []);

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
          {Object.entries(conceptosBanamex).map(([index, concepto]) => (
            <tr key={index}>
              <td>{concepto[1]}</td>
              <td>{concepto[2]}</td>
              <td>{concepto[3]}</td>
              <td>{concepto[4]}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button >Clic</button>
      {/*  { <div>{conceptosBanamex}</div>} */}
    </>
  );
};
