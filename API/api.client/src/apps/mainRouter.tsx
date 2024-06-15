import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizationPage } from "./authorizations/authorizationPage";
import { RegistrationPage } from "./registrations/registrationPage";
import { VehiclesPage } from "./vehicles/pages/vehiclesPage";
import { RentalRequestLinks, UserLinks, VehicleLinks } from "../domain/constants/links";
import AuthProvider from "./contexts/authContext";
import ProtectedRoute from "./protectedRoute";
import { Layout } from "../components/layout";
import { AdminProfileCard } from "./profiles/cards/adminProfileCard";
import { ClientProfileCard } from "./profiles/cards/clientProfileCard";
import { VehicleFormPage } from "./vehicles/pages/vehicleFormPage";
import { VehicleSpecCard } from "./vehicles/cards/vehicleSpecCard";
import { UsersPage } from "./profiles/pages/usersPage";
import { RentalRequestsPage } from "./rentalRequests/pages/rentalRequestsPage";

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
                                <Route path={VehicleLinks.form} element={
                                    <ProtectedRoute>
                                        <VehicleFormPage />
                                    </ProtectedRoute>
                                }
                                />
                                <Route path={VehicleLinks.card} element={
                                    <ProtectedRoute>
                                        <VehicleSpecCard />
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
                                <Route path={UserLinks.all} element={
                                    <ProtectedRoute>
                                        <UsersPage />
                                    </ProtectedRoute>
                                }
                                />

                                <Route path={RentalRequestLinks.all} element={
                                    <ProtectedRoute>
                                        <RentalRequestsPage />
                                    </ProtectedRoute>
                                }
                                />
                            </Routes>
                        </Layout>
                    } errorElement={<>Такой страницы не существует!</>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}