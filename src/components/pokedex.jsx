import React, { useState, useEffect } from "react";
//import Pokemon from './pokemon';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  CardActionArea,
  Typography
} from "@material-ui/core";
// import mockdata from '../mockdata'
import { fade, makeStyles } from "@material-ui/core/styles";
import http from "../httpService";
import { apiEndpoint } from "../config.json";
//import Pokemon from './pokemon';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  media: {
    height: 140
  },
  search: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 21),
    height: "60%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignSelf: "flex-end",
    justifyContent: "right"
  },
  inputRoot: {
    color: "textSecondary"
  },
  inputInput: {
    margin: "5px",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));
const Pokedex = props => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const [filter, setFilter] = useState("");
  const handleSearchChange = e => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    http.get(apiEndpoint + "?limit=807").then(function({ data }) {
      const { results } = data;

      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${index +
            1}.png`
        };
      });
      setPokemonData(newPokemonData);
    });
  }, []);
  const getPokiCard = poki => {
    const { id, name, sprite } = pokemonData[poki];
    return (
      <Grid item xs={12} sm={4} key={poki}>
        <Card raised onClick={() => history.push(`/pokedex/${poki}`)}>
          <CardActionArea>
            <CardMedia className={classes.media} image={sprite} />
          </CardActionArea>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              {id}. {name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
         
            <Typography className={classes.title} variant="h6" noWrap>
              Pokedex GO!
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <TextField
                label="Search Pokemon"
                variant="standard"
                onChange={handleSearchChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <h2> The Pokemon Assembly!</h2>
      <Grid container spacing={3}>
        {pokemonData ? (
          <>
            {Object.keys(pokemonData).map(
              poki =>
                pokemonData[poki].name.includes(filter) && getPokiCard(poki)
            )}
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Grid>
    </>
  );
};

export default Pokedex;
