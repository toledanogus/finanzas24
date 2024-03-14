import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConceptos, sendPagados } from "../store/slices/thunks";
import {
  seleccionQuincenaMes,
  setPagados,
} from "../store/slices/generalesSlice";
import { useFetch } from "../hooks/useFetch";
import { RegistrarGasto } from "./components/RegistrarGasto";
import { useNavigate } from "react-router-dom";

export const GeneralesPage = () => {
  const { quincena, conceptos, pagados, redibujar } = useSelector(
    (state) => state.generales
  );
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState(new Set());
  //const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [datosCargados, setDatosCargados] = useState(false);
  const [mesLocalStorage, setMesLocalStorage] = useState("1Enero");
  const [url, setUrl] = useState("./php/test.php");
  const { data, hasError, isLoading } = useFetch(url);
  const navigate = useNavigate();

  /* FUNCIONES**************************************************************** */

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedItems(
        (prevCheckedItems) => new Set(prevCheckedItems.add(name))
      );
    } else {
      const newCheckedItems = new Set(checkedItems);
      newCheckedItems.delete(name);
      setCheckedItems(newCheckedItems);
    }
  };

  const CambiarUrl = () => {
    setUrl("./php/test2.php");
  };

  const sumarTotal2 = () => {
    // eslint-disable-next-line no-unused-vars
    const suma = conceptos.reduce((total, [, cantidad, pagado]) => {
      if (pagado === 0) {
        return total + cantidad;
      }
      return total;
    }, 0);
    setTotal2(suma);
  };

  const enviarPagados = async () => {
    await dispatch(setPagados({ pagados: Array.from(checkedItems) }));
    await dispatch(sendPagados());
    setDatosCargados(false);
  };

  const aBanamex = () => {
    navigate('/banamex');
  }

  /* EFECTOS *******************************************************/
  useEffect(() => {
    if (conceptos !== 1) {
      sumarTotal2();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conceptos]);

  useEffect(() => {
    setMesLocalStorage(quincena);
  }, []);

  useEffect(() => {
    dispatch(getConceptos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems, redibujar]);

  /* useEffect(() => {
    
  }, [redibujar]);
   */

  return (
    <>
      <div>GeneralesPage</div>
      <div>{quincena}</div>
      <table>
        <thead>
          <tr>
            <th colSpan="4" id="titulo">
              Gastos permanentes
            </th>
          </tr>
          <tr>
            <th>Concepto</th>
            <th>Cantidad</th>
            <th>Pagado</th>
            <th>Estatus</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(conceptos).map(([index, concepto]) => (
            <tr key={index}>
              <td>{concepto[0]}</td>
              <td>{concepto[1]}</td>
              <td>
                {concepto[2] === 0 ? (
                  <input
                    name={concepto[0]} // Cambiado a concepto[0]
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkedItems.has(concepto[0])} // Nuevo
                  />
                ) : null}
              </td>
              <td>{concepto[2] ? "✓" : "No pagado"}</td>
            </tr>
          ))}
        </tbody>
        <hr />
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{total2}</td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={() => {
          enviarPagados().then(() => dispatch(getConceptos()));
        }}
      >
        Obtener casillas marcadas
      </button>
      <div>{pagados && pagados}</div>
      <h2>{data}</h2>
      <button onClick={CambiarUrl}>CambiarUrl</button>
      <RegistrarGasto />
      <div>{redibujar}</div>
      <button onClick={aBanamex}>A Banamex</button>
    </>
  );
};
