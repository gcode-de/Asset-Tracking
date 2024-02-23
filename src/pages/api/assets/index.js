import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    // const assets = await Asset.find();
    // const userWithAssets = await User.findById(userId).populate("assets");
    const userWithAssets = await User.findById("65d89f5846848f9939128fe0").populate("assets");
    console.log(userWithAssets);
    return response.status(200).json(userWithAssets);
  }

  if (request.method === "POST") {
    try {
      // await Product.create(request.body);
      await User.findByIdAndUpdate(userId, { $push: { assets: assetId } });
      return response.status(201).json("Asset created");
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  //UPDATE
  if (request.method === "PUT") {
    try {
      await Asset.findByIdAndUpdate(request.body.id, request.body);
      return response.status(200).json("Asset updated");
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  //SOFT_DELETE
  if (request.method === "PUT") {
    try {
      await Asset.findByIdAndUpdate(request.body.id, request.body);
      await asset.softDelete();
      return response.status(200).json("Asset deleted");
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  //SOFT_UNDELETE
  if (request.method === "PUT") {
    try {
      await Asset.findByIdAndUpdate(request.body.id, request.body);
      await asset.softUndelete();
      return response.status(200).json("Asset undeleted");
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
