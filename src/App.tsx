import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import AddContact from "./containers/AddContact/AddContact";
import EditContact from "./containers/EditContact/EditContact";

const App = () => {
    return (
        <Layout>
            <Routes>
                {["/", "/contacts"].map((path) => (
                    <Route path={path} element={<Home />} />
                ))}
                <Route path={"/contacts/add"} element={<AddContact />} />
                <Route path={"/contacts/:id/edit"} element={<EditContact />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Layout>
    );
};

export default App;
