"use client";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { BiEdit, BiTrashAlt, BiDownload } from "react-icons/bi";
import { getSpecimens } from "../../../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction, deleteAction } from "../../../redux/reducer";
import { useState } from "react";

export default function SpecimenTable() {
  const [tableData, setTableData] = useState([]);
  const { isLoading, isError, data, error }: any = useQuery("Specimens", getSpecimens, {
    onSuccess: (data) => {
      setTableData(data);
    },
  });
  const downloadTable = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Specimens");

    // Define header row
    const headerRow = worksheet.addRow([
      "Numero Inventaire",
      "Nom Commun",
      "Famille",
      "Genre",
      "Sous-Genre",
      "Espece et Sous-Especes",
      "Auteurs",
      "Collecteurs et Legataires",
      "Date Collecte",
      "Localite",
      "Sexe",
      "Etat de Conservation",
      "Nombre Especes",
      "Remarques",
    ]);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D3D3D3" },
      };
      cell.font = { bold: true };
    });

    // Add data rows
    tableData.forEach((row:any) => {
      worksheet.addRow([
        row.numero_inventaire || "",
        row.nom_commun || "",
        row.famille || "",
        row.genre || "",
        row.sous_genre || "",
        row.espece_et_sous_especes || "",
        row.auteurs || "",
        row.collecteurs_et_legataires || "",
        row.date_collecte || "",
        row.localite || "",
        row.sexe || "",
        row.etat_de_conservation || "",
        row.nombre_especes || "",
        row.remarques || "",
      ]);
    });

    // Auto size all columns
  // Auto size all columns
worksheet.columns.forEach((column) => {
  if (column.header) {
    column.width = column.header.length < 12 ? 12 : column.header.length;
  }
});


    // Generate Excel file and download it
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "specimens.xlsx");
    });
  };

  if (isLoading) return <div>Specimens are loading...</div>;
  if (isError) return <div>Got error: {error}</div>;

  return (
    <div style={{ overflowX: "auto" }}>
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={downloadTable}>
          <BiDownload className="inline-block align-middle" />
          <span className="inline-block align-middle ml-2">Download</span>
        </button>
      </div>

    <table className="border min-w-full table-auto">
      <thead>
        
        <tr className="bg-gray-800">
        <th className="px-3 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">numero_inventaire</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">nom_commun</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">famille</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">genre</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">sous_genre</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">espece_et_sous_especes</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">auteurs</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">collecteurs_et_legataires</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">date_collecte</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">localite</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">sexe</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">etat_de_conservation</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">nombre_especes</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">remarques</span>
          </th>

        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj: any, i: any) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
    </div >

  );
  
}

function Tr({
  _id,
  numero_inventaire,
  nom_commun,
  famille,
  genre,
  sous_genre,
  espece_et_sous_especes,
  auteurs,
  collecteurs_et_legataires,
  date_collecte,
  localite,
  sexe,
  etat_de_conservation,
  nombre_especes,
  remarques,
}: any) {
  const visible= useSelector((state: any) => state.app.client.toggleForm) 
  const dispatch = useDispatch()
  const onUpdate = ()=>{
    dispatch(toggleChangeAction(_id))
    if(visible){
         dispatch(updateAction(_id))
    }
  }
  const onDelete = ()=>{
    if(!visible){
      dispatch(deleteAction(_id))
    }
  }

  return (
      <tr className="bg-gray-50 text-center border">
                <td className=" py-2 flex justify-around gap-3">
          <button className="cursor" onClick={onUpdate}>
            <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
          </button>
          <button className="cursor" onClick={onDelete}>
            <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
          </button>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{numero_inventaire || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16  py-2">
          <span>{nom_commun || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{famille || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16  py-2">
          <span>{genre || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16  py-2">
          <span>{sous_genre || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{espece_et_sous_especes || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{auteurs || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16  py-2">
          <span>{collecteurs_et_legataires || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{date_collecte || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{localite || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{sexe || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{etat_de_conservation || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{nombre_especes || "Unknown"}</span>
        </td>
        <td className="whitespace-nowrap px-16 py-2">
          <span>{remarques || "Unknown"}</span>
        </td>

      </tr>
    )
    
  }
 