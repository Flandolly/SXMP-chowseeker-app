# Chowseeker App

## Overview (Backend)

Language(s) Used: Java 11 (Maven)\
Technologies Used: Spring Boot Framework, H2, Project Lombok, Flyway, OpenCSV, PostgreSQL

### Models
Restaurant (schema below)

![Restaurant schema structure](https://i.imgur.com/L3Lpsq2.png)

### Architectural Design Choice

This app utilizes the Model-View-Controller (MVC) design pattern. A description of how each concept is explained as follows.

#### Model

The `Restaurant` model serves as the model portion of MVC design as it contains all the properties for a given model, allowing it to be interacted with directly by the controller.

#### View

The React Frontend represents the View portion of MVC as it handles how to display the data received from the controller and is able to send requests for new data.

#### Controller

Each model has a respective controller (i.e. `RestaurantController`) which will serve as a way to communicate with the underlying model as well as communicate changes to the view. In this case, it stores all the CRUD functionality for a restaurant.

### Object-Oriented Principle Usage

This application incorporates several object-oriented principles. The `Restaurant` model/class utilizes encapsulation as all its attributes are declared as private variables to prevent their values from being directly accessed. Instead, each of the attributes have their own set of public setter and getter methods as a means of modifying the attribute.\
The controllers also take advantage of inheritance as the controller class extends from a `JpaRepository` to have access to its built-in CRUD methods that can be reused through the app rather having to create one from scratch.

### Sample API Payload + Response

``GET /api/restaurants/1fe8a3d1-a00e-42e7-9916-63b0689ee1d1``\
``https://chowseeker-server.herokuapp.com/api/restaurants/1fe8a3d1-a00e-42e7-9916-63b0689ee1d1``

#### Response

```json
{
"id": "1fe8a3d1-a00e-42e7-9916-63b0689ee1d1",
"name": "Zuri Food Facilities",
"locationDescription": "02ND ST: STILLMAN ST to BRYANT ST (454 - 499)",
"address": "490 02ND ST",
"photo": "https://cdn2.thecatapi.com/images/9j6.jpg",
"foodTypes": "Peruvian Food Served Hot",
"latitude": 37.783047,
"longitude": -122.394066,
"schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=22MFF-00004&ExportPDF=1&Filename=22MFF-00004_schedule.pdf",
"locationExact": "(37.783046099749996, -122.39406659922962)",
"likes": 0,
"dislikes": 0
}
```

## Overview (Frontend)

Language(s) Used: JavaScript\
Technologies Used: React, React Router, Bootstrap + Reactstrap

### Views

#### Home/Landing Page

This is the first page that the user will see where they can start a new search for a restaurant.

![Home/Landing Page](https://i.imgur.com/XlN1nqx.png)

#### Search Result Page

After a users searches for a food or an address, the results will be displayed here. There are up to 21 results (of `Restaurant` components) displayed at a time, giving the user the option to select a page to view using the pagination bar. Also includes a navigation bar to return back to the home page and to open a form to create a new restaurant listing. \
\
If a result doesn't have a photo, a 3rd-party API (TheCatAPI.com) is used to automatically generate an image.

![Search Result Page](https://i.imgur.com/Qv9htdu.png)

#### Restaurant Creation Component

A modal that is displayed if a user wants to add a new restaurant listing into the application. Upon listing creation, page automatically redirects to the new restaurant's detail page.

![New Restaurant Modal](https://i.imgur.com/v4toc9h.png)

#### Restaurant Detail Page

User can view some more details about a restaurant, such as being able to locate the restaurant on a map based on the address provided. They are also able to like or dislike a restaurant, edit its details, or remove its listing entirely.

![Restaurant Detail Page](https://i.imgur.com/fAkgm5n.png)

#### Restaurant Edit Modal

A modal that is displayed if a user wants to make edits to a restaurant listing. They can edit the name, address, photo and food types. On save, the listing automatically updates with the new information.

![Edit Restaurant Modal](https://i.imgur.com/JCGFz4S.png)

#### Restaurant Delete Modal

A modal that is display to confirm whether the user wants to delete a listing, helping prevent accidental deletion. Upon confirmation, page automatically redirects back to the search result page.

![Delete Restaurant Modal](https://i.imgur.com/TQlhokh.png)