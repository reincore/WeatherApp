import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { API_KEY } from "./utils/api/OpenWeather";

import Weather from "./components/Weather";

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "Error Getting Weather Conditions"
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, temperature, weatherCondition } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Fetching The Weather</Text>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
