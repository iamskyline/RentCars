import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { VehiclesPage } from "./vehicles/pages/vehiclesPage";
import { UserLinks, VehicleLinks } from "../domain/constants/links";
import AuthProvider from "./contexts/authContext";
import ProtectedRoute from "./protectedRoute";
import { Layout } from "../components/layout";
import { AdminProfileCard } from "./profiles/cards/adminProfileCard";
import { ClientProfileCard } from "./profiles/cards/clientProfileCard";
import { VehicleFormPage } from "./vehicles/pages/vehicleFormPage";

export function MainRouter() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<AuthorizationPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path='*' element={
                        <Layout>
                            <Routes>
                                <Route path={VehicleLinks.all} element={
                                    <ProtectedRoute>
                                        <VehiclesPage />
                                    </ProtectedRoute>
                                    } 
                                />
                                <Route path={UserLinks.adminProfile} element={
                                    <ProtectedRoute>
                                        <AdminProfileCard />
                                    </ProtectedRoute>
                                }
                                />
                                <Route path={UserLinks.profile} element={
                                    <ProtectedRoute>
                                        <ClientProfileCard />
                                    </ProtectedRoute>
                                }
                                />
                                <Route path={VehicleLinks.form} element={
                                    <ProtectedRoute>
                                        <VehicleFormPage/>
                                    </ProtectedRoute>
                                }
                                />
                            </Routes>
                        </Layout>
                    } errorElement={<>Ты лох</>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
        // <BrowserRouter>
        //     <Routes>
        //         <Route path={UserLinks.all} element={<UsersPage />} />
        //         <Route path={UserLinks.profile} element={<ProfilePage />} />

        //         
        //         <Route path={VehicleLinks.card} element={<VehiclePage />} />
        //         <Route path={VehicleLinks.form} element={<VehicleFormPage />} />

        //         <Route path={RentalRequestLinks.all} element={<RentalRequestsPage />} />
        //         {/* <Route path={RentalRequestLinks.card} element={<RentalRequestPage />} /> */}
        //         {/* <Route path={RentalRequestLinks.form} element={<RentalRequestFormPage />} /> */}
        //     </Routes>
        // </BrowserRouter>
    );
}