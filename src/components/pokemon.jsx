import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  makeStyles,
  CardMedia,
  CardContent,
  Link,
  CircularProgress,
  Button
} from "@material-ui/core";
// import mockdata from '../mockdata';
import { red } from "@material-ui/core/colors";
import http from "../httpService";
import { apiEndpoint } from "../config.json";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 400
    // paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  resize: {
    width: "300px",
    height: "300px"
  }
});
const Pokemon = ({
  history,
  match: {
    params: { pokemonId }
  }
}) => {
  const classes = useStyles();
  const [pokemon, setPokemon] = useState(undefined);
  useEffect(() => {
    http
      .get(`${apiEndpoint}/${pokemonId}`)
      .then(function({ data }) {
        setPokemon(data);
      })
      .catch(function(error) {
        console.log(error);

        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = pokemon => {
    const { name, id, sprites, species, height, weight, types } = pokemon;

    const { front_default, front_shiny } = sprites;

    const Pname = <Typography variant="h3">{name}</Typography>;
    return (
      <>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {id}
              </Avatar>
            }
            action={
              <Typography>
                <img src={front_shiny} alt="sprite" />
              </Typography>
            }
            title={Pname}
          />
          <CardMedia
            className={classes.media}
            image={front_default}
            title={name}
          />
          <CardContent>
            <Typography variant="h4" color="textPrimary">
              Height: {height} Weight:{weight} Species:{" "}
              <Link href={species.url}>{species.name}</Link>
            </Typography>
            <Typography variant="h4" color="textPrimary">
              Types:{" "}
            </Typography>
            {types.map(t => (
              <Typography variant="h5" key={t.type.name}>
                {t.type.name}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography>Pokemon not Found</Typography>}
      {pokemon !== undefined && (
        <Button variant="outlined" color="secondary"onClick={() => history.push("/")}>
          Back to Pockedex
        </Button>
      )}
    </>
  );
};
export default Pokemon;
