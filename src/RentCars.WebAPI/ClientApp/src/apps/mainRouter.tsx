import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { AdminProfileCard } from "./profiles/Cards/adminProfileCard";
import { ClientProfileCard } from "./profiles/Cards/clientProfileCard";
import { ConfirmationCard } from "./confirmations/confirmationCard";
import { ProfileForm } from "./profiles/profileForm";
import { RequestForm } from "./rentalRequests/requestForm";
import { VehicleFormCard } from "./vehicles/Cards/vehicleFormCard";
import { VehicleSpecCard } from "./vehicles/Cards/vehicleSpecCard";
import { VehicleCard } from "./vehicles/Cards/vehicleCard";
import { UserCard } from "./profiles/Cards/userCard";
import { RequestCard } from "./rentalRequests/requestCard";
import { ProfilePage } from "./profiles/Pages/profilePage";
import { VehiclesPage } from "./vehicles/Pages/vehiclesPage";
import { VehiclePage } from "./vehicles/Pages/vehiclePage";
import { VehicleFormPage } from "./vehicles/Pages/vehicleFormPage";

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Тест</div>} />
                <Route path="/authorization" element={<AuthorizationPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/vehicle" element={<VehiclePage />} />
                <Route path="/vehicle-form" element={<VehicleFormPage />} />

                <Route path="/vehicle-card" element={<VehicleCard />} />
                <Route path="/confirmation" element={<ConfirmationCard />} />
                <Route path="/profile-form" element={<ProfileForm />} />
                <Route path="/request-form" element={<RequestForm />} />
                <Route path="/vehicle-form-card" element={<VehicleFormCard />} />
                <Route path="/vehicle" element={<VehicleSpecCard />} />
                <Route path="/user-card" element={<UserCard />} />
                <Route path="/request-card" element={<RequestCard />} />
            </Routes>
        </BrowserRouter>
    );
}