import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/home";
import Update from "./routes/updatepage";
import Details from "./routes/details";
import { RestaurantsContextProvider } from "./context/context";

const App = () => {
    return <RestaurantsContextProvider>
        <div className="container">

            <Router>

                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/Restaurants/:id/update" component={Update} />
                    <Route exact path="/Restaurants/:id" component={Details} />

                </Switch>

            </Router>
        </div>;
    </RestaurantsContextProvider>
};

export default App;