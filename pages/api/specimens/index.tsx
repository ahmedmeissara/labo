import connectMongo from "@/app/database/conf";
import { getSpecimens, postSpecimen, putSpecimen, deleteSpecimen } from "@/app/database/controller";

export default async function handler(req: any, res: any) {
  try {
    await connectMongo();

    const { method } = req;

    switch (method) {
      case "GET":
        getSpecimens(req, res);
        break;
      case "POST":
        postSpecimen(req, res);
        break;
      case "PUT":
        putSpecimen(req, res);
        break;
      case "DELETE":
        deleteSpecimen(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} not allowed`);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
