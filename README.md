# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar.
- View current weather conditions including temperature, weather icon, and location details.
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts.
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons.
- View an hourly forecast showing temperature changes throughout the day.
- Switch between different days of the week using the day selector in the hourly forecast section.
- Toggle between Imperial and Metric measurement units via the units dropdown.
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.

### Links

- Live Site URL: [Weather App](https://leslies-weather-app.vercel.app/)

## My process

### Built with

- [Vite](https://vite.dev/guide/)
- [Vue](https://vuejs.org/guide/introduction.html)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Open-Meteo API](https://open-meteo.com/en/docs)
- [IP Geolocation API](https://ipgeolocation.io/ip-location-api.html)
- [Vitest](https://vitest.dev/guide/)
- [Pinia](https://pinia.vuejs.org/getting-started.html)
- [Vite SVG Loader](https://www.npmjs.com/package/vite-svg-loader)
- [Vercel](https://vercel.com/)

### What I learned

For this project I built a small backend to safely use the IP API without exposing the key. I'll most likely change this in the future because I implemented that API to show the user's current location on the first visit (as recommended by FrontendMentor), but that only works when you're running the project locally, so yeah. I'm becomming more comfortable using TypeScript and Pinia, so I'll definitely use them again in the future. I think I have a pretty good separation of concerns in the components, compared to a couple of previous projects, so I'm proud of myself for that one as well.

### Continued development

I liked this project, so I think I'll work on implementing a couple of the things recommended by Frontend Mentor:

- Add geolocation detection to automatically show weather for the user's current location on first visit.
- Implement a favorites/saved locations system where users can bookmark frequently checked locations.
- Implement a "Compare Locations" feature to view weather side-by-side for multiple locations.
- Include UV index, visibility, and air pressure data.
- Add sunrise/sunset times with visual indicators.
- Create dark/light mode themes that adapt to the time of day.

I also want to add a tooltip to the weather icons because I don't think they are as descriptive as they should be. I'll also look into implementing night icons because it looks odd to have a sun icon represent clear skies when you're on top of the Equator line.
