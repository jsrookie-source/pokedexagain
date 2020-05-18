import React from 'react';
import { Switch, Route , Redirect} from 'react-router-dom'
import {  Grid } from '@material-ui/core';
import Pokedex from './components/pokedex';
import Pokemon from './components/pokemon';
import NotFound from "./components/notfound";

function App() {
  return (
  <>
  <Grid container direction='column' >
<Grid item container >
<Grid item xs={false} sm={2}/>
<Grid item xs={12} sm={8} >
<Switch>
<Route exact path="/pokedex" component={Pokedex}  />
<Route path="/pokedex/:pokemonId" render={ props => <Pokemon {...props}/>} />
<Route path="/not-found" component={NotFound} />
<Redirect from="/" exact to="/pokedex" />
<Redirect to="/not-found" />
</Switch>
  </Grid>
<Grid item xs={false} sm={2}/>
</Grid>

  </Grid>
  
  </>
  );
}

export default App;
