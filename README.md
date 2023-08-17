# SynagoguePrayersHandler

**Description:**<br>
SynagoguePrayersHandler is a web application for managing a list of prayer attendees at a synagogue.<br>
It allows you to add, update, and remove attendees as well as track their prayer status and weekly portion.

<img width="690" alt="SynagoguePrayersTracker usage screenshot." src="https://github.com/Bar-Levi/SynagoguePrayerTracker/assets/98148899/c66c36be-6cd4-42d5-9cc0-52222b2abf70">


## Features

- Add new attendees with their full names.
- Update prayer status (positive or negative) and associated comments.
- Update weekly Torah portion.
- Save and load data for persistent usage.
- Print the data table.
- Save the data table as a .pdf file.

## How to Use

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/Bar-Levi/SynagoguePrayerTracker.git
   ```
2. Open `index.html` in your web browser.

3. Use the application to manage the list of prayer attendees.

## JavaScript Code

The project includes a JavaScript file named `main.js`, which contains the main logic and functionality for managing the list of prayer attendees and data storage.

Here are some key functions and their purposes:

- `clearTable()`: Clears the list of prayer attendees.
- `refreshTable()`: Refreshes the displayed table with the updated list of prayer attendees.
- `addPrayer()`: Adds a new prayer attendee to the list.
- `removePrayer()`: Removes a prayer attendee from the list.
- `saveData()`: Saves the current list of prayer attendees and the weekly Torah portion to the browser's local storage.
- `loadData()`: Loads previously saved data from the browser's local storage, including the list of prayer attendees and the weekly Torah portion.
- `updateStatus()`: Updates the prayer status (positive or negative) and associated comments for a specific prayer attendee.
- `addPrayerAsOption()`: Adds a prayer attendee's name as an option in the input field for updating prayer status.
- `updateWeeklyPortion()`: Updates the weekly Torah portion.

Please refer to the `main.js` file in the project for detailed comments and explanations of each function's implementation.

## Dependencies

This project relies on the following external resources:

- `main.js`: Contains the JavaScript code for managing attendees and data.
- `new_styles.css`: Provides styles for the web application.
- `printing_styles.css`: Contains print-specific styles.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss the proposed changes.

## License

This project is not licensed and is free to use.
