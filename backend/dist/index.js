import app from "./app.js";
import { connectToDatabase } from "./database/connection.js";
const PORT = process.env.PORT || 5005;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT} 🥡`));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map