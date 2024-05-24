import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { AdminProfileCard } from "./profiles/cards/adminProfileCard";
import { ClientProfileCard } from "./profiles/cards/clientProfileCard";
import { ConfirmationCard } from "./confirmations/confirmationCard";
import { ProfileForm } from "./profiles/profileForm";
import { RentalRequestForm } from "./rentalRequests/cards/rentalRequestForm";
import { VehicleFormCard } from "./vehicles/cards/vehicleFormCard";
import { VehicleSpecCard } from "./vehicles/cards/vehicleSpecCard";
import { VehicleCard } from "./vehicles/cards/vehicleCard";
import { UserCard } from "./profiles/cards/userCard";
import { RentalRequestCard } from "./rentalRequests/cards/rentalRequestCard";
import { ProfilePage } from "./profiles/pages/profilePage";
import { VehiclesPage } from "./vehicles/pages/vehiclesPage";
import { VehiclePage } from "./vehicles/pages/vehiclePage";
import { VehicleFormPage } from "./vehicles/pages/vehicleFormPage";
import { RentalRequestsPage } from "./rentalRequests/pages/rentalRequestsPage";
import { RentalRequestLinks, VehicleLinks } from "../domain/constants/links";
import { RentalRequestFormPage } from "./rentalRequests/pages/rentalRequestFormPage";

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthorizationPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path={VehicleLinks.all} element={<VehiclesPage />} />
                <Route path={RentalRequestLinks.all} element={<RentalRequestsPage />} />
                <Route path="/vehicle-form" element={<VehicleFormPage />} />

                <Route path={VehicleLinks.card} element={<VehicleSpecCard />} />
                <Route path={RentalRequestLinks.card} element={<RentalRequestCard />} />
                <Route path="/confirmation" element={<ConfirmationCard />} />
                <Route path="/profile-form" element={<ProfileForm />} />
                <Route path="/request-form" element={<RentalRequestFormPage />} />
                <Route path="/vehicle-form-card" element={<VehicleFormCard />} />
                <Route path="/user-card" element={<UserCard />} />
            </Routes>
        </BrowserRouter>
    );
}