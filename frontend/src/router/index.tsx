import { createBrowserRouter, RouteObject } from "react-router-dom";
import AccessDenied from '../features/AccessDenied';
import NotFound from '../features/NotFound';
import ServerError from '../features/ServerError';
// import ValidationError from '../features/ValidationError';

import App from '../App';
import HomePage from "../HomePage";
import WikiSearchResults from "../features/WikiSearchResults";
import WikiPage from "../features/WikiPage";
import Collaborate from "../features/Collaborate";
import VerifyAccount from "../features/VerifyAccount";

export const routes: RouteObject[] = [
  {
    path: "/:lang?", // Optional language parameter
    element: <App />,
    children: [
    //   {
    //     element: <RequireAuth status={ClientStatus.PreTrial} />,
    //     children: [
    //       {
    //         path: "users/changePassword/:id",
    //         element: <ChangePassword isChange={true} />,
    //       },
    //     ],
    //   },
    //   {
    //     element: (
    //       <RequireAuth
    //         status={ClientStatus.Trial}
    //         accessLevel={AccessLevel.Owner}
    //       />
    //     ),
    //     children: [
    //       { path: "staff", element: <AdminPage /> },
    //     ],
    //   },
    //   {
    //     element: (
    //       <RequireAuth
    //         status={ClientStatus.Active | ClientStatus.Subscription}
    //         accessLevel={AccessLevel.Owner}
    //       />
    //     ),
    //     children: [
    //       { path: "subscription/ServiceType", element: <ServiceType /> },
    //       { path: "subscription/Users", element: <AdditionalUsers /> },
    //       { path: "subscription/RenewalOptions", element: <RenewalOptions /> },
    //       { path: "subscription/Cancel", element: <CancelSubscription /> },
    //     ],
    //   },
    //   {
    //     element: (
    //       <RequireAuth
    //         status={ClientStatus.Trial | ClientStatus.Active}
    //         application={Application.RealTimeLaborGuidePro}
    //       />
    //     ),
    //     children: [
    //     ],
    //   },
    //   {
    //     element: (
    //       <RequireAuth
    //         status={ClientStatus.Trial | ClientStatus.Active}
    //         application={Application.RealTimeLaborGuidePro}
    //         accessLevel={AccessLevel.Manager}
    //       />
    //     ),
    //     children: [
    //     ],
    //   },
    //   {
    //     element: (
    //       <RequireAuth
    //         status={ClientStatus.Trial | ClientStatus.Active}
    //         application={Application.AutomotiveExpert}
    //       />
    //     ),
    //     children: [
    //       { path: "inventoryIndex/", element: <InventoryIndex /> },
    //     ],
    //   },
    //   {
    //     element: (
    //       <RequireAuth
    //         status={ClientStatus.Trial | ClientStatus.Active}
    //         application={Application.AutomotiveExpert}
    //         accessLevel={AccessLevel.Manager}
    //       />
    //     ),
    //     children: [
    //     ],
    //   },
    //   {
    //     element: (
    //       <RequireAuth
    //         status={ClientStatus.Active | ClientStatus.Subscription}
    //         accessLevel={AccessLevel.SystemAdministrator}
    //       />
    //     ),
    //     children: []
    //   },
      { index: true, element: <HomePage /> },
      { path: "collaborate", element: <Collaborate /> },
      { path: "search", element: <WikiSearchResults /> },
      { path: "wikipages/:pageId", element: <WikiPage /> },
      { path: "accessDenied", element: <AccessDenied /> },
      { path: "verify-account/:userId", element: <VerifyAccount /> },
      { path: "*", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "validation-error", element: <ServerError /> },
    //   { path: "forgotpassword", element: <ForgotPassword /> },
    //   { path: "account/verifyEmail", element: <ConfirmEmail /> },
    //   {
    //     path: "account/resetpassword/:id/:token",
    //     element: <ChangePassword isChange={false} />,
    //   },
    /**
     * TODO Need to Complete after implementing search functionality
     */
    //   { path: "eula", element: <Eula /> },
    //   { path: "privacy", element: <Privacy /> },
    //   { path: "terms", element: <Terms /> },
    //   { path: "registration", element: <Registration /> },
    //   { path: "login", element: <Navigate replace to="/" /> },
    //   { path: "*", element: <Navigate replace to="/" /> }, // temporary till we get urls fixed not-found
    ],
  },
]

export const router = createBrowserRouter(routes);