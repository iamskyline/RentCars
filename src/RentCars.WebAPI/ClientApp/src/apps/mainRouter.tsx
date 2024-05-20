import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { AdminProfileCard } from "./profiles/cards/adminProfileCard";
import { ClientProfileCard } from "./profiles/cards/clientProfileCard";
import { ConfirmationCard } from "./confirmations/confirmationCard";
import { ProfileForm } from "./profiles/profileForm";
import { RequestForm } from "./rentalRequests/requestForm";
import { VehicleFormCard } from "./vehicles/cards/vehicleFormCard";
import { VehicleSpecCard } from "./vehicles/cards/vehicleSpecCard";
import { VehicleCard } from "./vehicles/cards/vehicleCard";
import { UserCard } from "./profiles/cards/userCard";
import { RequestCard } from "./rentalRequests/requestCard";
import { ProfilePage } from "./profiles/pages/profilePage";
import { VehiclesPage } from "./vehicles/pages/vehiclesPage";
import { VehiclePage } from "./vehicles/pages/vehiclePage";
import { VehicleFormPage } from "./vehicles/pages/vehicleFormPage";

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