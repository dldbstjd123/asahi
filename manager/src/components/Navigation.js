import React from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import {domain} from '../config';
import "../css/Navigation.css";

import Home from "../route/Home";
import Menu from "../route/Menu";
import MenuUpdate from "../route/MenuUpdate";
import MenuAdd from "../route/MenuAdd";
import Category from "../route/Category";
import Reservation from "../route/Reservation";
import Hours from "../route/Hours";
import Tax from "../route/Tax";


const Navigation = () => {
  const history = useHistory();

  async function logout(){
      try{
        const doWork = await fetch(`${domain}admin/logout`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        if(doWork.status == 'succeed'){
            history.push('/admin')
        } 
      }catch(err){
          throw err
      }
  }
  return (
    <div id="navigationContainer">
      <div id="linkContainer">
        <Link className="links" to={`/admin/home`}>
          Home
        </Link>
        <Link className="links" to={`/admin/menu`}>
          Menu
        </Link>
        <Link className="links" to={`/admin/category`}>
          Category
        </Link>
        <Link className="links" to={`/admin/reservation`}>
          Reservation
        </Link>
        <Link className="links" to={`/admin/hours`}>
          Hours
        </Link>
        <Link className="links" to={`/admin/tax`}>
          Tax
        </Link>
        
      </div>
      <div id='mainContainer'>
        <div id='topNavigation'>
            <button type='button' onClick={()=>{logout()}}>logout</button>
        </div>
        <Switch>
          <Route path={"/admin/home"} component={Home} />
          <Route path={"/admin/menu"} component={Menu} />
          <Route path={"/admin/menu_update"} component={MenuUpdate} />
          <Route path={"/admin/menu_add"} component={MenuAdd} />
          <Route path={"/admin/category"} component={Category} />
          <Route path={"/admin/reservation"} component={Reservation} />
          <Route path={"/admin/hours"} component={Hours} />
          <Route path={"/admin/tax"} component={Tax} />
        </Switch>
      </div>
    </div>
  );
};

export default Navigation;
