const app = require("./server");
const UserApi = require("./controllers/User");
const CaretakerApi = require("./controllers/Caretaker");
const MedicsApi = require("./controllers/Medics");
const DoctorsApi = require("./controllers/Doctors");

app.use("/", UserApi);
app.use("/", CaretakerApi);
app.use("/", MedicsApi);
app.use("/", DoctorsApi);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server Started on port ${port}`));
