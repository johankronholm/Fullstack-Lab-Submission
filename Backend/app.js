import { app } from "./src/express.js"
import databaseService from "./src/service/database.js";

const port = process.env.PORT || 3000;

databaseService.connect();

app.listen(port, () => console.log(`Server running at http://localhost:${port}`)); 
