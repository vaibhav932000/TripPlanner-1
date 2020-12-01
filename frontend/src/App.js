import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@reach/combobox/styles.css";
import HeaderComponent from "./components/Homepage/HeaderComponent";

import { Container} from "react-bootstrap";
import Login from "./components/User/LoginComponent";
import SignUp from "./components/User/SignUpComponent";
import UserProfile from "./components/User/AccountComponent";
import PublicProfile from "./components/User/PublicProfileComponent";
import TripPlanHomeComponent from "./components/TripPlan/TripPlanHomeComponent";
import TripPlanDetailComponent from "./components/TripPlan/TripPlanDetailComponent";
import PostDetailComponent from "./components/Post/PostDetailComponent";
import PostHomePageComponent from "./components/Post/PostHomePageComponent";
import HomepageView from "./components/Homepage/HomepageViewComponent";
import DetailPageView from "./components/DetailPage/DetailPageView";


export default function App() {
  return (
      <Router>
        <Container><HeaderComponent/></Container>
          <Switch>
            <Route exact path='/' component={HomepageView} />
            <Route path={["/place/:placeId"]} exact component={DetailPageView}/>
            <Route path="/signin" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/public-profile" exact component={PublicProfile} />
            <Route path="/public-profile/:uid" exact component={PublicProfile} />

            <Route path={["/plans"]} exact component={TripPlanHomeComponent}/>
            <Route path={["/plans/:planId"]} exact component={TripPlanDetailComponent}/>
            <Route path={["/posts/:postId"]} exact component={PostDetailComponent}/>
            <Route path={["/posts"]} exact component={PostHomePageComponent}/>
          </Switch>
      </Router>
  );
}

