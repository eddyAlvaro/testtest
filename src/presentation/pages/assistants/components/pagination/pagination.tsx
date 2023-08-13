import React, { useState } from "react";
import { CardData } from "..";

type Props = {
  data: any;
  dataSize: number;
};
// Componente que permite paginar los cards que se vaya creando pasandole la data y una cantidad máxima de valores a ser paginados
const Paginacion: React.FC<Props> = ({ data, dataSize }: Props) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceUltimoItem = paginaActual * dataSize;
  const indicePrimerItem = indiceUltimoItem - dataSize;
  const itemsPaginaActual = data.slice(indicePrimerItem, indiceUltimoItem);
  const SizePages = Math.round(data.length / dataSize);

  //Función que recibe un argumento numerico el cual representa la pagina en la que se situará la paginación
  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <>
      <CardData data={itemsPaginaActual} />
      <div className="paginacion">
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => {
              cambiarPagina(1);
            }}
            disabled={paginaActual == 1}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => {
              cambiarPagina(paginaActual - 1);
            }}
            disabled={paginaActual == 1}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => {
              cambiarPagina(paginaActual + 1);
            }}
            disabled={paginaActual == SizePages}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => {
              cambiarPagina(SizePages);
            }}
            disabled={paginaActual == SizePages}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Página</div>
            <strong>
              {paginaActual} de {SizePages}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Ir a pagina:
            <input
              type="number"
              value={paginaActual}
              onChange={(e: any) => {
                if (e.target.value != 0 && e.target.value <= SizePages) {
                  cambiarPagina(e.target.value);
                }
              }}
              className="border p-1 rounded w-16"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Paginacion;
