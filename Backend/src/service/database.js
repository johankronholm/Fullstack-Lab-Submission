import mongoose from "mongoose";

class DatabaseService {
    connection = null;

    connect = async () => {
        try {
        this.connection = await mongoose.connect(process.env.DB_URL); 
        console.log("Connected to MongoDB");
    
        } catch (error) {
            console.error("Connection to MongoDB failed!", error);
        }
    };

    close = async () => {
        try {
        this.connection = mongoose.disconnect();
        console.log("MongoDB connection closed")
        } catch (error) {
            console.error("Could not close MongoDB connection!")
        }
    }
}

export default new DatabaseService(); 