import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AnalysisPage from "../container/AnalyticsPage";
import ParticipantsPage from "../container/ParticipantsPage";
import OrganizationsPage from "../container/OrganizationsPage";
import ParticipantDetailsPage from "../container/ParticipantDetailsPage";
import OrganizationDetailsPage from "../container/OrganizationDetailsPage";
import MainFunctionPage from "../container/MainFunctionPage";

const Root = () => {
    return (
        <Switch>
            <Route exact path="/home" render={() => <Redirect to="/home/dashboard"></Redirect>} />
            <Route exact path="/home/dashboard" component={MainFunctionPage} />
            <Route exact path="/home/analytics" component={AnalysisPage} />
            <Route exact path="/home/participants" component={ParticipantsPage} />
            <Route exact path="/home/organizations" component={OrganizationsPage} />
            <Route exact path="/home/participantdetails" component={ParticipantDetailsPage} />
            <Route exact path="/home/organizationdetails" component={OrganizationDetailsPage} />
        </Switch>
    )
}

export default withRouter(Root);