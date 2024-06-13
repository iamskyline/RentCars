import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { VehiclesPage } from "./vehicles/pages/vehiclesPage";
import { VehicleLinks } from "../domain/constants/links";
import AuthProvider from "./contexts/authContext";
import ProtectedRoute from "./protectedRoute";
import { Layout } from "../components/layout";

export function MainRouter() {
    return (
        <AuthProvider>
            <BrowserRouter>
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
                                } />
                            </Routes>
                        </Layout>
                    } errorElement={<>Ты лох</>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
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