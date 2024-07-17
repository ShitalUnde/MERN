import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(`${process.env.DB_LOCAL_URL}`)
    .then((resp) => {
      console.log("connected to Database ");
    })
    .catch((error) => {
      console.log("fail", error);
    });
};

export default dbConnect;
