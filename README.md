# MoViz
https://github.com/sumedhmohile/moViz/assets/16150834/3edcb999-5620-42b3-9b74-13c258826c44

## Abstract
We have built a web application to visualize multiple plots describing the movie trends and various relationships between movie cast and production. By utilizing and analyzing these plots, we want to answer the objective question of what properties of a movie make it successful, with success being defined as high revenue or popularity. Users can set the properties and parameters of the plots to gain insights into the data. The data we are using is provided by The Movie Database API.

**View the report [here](https://github.com/sumedhmohile/moViz/blob/main/deliverables/MoViz__An_Analysis_and_Visualization_of_Movie_Data.pdf).**

## Data Source
The Movie Database API is available at https://developer.themoviedb.org/docs.

## Installation
- In the `code` directory, install the required Python libraries: `make setup`
- Fill in the details in the `code/config.json` file to point to the database and add the Django secret key
- Add a cron job to run the `code/databuilder/update_db_cache.sh` shell script once a day
- In the `code` directory, run the server: `make server`
- In the `code/frontend` directory, run the frontend: `npm start`

## Contributors
<table>
  <tr>
    <td align="center"><a href="https://github.com/sumedhmohile"><img src="https://avatars.githubusercontent.com/u/13029380?v=4" width="100px;" alt=""/><br /><sub><b>Sumedh Mohile</b></sub></a></td>
    <td align="center"><a href="https://github.com/Vipul97"><img src="https://avatars.githubusercontent.com/u/16150834?v=4" width="100px;" alt=""/><br /><sub><b>Vipul Gharde</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/walrm"><img src="https://avatars.githubusercontent.com/u/19277485?v=4" width="100px;" alt=""/><br /><sub><b>Bryan Law</b></sub></a><br /></td>
  </tr>
</table>
