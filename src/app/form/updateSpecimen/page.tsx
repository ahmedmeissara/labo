"use client"; // this is a client component 👈🏽
import { useReducer } from "react";
import { BiBrush,BiPlus, BiUserPlus } from 'react-icons/bi';
import Success from '../../success/page';
import Bug from '../../bug/page';
import { useQuery, useMutation, useQueryClient, QueryClient } from 'react-query';
import { getSpecimen, updateSpecimen, getSpecimens } from '../../../../lib/helper';
import { useSelector } from "react-redux";

const formReducer = (state : any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
}

export default function Update() {
  const queryClient = useQueryClient();
  const formId = useSelector((state: any) => state.app.client.formId); 
  const [formData, setFormData] = useReducer(formReducer, {});
  const UpdateMutation = useMutation((newData) => updateSpecimen(formId, newData), {
    onSuccess: async (data) => {
      //console.log("date updated");
      queryClient.prefetchQuery("specimens", getSpecimens);
    }
  });

  const { isLoading, isError, data, error } = useQuery(['specimens', formId], () => getSpecimen(formId));

  const {
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
  } = data || {};
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let updated = Object.assign({}, data, formData);
    //console.log(updated)
    await UpdateMutation.mutate(updated);
  }
  
  if (isLoading) return <div>Loading...!</div>
  if (isError) return <div>Error</div>

    return(
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input defaultValue={numero_inventaire} onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="numero_inventaire" placeholder="numero_inventaire"/>
            </div>
            <div className="input-type">
            <input  defaultValue={nom_commun} onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="nom_commun" placeholder="nom_commun"/>
            </div>
            <div className="input-type">
            <input  defaultValue={famille} onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="famille" placeholder="famille"/>
            </div>
            <div className="input-type">
            <input  defaultValue={genre} onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="genre" placeholder="genre"/>
            </div>
            <div className="input-type">
            <input  defaultValue={sous_genre}  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="sous_genre" placeholder="sous_genre"/>
            </div>
            <div className="input-type">
            <input  defaultValue={espece_et_sous_especes}  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="espece_et_sous_especes" placeholder="espece_et_sous_especes"/>
            </div>
            <div className="input-type">
            <input  defaultValue={auteurs}  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="auteurs" placeholder="auteurs"/>
            </div>
            <div className="input-type">
            <input  defaultValue={collecteurs_et_legataires} onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="collecteurs_et_legataires" placeholder="collecteurs_et_legataires"/>
            </div>
            <div className="input-type">
                <label className="text-gray-300 px-5 text-center font-bold" htmlFor="date_collecte">date de collécte: </label><br />
            <input  defaultValue={date_collecte} onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="date" name="date_collecte" placeholder="date_collecte"/>
            </div>
            <div className="input-type">
            <input  defaultValue={localite} onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="localite" placeholder="localite"/>
            </div>
            <div className="input-type">
            <input  defaultValue={sexe} onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="sexe" placeholder="sexe"/>
            </div>
            <div className="input-type">
            <input  defaultValue={etat_de_conservation} onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="etat_de_conservation" placeholder="etat_de_conservation"/>
            </div>
            <div className="input-type">
            <input  defaultValue={nombre_especes} onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="nombre_especes" placeholder="nombre_especes"/>
            </div>
            <div className="input-type">
            <input  defaultValue={remarques} onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="remarques" placeholder="remarques"/>
            </div>
             <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 my-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500  ">
                Update <span className="px-1"><BiBrush size={24}></BiBrush></span>
             </button>
    
    </form>
)
}