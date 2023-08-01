window.addEventListener("resize", initialize);
window.addEventListener("orientation", initialize);

let prayersDatabase = [];
let weeklyPortion = "בראשית";

class Prayer{
    constructor(name) {
        this.name = name;
        this.plus = 0
        this.minus = 0;
        this.comment = "";
        prayersDatabase.push(this);
        }
    toString() {
        return "Name: "+this.name+", plus: "+this.plus+", minus: "+this.minus + ", comment: " +this.comment;
    }
}

function clearTable() {
    let prayersList = document.getElementById("prayers-list");
    while (prayersList.firstChild) {
        prayersList.firstChild.remove();
    }
    let prayersAutoFillList = document.getElementById("existing-names-options");
    while(prayersAutoFillList.firstChild) {
        prayersAutoFillList.firstChild.remove();
    }
    prayersDatabase = []
}

function refreshTable() {
    let prayersList = document.getElementById("prayers-list");
    while (prayersList.firstChild) {
        prayersList.firstChild.remove();
    }
    prayersDatabase.forEach((prayer) => {
        addPrayerToTable(prayer, prayersList);
    })

}

function addPrayerToTable(newPrayer, prayersList) {
    let newPrayerLine = document.createElement("li");
    newPrayerLine.setAttribute('class', 'prayer-line');
    newPrayerLine.setAttribute('id', 'prayer-line-'+newPrayer.name)

    linesCount = prayersList.children.length;

    let commentBox = document.createElement('span');
    commentBox.setAttribute("class", "table-box comment");
    commentBox.textContent = newPrayer.comment;

    let nameBox = document.createElement('span');
    nameBox.setAttribute("class", "table-box");
    nameBox.textContent = newPrayer.name;

    let plusBox = document.createElement('span');
    plusBox.setAttribute("class", "table-box");
    plusBox.textContent = newPrayer.plus;

    let minusBox = document.createElement('span');
    minusBox.setAttribute("class", "table-box");
    minusBox.textContent = -1*parseInt(newPrayer.minus);



    newPrayerLine.appendChild(commentBox);
    newPrayerLine.appendChild(plusBox);
    newPrayerLine.appendChild(minusBox);
    newPrayerLine.appendChild(nameBox);

    prayersList.appendChild(newPrayerLine);
}

function removePrayerFromTable(nameToRemove, prayersList) {
    try {
        const lineToRemove = document.getElementById('prayer-line-' + nameToRemove);
        prayersList.removeChild(lineToRemove);
    } catch (e) { console.log("[Handled Error] Tried to remove a name which doesn't exist.")}
}

function addPrayer() {
    const prayersList = document.getElementById("prayers-list");
    const nameInputBox = document.getElementById("newPrayerName")
    const newPrayerName = nameInputBox.value.trimStart().trimEnd();
    nameInputBox.value = "";

    exist = false;
    prayersDatabase.forEach((prayer) => {
        if (prayer.name === newPrayerName)
            exist = true;
    })
    if (exist) {
        nameInputBox.classList.add("error");
        nameInputBox.setAttribute("placeholder", "שם כבר קיים");
        return;
    }

    nameInputBox.classList.remove("error");
    nameInputBox.setAttribute("placeholder", "שם מלא");
    addPrayerAsOption(newPrayerName);

    let newPrayer = new Prayer(newPrayerName);
    addPrayerToTable(newPrayer, prayersList);

    


}

function removePrayer() {
    const prayersList = document.getElementById("prayers-list");
    const nameInputBox = document.getElementById("newPrayerName")
    const nameToRemove = nameInputBox.value;
    removePrayerFromTable(nameToRemove, prayersList);

    nameInputBox.value = "";
    prayersDatabase = prayersDatabase.filter((prayer) => prayer.name !== nameToRemove);
}

function saveData() {
    localStorage.setItem("prayersList", JSON.stringify(prayersDatabase));
    localStorage.setItem("weeklyPortion", JSON.stringify(weeklyPortion));

    console.log("Data was saved.");
}

function loadData() {
    try {
        weeklyPortion = JSON.parse(localStorage.getItem("weeklyPortion"));

        let prayersList = document.getElementById("prayers-list");
        let storedData = localStorage.getItem("prayersList");
        if (storedData != null) {
            prayersDatabase = JSON.parse(storedData);
            prayersDatabase.forEach((prayer) => {
                addPrayerToTable(prayer, prayersList);
                addPrayerAsOption(prayer.name);
            });
        }
    } catch (e) {
        console.log(e);
        console.log("[Handled Error] Item 'prayersDatabase' doesn't exist in localStorage.")
        prayersDatabase = []
    }
}

function initializeTableHeightValue() {
    const tableWrapper = document.getElementById("table-wrapper");
    const bottomWrapper = document.getElementById("bottom-wrapper");
    const titleWrapper = document.getElementById("title-wrapper");
    if (tableWrapper != undefined & bottomWrapper != undefined & titleWrapper != undefined)
    {
        console.log(titleWrapper.clientHeight);
        console.log(tableWrapper.clientHeight);
        console.log(bottomWrapper.clientHeight);
        console.log(document.body.clientHeight);
        let heightResult = document.body.clientHeight - titleWrapper.clientHeight - bottomWrapper.clientHeight;
        tableWrapper.style.height = heightResult+'px';
    }
  
}

