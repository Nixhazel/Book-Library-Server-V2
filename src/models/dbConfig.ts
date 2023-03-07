// import mongoose, { connection } from "mongoose";
// import { strict as assert } from 'assert';
// import { load } from 'ts-dotenv';

// const env = load({
//     MONGO_URL: String
// });

// assert.ok(env.MONGO_URL === process.env.MONGO_URL);
// console.log(process.env.MONGO_URL);

// mongoose.connect("mongodb+srv://Olokor:Nyeore14@cluster1.s2bbhxg.mongodb.net/Week-9-Week-6-BookLibDB");

//  const main = async () => {
//     try {


// const connection = await mongoose.connection;
// connection.on("connected", () => {
// 	console.log("MongoDB is connected");
// });

// } catch (error) {
// connection.on('error', (error: any) => {
//         console.log('Error in MongoDB connection', error);
//     })

// }

// }
// main()

// export default main;