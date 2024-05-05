import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorization } from "./authorizations/authorization";
import { Registration } from "./registrations/registration";
import { VehicleCard } from "./vehicles/vehicleCard";
import { AdminProfile } from "./profiles/adminProfile";
import { ClientProfile } from "./profiles/clientProfile";

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Тест</div>} />
                <Route path="/authorization" element={<Authorization />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/card" element={<VehicleCard />} />
                <Route path="/profile" element={<ClientProfile />} />
            </Routes>
        </BrowserRouter>
    );
}