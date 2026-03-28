import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        await mongoose.connect(`${process.env.MONGODB_URI}/S_Notes`)

    } catch (error) {
        console.log("Mongodb Connection Failed for", error.message);
    }
}
export default connectDB;