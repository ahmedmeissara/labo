import connectMongo from "@/app/database/conf";
import UsersModel from "../../../model/users";

export default async function handler(req:any, res:any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectMongo();
    const { username, password } = req.body;

    const user = await UsersModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "User authenticated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
