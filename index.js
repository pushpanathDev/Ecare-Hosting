const app = require("./server");
const UserApi = require("./controllers/User");
const CaretakerApi = require("./controllers/Caretaker");

app.use("/", UserApi);
app.use("/", CaretakerApi);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server Started on port ${port}`));
