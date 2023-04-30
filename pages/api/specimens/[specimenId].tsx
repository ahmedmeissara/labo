import connectMongo from "@/app/database/conf";
import { getSpecimen, putSpecimen, deleteSpecimen } from "@/app/database/controller";

export default async (req: any, res: any)=> {
    connectMongo().catch(()=>res.status(405).json({error:"error in the connection"}));

    //type of request
    const {method}=req
    switch(method) {
        case "GET":
            getSpecimen(req, res)
            break;
        case "PUT":
            putSpecimen(req, res)
            break;
        case "DELETE":
            deleteSpecimen(req, res)
            break;
        default:
            res.setHeader('Allow', ['GET','POST','PUT','DELETE'])
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }
}
