import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { VehicleItem } from "./vehicles/vehicleItem";
import { AdminProfileCard } from "./profiles/adminProfileCard";
import { ClientProfileCard } from "./profiles/clientProfileCard";
import { ConfirmationCard } from "./confirmations/confirmationCard";
import { ProfileForm } from "./forms/profileForm";
import { RequestForm } from "./forms/requestForm";
import { VehicleForm } from "./forms/vehicleForm";
import { VehicleCard } from "./vehicles/vehicleCard";

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Тест</div>} />
                <Route path="/authorization" element={<AuthorizationPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/item" element={<VehicleItem />} />
                <Route path="/profile" element={<AdminProfileCard />} />
                <Route path="/confirmation" element={<ConfirmationCard />} />
                <Route path="/edit-profile" element={<ProfileForm />} />
                <Route path="/request-form" element={<RequestForm />} />
                <Route path="/vehicle-form" element={<VehicleForm />} />
                <Route path="/vehicle-card" element={<VehicleCard />} />
            </Routes>
        </BrowserRouter>
    );
}