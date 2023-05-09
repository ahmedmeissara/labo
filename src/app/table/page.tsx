"use client"; // this is a client component 👈🏽
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getSpecimens } from "../../../lib/helper";
import { useQuery } from "react-query";
import { useSelector,useDispatch } from "react-redux";
import { toggleChangeAction,updateAction,deleteAction} from "../../../redux/reducer";


export default function SpecimenTable() {

  const { isLoading, isError, data, error }: any = useQuery("Specimens", getSpecimens);
  if (isLoading) return <div>Specimens are loading...</div>;
  if (isError) return <div>Got error: {error}</div>;

  return (
    <div style={{ overflowX: "auto" }}>

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
  