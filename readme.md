<p align="center">
  <a href="#project">Project</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#running-the-project">Running the project</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#layout">Layout</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=32B768&labelColor=0A1033">

 <img src="https://img.shields.io/static/v1?label=NLW&message=05&color=32B768&labelColor=0A1033" alt="NLW 05" />
</p>


![cover](.github/cover.png?style=flat)


## Project

This app helps you to take care of your plants. This project was developed during the [Next Level Week](https://nextlevelweek.com/) by [Rocketseat](https://rocketseat.com.br). 


## Technologies

* React Native
* Typescript
* Expo
* Expo Local Notifications
* Async Storage
* Axios
* Lottie
* Expo Google Fonts
* React Navigation Stack e Bottom Tabs
* React Native Gesture Handler
* JSON Server


## Running the project

Clone the project and access the folder.

```shell
$ git clone https://github.com/jheanr/plantmanager.git && cd plantmanager
```

Follow these steps.

```shell
# Install the dependencies
$ yarn

# Run Expo
$ expo start

# JSON Server *see details below
$ yarn server
```

*Before running `yarn server`, edit the files `package.json` and `/sr/services/api.ts`, changing the IP to your local IP.

```cbash
# package.json
# Edit the IP in this line
...
"server": "json-server ./src/services/server.json --host 192.168.100.100 --port 3333 --delay 750"
...
```

```shell
# api.ts
# Edit the IP in this line
...
baseURL: 'http://192.168.100.14:3333'
...
```


## Layout

You can access the layout [here](https://www.figma.com/file/IhQRtrOZdu3TrvkPYREzOy/PlantManager). 


## License

This project is under the MIT License. See the [LICENSE](LICENSE.md) file for details.
