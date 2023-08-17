import mongoose from "mongoose";

const conectarBBDD = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log("MongoDB: " + url);
  } catch (e) {
    console.log(`ERROR ${e.message}`);
    process.exit(1);
  }
};

export default conectarBBDD;
