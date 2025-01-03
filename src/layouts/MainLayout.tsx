import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayout: React.FC = () => {
    return (
        <>
        <Header />
        <Outlet/>
        </>
    )
}

export default MainLayout;