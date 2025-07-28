import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/contacts/add"} element={<Home />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Layout>
    );
};

export default App;
