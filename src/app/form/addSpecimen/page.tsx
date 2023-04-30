"use client"; // this is a client component 👈🏽
import { useReducer } from "react"
import { BiPlus, BiUserPlus } from 'react-icons/bi';
import Success from '../../success/page'
import Bug from '../../bug/page'
import { useQueryClient, useMutation } from 'react-query';
import { addSpecimen,getSpecimens } from "../../../../lib/helper";
import { model } from 'mongoose';
import { useSelector } from "react-redux";

const formReducer = (state: any,event: any)=>{
    return{
        ...state,
        [event.target.name]:event.target.value
    }
  }

    export default function Add(){
        const[formData,setFormData]=useReducer(formReducer,{})
        const queryClient = useQueryClient();
        const addMutaion = useMutation(addSpecimen, {
          onSuccess: () => {
            queryClient.prefetchQuery("specimens", getSpecimens);
          },
        })
        const handleSubmit = (e:any)=>{
            e.preventDefault();
            if(Object.keys(formData).length==0)return console.log("don't have form data")
            let{numero_inventaire,
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
                remarques
            }= formData
            const model = {
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
                remarques
            }
            addMutaion.mutate(model)
        }
        if(addMutaion.isLoading) return<div>Loading!</div>
        if(addMutaion.isError) return<Bug  message={"error adding the data "}></Bug>
        if(addMutaion.isSuccess) return<Success message={"Data added"}></Success>
    return(
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="numero_inventaire" placeholder="numero_inventaire"/>
            </div>
            <div className="input-type">
            <input onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="nom_commun" placeholder="nom_commun"/>
            </div>
            <div className="input-type">
            <input onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="famille" placeholder="famille"/>
            </div>
            <div className="input-type">
            <input onChange={setFormData} className="border w-full px-5 py-3 focus:outline-none rounded-md" type="text" name="genre" placeholder="genre"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="sous_genre" placeholder="sous_genre"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="espece_et_sous_especes" placeholder="espece_et_sous_especes"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="auteurs" placeholder="auteurs"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="collecteurs_et_legataires" placeholder="collecteurs_et_legataires"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="date" name="date_collecte" placeholder="date_collecte"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="localite" placeholder="localite"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="sexe" placeholder="sexe"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="etat_de_conservation" placeholder="etat_de_conservation"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="nombre_especes" placeholder="nombre_especes"/>
            </div>
            <div className="input-type">
            <input  onChange={setFormData} className="border px-5 py-3 focus:outline-none rounded-md" type="text" name="remarques" placeholder="remarques"/>
            </div>
    
             <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 my-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500  ">
                Add <span className="px-1"><BiPlus size={24}></BiPlus></span>
             </button>
    
    </form>
)
}