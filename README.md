# Stadium Wizard

[Stadium Wizard](https://stadiumwizard.vercel.app) is a web app that helps users to get a grasp of what teams are available in FIFA Manager 14's [2023 season update](https://www.moddb.com/mods/fifa-manager-season-patch) and the available list of stadiums in the published Google Drive archive.

Previously, it took users hard to navigate through the published archive and understand what custom stadiums became available. The Google Drive file repository was quite clumsy considering the user experience, so I built this website to help gamers who wants to enhance FIFA Manager 14's 3D mode with custom stadiums. The website got immediate acclaim and was widely appreciated by users.

Users can view the list of available teams by accessing the 'Team List' page and selecting a country followed by a league. This will display a list of teams within the chosen league, alongside stadium availability indicated in the rightmost column. If the 'Available' button appears for a specific team, users can click it to obtain instructions on downloading the game files for the corresponding stadium.

Users can also view the list of available stadiums through the 'Stadium List' page. Using the DataTable structure, users can filter the list based on the date of publication, country, and team name.

The app is built using MERN stack, as the backend based on a MongoDB database written with Express.js and Node.js, is available at the repository below.

<p>
<a href="https://github.com/muratcansarkalkan/stadiumwizardbackend">
  <img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=muratcansarkalkan&repo=stadiumwizardbackend" />
</a>
</p>
The frontend has been developed with React.js and Typescript.

## Contributing

The project is composed of two different parts. 
Follow the steps below to run the project locally and contribute.

1. Clone both this repository and the backend repository included above.
    - `git clone git@github.com:muratcansarkalkan/stadiumwizard.git`
    - `git clone git@github.com:muratcansarkalkan/stadiumwizardbackend.git`
2. Download and install [Node.js](https://nodejs.org/en/). NPM will also come bundled with Node.js. [See this page](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for more info.
3. After installing Node.js, install the dependencies for both frontend and backend repositories.
    - `cd stadiumwizard && npm install`
    - `cd .. && cd stadiumwizardbackend && npm install`
4. After installing the dependencies with `npm`, create a `.env` file both for frontend and backend repositories on the root of the project.
5. Get the `ATLAS_URI` credentials from the project admin for stadiumwizardbackend and save the .env file in stadiumwizardbackend directory.
6. Start the API connection by running `cd stadiumwizardbackend && nodemon server`. By default, the API will run on port 5000.
7. The `REACT_APP_CONNECTION_STRING` credential you need to frontend to run properly is the port address for API. For port 5000, add this line to the .env file in stadiumwizard directory.
    - `REACT_APP_CONNECTION_STRING='http://localhost:5000'`
8. To run the website, type `npm start`. This will start the web client.
9. Open up `localhost:3000` and start hacking.
