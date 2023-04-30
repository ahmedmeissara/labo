"use client"; // this is a client component 👈🏽
import Add from './addSpecimen/page'
import Update from './updateSpecimen/page'
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction,deleteAction } from '../../../redux/reducer';
import { BiCheck, BiUserPlus, BiX } from 'react-icons/bi';
import { deleteSpecimen,getSpecimens } from '../../../lib/helper';
import { useQueryClient, QueryClient } from 'react-query';

export default () => {
  const visible = useSelector((state: any)=> state.app.client.toggleForm);
  const dispatch = useDispatch();
  const formId = useSelector((state: any)=>state.app.client.formId);
  const deleteId = useSelector((state: any)=>state.app.client.deleteId)
  const queryClient = useQueryClient()

  const handler = () => {
    dispatch(toggleChangeAction());
  };
  const cancelHandler = async ()=>{
console.log("cancelled")
await dispatch(deleteAction(null))
  }
  const deleteHandler = async ()=>{
   if(deleteId){
    await deleteSpecimen(deleteId)
    await queryClient.prefetchQuery("specimens",getSpecimens)
    await dispatch(deleteAction(null))
   }
  }

  return (
    <section>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button onClick={handler} className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
            Add Specimen <span className="px-1"><BiUserPlus size={23}></BiUserPlus></span>
          </button>
        </div>
        {deleteId ? DeleteComponent({deleteHandler,cancelHandler}):<></>}
      </div>
      <div className="container mx-auto">
        {formId ? <Update/> : visible && <Add />}
      </div>
      
    </section>
  );
};
function DeleteComponent({deleteHandler,cancelHandler}: any) {
  return(
    <div className='flex gap-5'>
      <p>are you sure?</p>
      <button onClick={deleteHandler} className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-red-400 hover:border-red-500 hover:text-gray-500  ">
        YES <span className="px-1"><BiX color="rgb(255 255 255)"></BiX></span></button>
      <button className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-400 hover:border-green-500 hover:text-gray-500  ">
        NO<span onClick={cancelHandler} className="px-1"><BiCheck color="rgb(255 255 255)"></BiCheck></span></button>
    </div>
  )
}