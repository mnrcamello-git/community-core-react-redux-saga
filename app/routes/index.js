import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../containers/LoginPage/Loadable';
import ForgotPasswordPage from '../containers/ForgotPasswordPage/Loadable';
import ResetPasswordPage from '../containers/ResetPasswordPage/Loadable';
import Hub from '../containers/Hub/Loadable';
import Noc from '../containers/Noc/Loadable';
import UserManagement from '../containers/Noc/UserManagement/Loadable';
import MailConfigPage from '../containers/Noc/MailConfigPage/Loadable';
import MsaManagement from '../containers/Noc/MsaManagement/Loadable';
import TokenExpiredPage from '../containers/TokenExpiredPage/Loadable';
import ChangePassword from '../containers/ChangePassword/Loadable';
import MeetingRooms from '../containers/Hub/MeetingRoom/Loadable';
import InvoicingPage from '../containers/Hub/InvoicingPage/Loadable';
import CommunityPage from '../containers/Hub/CommunityPage/Loadable';
import FileJobReqPage from '../containers/Hub/FileJobReqPage/Loadable';
import AgreementPage from '../containers/Hub/AgreementPage/Loadable';
import MarketingPage from '../containers/Noc/MarketingPage/Loadable';
import SalesPage from '../containers/Noc/SalesPage/Loadable';
import RecruitmentPage from '../containers/Noc/RecruitmentPage/Loadable';
import CustomerServicePage from '../containers/Noc/CustomerServicePage/Loadable';
import FinancePage from '../containers/Noc/FinancePage/Loadable';
import HumanResourcePage from '../containers/Noc/HumanResourcePage/Loadable';
import OperationsPage from '../containers/Noc/OperationsPage/Loadable';
import SettingsPage from '../containers/Noc/SettingsPage/Loadable';
import NotAvailablePage from '../containers/NotAvailablePage/Loadable';
import UnavailableInvoice from '../containers/UnavailableInvoice/Loadable';
import CandidateListSubPage from '../containers/CandidateListSubPage/Loadable';
import SetPasswordPage from '../containers/SetPasswordPage/Loadable';
import MaintenancePage from '../containers/MaintenancePage/Loadable';
import NotificationsPage from '../containers/NotificationsPage/Loadable';
import ContractNotFoundPage from '../containers/ContractNotFoundPage';
import LinkExpiredPage from '../containers/LinkExpiredPage/Loadable';
import OverrideRoute from './Routes';

export default function Routes() {
  return (
    <>
      <Switch>
        <OverrideRoute exact path="/" component={LoginPage} />
        <OverrideRoute
          exact
          path="/forgot-password"
          component={ForgotPasswordPage}
        />
        <OverrideRoute
          exact
          path="/reset-password"
          component={ResetPasswordPage}
        />
        <OverrideRoute
          exact
          path="/hub"
          component={Hub}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/hub/meeting-room"
          component={MeetingRooms}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/hub/invoice"
          component={InvoicingPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/hub/community"
          component={CommunityPage}
          isDashboard
          isPrivate
        />
        <OverrideRoute
          exact
          path="/hub/job-opening"
          component={FileJobReqPage}
          isDashboard
          isPrivate
        />
        <OverrideRoute
          exact
          path="/hub/onboarding"
          component={AgreementPage}
          isDashboard
          isPrivate
        />
        <OverrideRoute
          exact
          path="/hub/agreements"
          component={AgreementPage}
          isDashboard
          isPrivate
        />
        <OverrideRoute
          exact
          path="/noc"
          component={Noc}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/user-management"
          component={UserManagement}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/mail-config"
          component={MailConfigPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/msa-management"
          component={MsaManagement}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/marketing"
          component={MarketingPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/recruitment"
          component={RecruitmentPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/settings"
          component={SettingsPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/customer-service"
          component={CustomerServicePage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/finance"
          component={FinancePage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/sales"
          component={SalesPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/human-resource"
          component={HumanResourcePage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/noc/operations"
          component={OperationsPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/change-password"
          component={ChangePassword}
          isPrivate
        />
        <OverrideRoute
          exact
          path="/token-expired"
          component={TokenExpiredPage}
        />
        <OverrideRoute exact path="/link-expired" component={LinkExpiredPage} />
        <OverrideRoute
          exact
          path="/hub/candidates"
          component={CandidateListSubPage}
          isPrivate
          isDashboard
        />
        <OverrideRoute
          exact
          path="/notifications"
          component={NotificationsPage}
          isPrivate
          isDashboard
        />
        <Route exact path="/set-password" component={SetPasswordPage} />
        <Route
          exact
          path="/invoice-unavailable"
          component={UnavailableInvoice}
        />
        <Route exact path="/maintenance" component={MaintenancePage} />
        <Route exact path="/not-available" component={NotAvailablePage} />
        <Route
          exact
          path="/contract-not-found"
          component={ContractNotFoundPage}
        />
        <Route component={NotAvailablePage} />
      </Switch>
    </>
  );
}