function initializeButtonsText() {
    console.log("Resetting buttons - "+ document.body.clientWidth)
    const updatePrayerButton = document.getElementById("updatePrayerButton");
    const clearTableButton = document.getElementById("clearTableButton");
    const addPrayerButton = document.getElementById("addPrayerButton");
    const removePrayerButton = document.getElementById("removePrayerButton");
    
    if (updatePrayerButton != undefined & clearTableButton != undefined & addPrayerButton != undefined & removePrayerButton != undefined)
    {
        if (document.body.clientWidth <= 450) {
            updatePrayerButton.innerText = "עדכן";
            clearTableButton.innerText = "איפוס";
            addPrayerButton.innerText = "הוסף";
            removePrayerButton.innerText = "הסר";
        }
        else {
            updatePrayerButton.innerText = "עדכן מתפלל";
            clearTableButton.innerText = "איפוס טבלה";
            addPrayerButton.innerText = "הוסף מתפלל";
            removePrayerButton.innerText = "הסר מתפלל";
        }
    }
}

function initialize() {
    initializeTableHeightValue();
    initializeButtonsText();
    initializeWeeklyPortion();
}

function updateStatus(){
    const updatedNameField = document.getElementById("updatedName");
    const updatedMoneyField = document.getElementById("updatedMoney");
    const updatedCommentField = document.getElementById("updatedComment");

    const updatedName = updatedNameField.value;
    let updatedMoney = updatedMoneyField.value;
    const updatedComment = updatedCommentField.value;


    updatedMoneyField.value = "";
    updatedNameField.value = "";
    updatedCommentField.value = "";

    if (updatedMoney === "") updatedMoney = 0;
    
    exist = false;
    prayersDatabase.forEach((prayer) => {
        if (prayer.name === updatedName)
            exist = true;
    })
    if (!exist) {
        updatedNameField.classList.add("error");
        updatedNameField.setAttribute("placeholder", "השם לא במערכת");
        return;
    }
    else {
        updatedNameField.classList.remove("error");
        updatedNameField.setAttribute("placeholder", "שם מלא");
    }

    prayersDatabase.forEach((prayer) => {
        console.log(prayer["name"]);

        if (prayer.name === updatedName)
        {
            prayer.comment = updatedComment;
            if (updatedMoney >= 0) { // אם המתפלל הביא כסף
                if (prayer.plus > 0) { // אם הוא בזכות
                    prayer.plus += parseInt(updatedMoney);
                }
                else {  // אם הוא בחוב
                    if (parseInt(prayer.minus) + parseInt(updatedMoney) >= 0) // אם כיסה את החוב
                    {
                        prayer.plus = parseInt(prayer.minus) + parseInt(updatedMoney);
                        prayer.minus = 0;
                    }
                    else  // אם לא כיסה את החוב - רק הקטין אותו
                        prayer.minus += parseInt(updatedMoney);
                }
            }
            else 
            {  // אם המתפלל הוציא כסף
                if (prayer.minus < 0) { // אם הוא בחוב
                    prayer.minus += parseInt(updatedMoney);
                }
                else {  // אם הוא בזכות
                    if (parseInt(prayer.plus)+ parseInt(updatedMoney) <= 0) // אם ניצל את כל הזכות ונכנס לחוב
                    {
                        prayer.minus = parseInt(prayer.plus)+ parseInt(updatedMoney);
                        prayer.plus = 0;
                    }
                    else  // אם לא ניצל את כל הזכות - רק הקטין אותה
                        prayer.plus += parseInt(updatedMoney);
                }
            }
        }
    });
    refreshTable();
}

function addPrayerAsOption(name) {
    const nameOptionsList = document.getElementById("existing-names-options")
    const newOption = document.createElement("option");
    newOption.setAttribute("value", name);
    nameOptionsList.appendChild(newOption);
}

function updateWeeklyPortion() {
    let weeklyPortionField = document.getElementById("updated-portion-name");

    
    if (weeklyPortionField.value === "") {
        weeklyPortionField.classList.add("error");
        weeklyPortionField.setAttribute("placeholder", "הכנס שם");
        return;
    }

    weeklyPortion = weeklyPortionField.value.trimStart().trimEnd();
    weeklyPortionField.classList.remove("error");
    weeklyPortionField.setAttribute("placeholder", "שם הפרשה");
    

    weeklyPortionField.value = "";

    initializeWeeklyPortion();
}

function initializeWeeklyPortion() {
    let mainTitleField = document.getElementById("portionTitle");

    if (weeklyPortion == null) weeklyPortion = "בראשית";
    mainTitleField.innerHTML = "פרשת '" + weeklyPortion + "' ";
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
    const day = today.getDate();
    mainTitleField.innerHTML += '| ' + day + '.' + month + '.' + year;
}