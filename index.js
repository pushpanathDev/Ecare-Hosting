const app = require("./server");
const UserApi = require("./controllers/User");
const CaretakerApi = require("./controllers/Caretaker");
const MedicsApi = require("./controllers/Medics");

app.use("/", UserApi);
app.use("/", CaretakerApi);
app.use("/", MedicsApi);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server Started on port ${port}`));
