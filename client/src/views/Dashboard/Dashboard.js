import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";
import StandDetails from './../../components/StandDetails/StandDetails'
import CreatorOrTag from './../../components/CreatorOrTag/CreatorOrTag'
import AllStands from './AllStands';

const Dashboard = () => {

  return (
    <>
      <Switch>
        <Route path="/app/stands" exact component={AllStands} />
        <Route path="/app/stands/search" exact component={AllStands} />
        <Route path="/app/stands/:id" exact component={StandDetails} />
        <Route path={['/app/stands/creators/:name', '/app/stands/tags/:name']} component={CreatorOrTag} />
      </Switch>
    </>
  )
}

export default Dashboard
