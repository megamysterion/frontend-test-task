import React, { Component } from 'react';
import {connect} from "react-redux";
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import DynamicImport from '../components/common/DynamicImport';

import NotFoundPage from '../components/pages/NotFoundPage';

import Header from "../components/common/layout/Header";
import Footer from "../components/common/layout/Footer";

export const history = createHistory();

class AppRouter extends Component{

  render(){

    const dynamicRoutesConfig = [
      {
        path: "/",
        pathToComponent: "pages/MainPage"
      },
      {
        path: "/main",
        pathToComponent: "pages/MainPage"
      },
      {
        path: "/own_list",
        pathToComponent: "pages/OwnList"
      }
    ];

    return(
      <Router history={history}>
        <div id="inner-wrapper">

          <Header />

          <main className={"main"}>
          <Switch>
            {
              dynamicRoutesConfig.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  component={(props) => {
                    return(
                      <DynamicImport load={() => import(`../components/${route.pathToComponent}`)}>
                        {
                          (Component) => {
                            return (
                              Component === null ? null : <Component {...props}/>
                            )
                          }
                        }
                      </DynamicImport>
                    )
                  }}
                  exact={true}
                />
              ))
            }

            <Route component={NotFoundPage} />
          </Switch>
          </main>

          <Footer/>
        </div>
      </Router>
    )
  }
}

const mapStateToDispatch = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToDispatch, mapDispatchToProps)(AppRouter);