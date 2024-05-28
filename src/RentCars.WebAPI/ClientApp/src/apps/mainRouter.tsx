import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { AdminProfileCard } from "./profiles/cards/adminProfileCard";
import { ClientProfileCard } from "./profiles/cards/clientProfileCard";
import { ProfileFormModal } from "./profiles/cards/profileFormModal";
import { RentalRequestFormModal } from "./rentalRequests/cards/rentalRequestFormModal";
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
import { RentalRequestLinks, UserLinks, VehicleLinks } from "../domain/constants/links";
import { UsersPage } from "./profiles/pages/usersPage";
import { RentalRequestPage } from "./rentalRequests/pages/rentalRequestPage";

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthorizationPage />} />
                <Route path="/registration" element={<RegistrationPage />} />

                <Route path={UserLinks.all} element={<UsersPage />} />
                <Route path={UserLinks.profile} element={<ProfilePage />} />

                <Route path={VehicleLinks.all} element={<VehiclesPage />} />
                <Route path={VehicleLinks.card} element={<VehiclePage />} />
                <Route path={VehicleLinks.form} element={<VehicleFormPage />} />

                <Route path={RentalRequestLinks.all} element={<RentalRequestsPage />} />
                <Route path={RentalRequestLinks.card} element={<RentalRequestPage />} />
                {/* <Route path={RentalRequestLinks.form} element={<RentalRequestFormPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}