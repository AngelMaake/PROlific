const players = [];
let currentIndex = 0;

function saveData() {
    const data = JSON.stringify(players);
    localStorage.setItem('playerData', data);
}

function loadData() {
    const data = localStorage.getItem('playerData');
    if (data) {
        players = JSON.parse(data);
    }
}

function showFullProfile(player) {
    const table = document.querySelector("table");
    table.style.display = "none";

    const fullProfileDiv = document.getElementById("fullProfile");
    fullProfileDiv.innerHTML = `
        <h2>${player.name} ${player.surname}</h2>
        <img src="${player.image}" alt="${player.name}'s Image" style="max-width: 200px;">
        <p><strong>Name:</strong> ${player.name}</p>
        <p><strong>Surname:</strong> ${player.surname}</p>
        <p><strong>Nickname:</strong> ${player.nickname}</p>
        <p><strong>Date of Birth:</strong> ${player.dateOfBirth}</p>
        <p><strong>Nationality:</strong> ${player.nationality}</p>
        <p><strong>Loqdown Team:</strong> ${player.loqdownTeam}</p>
        <p><strong>Event:</strong> ${player.event}</p>
        <p><strong>Residential District:</strong> ${player.residentialDistrict}</p>
        <p><strong>Affiliation:</strong> ${player.affiliation}</p>
        <p><strong>ID/Passport Number:</strong> ${player.id}</p>
        <p><strong>Phone Number:</strong> ${player.phoneNumber}</p>
        <p><strong>Position:</strong> ${player.position}</p>
        <p><strong>Height:</strong> ${player.height}</p>
        <p><strong>Wingspan:</strong> ${player.wingspan}</p>
        <button id="backToTable">Back to Table</button>
    `;

    fullProfileDiv.style.display = "block";

    const backToTableButton = document.getElementById("backToTable");
    backToTableButton.addEventListener("click", () => {
        table.style.display = "table";
        fullProfileDiv.style.display = "none";
    updateTable();
    });
}

function showPhotos(player) {
    const table = document.querySelector("table");
    table.style.display = "none";

    const photosDiv = document.getElementById("photos");
    photosDiv.innerHTML = `
        <h2>Photos of ${player.name} ${player.surname}</h2>
        <button id="addPhoto">Add Photo</button>
        <div id="clientPhotos"></div>
        <button id="backToTable">Back to Table</button>
    `;

    photosDiv.style.display = "block";

    const addPhotoButton = document.getElementById("addPhoto");
    const addPhotoModal = document.getElementById("addPhotoModal");
    const closePhotoModal = document.getElementById("closePhotoModal");
    const newPhotoInput = document.getElementById("newPhoto");
    const submitNewPhotoButton = document.getElementById("submitNewPhoto");

    addPhotoButton.addEventListener("click", () => {
        addPhotoModal.style.display = "block";
    });

    closePhotoModal.addEventListener("click", () => {
        addPhotoModal.style.display = "none";
    });

    submitNewPhotoButton.addEventListener("click", () => {
        const clientPhotos = document.getElementById("clientPhotos");
        const newPhoto = document.getElementById("newPhoto").files[0];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(newPhoto);
        img.alt = "Uploaded Photo";
        img.style.width = "200px";
        img.style.height = "200px";
        img.addEventListener("click", () => {
            img.classList.toggle("expanded-image");
        });
        clientPhotos.appendChild(img);

        addPhotoModal.style.display = "none";
    });


    const backToTableButton = document.getElementById("backToTable");
    backToTableButton.addEventListener("click", () => {
        table.style.display = "table";
        photosDiv.style.display = "none";
        updateTable();
    });
}

function addMoreCell(row, player) {
    const moreCell = document.createElement("td");

    const fullProfileButton = document.createElement("button");
    fullProfileButton.textContent = "Full Profile";
    fullProfileButton.addEventListener("click", () => {
        showFullProfile(player);
    });

    const photosButton = document.createElement("button");
    photosButton.textContent = "Photos";
    photosButton.addEventListener("click", () => {
        showPhotos(player);
    });

    moreCell.appendChild(fullProfileButton);
    moreCell.appendChild(photosButton);

    row.appendChild(moreCell);
}

function updateTable() {
    const playersTableBody = document.getElementById("playersTableBody");
    playersTableBody.innerHTML = "";

    players.forEach((player) => {
        const row = document.createElement("tr");
        const imageCell = document.createElement("td");
        const playerImage = document.createElement("img");
        playerImage.src = player.image;
        playerImage.style.maxWidth = "100px";
        imageCell.appendChild(playerImage);

        row.appendChild(imageCell);
        row.innerHTML += `
            <td>${player.name}</td>
            <td>${player.surname}</td>
            <td>${player.nickname}</td>
            <td>${player.dateOfBirth}</td>
            <td>${player.height}</td>
            <td>${player.loqdownTeam}</td>
            <td>${player.nationality}</td>
        `;
        addMoreCell(row, player);

        playersTableBody.appendChild(row);
    });
}

function updatePlayerInfo(index) {
    if (players.length > 0) {
        const player = players[index];
        document.getElementById("playerName").textContent = `Name: ${player.name}`;
        document.getElementById("playerSurname").textContent = `Surname: ${player.surname}`;
        document.getElementById("playerNickname").textContent = `Nickname: ${player.nickname}`;
        document.getElementById("playerDateOfBirth").textContent = `Date of Birth: ${player.dateOfBirth}`;
        document.getElementById("playerNationality").textContent = `Nationality: ${player.nationality}`;
        document.getElementById("playerLoqdownTeam").textContent = `Loqdown Team: ${player.loqdownTeam}`;
        document.getElementById("playerEvent").textContent = `Event: ${player.event}`;
        document.getElementById("playerResidentialDistrict").textContent = `Residential District: ${player.residentialDistrict}`;
        document.getElementById("playerAffiliation").textContent = `Affiliation: ${player.affiliation}`;
        document.getElementById("playerId").textContent = `ID/Passport Number: ${player.id}`;
        document.getElementById("playerPhoneNumber").textContent = `Phone Number: ${player.phoneNumber}`;
        document.getElementById("playerPosition").textContent = `Position: ${player.position}`;
        document.getElementById("playerHeight").textContent = `Height: ${player.height}`;
        document.getElementById("playerWingspan").textContent = `Wingspan: ${player.wingspan}`;
        document.getElementById("playerImage").src = player.image;
    }
}

function showAddPlayerModal() {
    const addPlayerModal = document.getElementById("addPlayerModal");
    addPlayerModal.style.display = "block";
}

function toggleAddPlayerModal() {
    const addPlayerModal = document.getElementById("addPlayerModal");
    addPlayerModal.style.display = (addPlayerModal.style.display === "block") ? "none" : "block";
}

function submitNewPlayer() {
    const newPlayerForm = document.getElementById("newPlayerForm");
    const newPlayerName = document.getElementById("newPlayerName").value;
    const newPlayerSurname = document.getElementById("newPlayerSurname").value;
    const newPlayerNickname = document.getElementById("newPlayerNickname").value;
    const newPlayerDateOfBirth = document.getElementById("newPlayerDateOfBirth").value;
    const newPlayerNationality = document.getElementById("newPlayerNationality").value;
    const newPlayerLoqdownTeam = document.getElementById("newPlayerLoqdownTeam").value;
    const newPlayerEvent = document.getElementById("newPlayerEvent").value;
    const newPlayerResidentialDistrict = document.getElementById("newPlayerResidentialDistrict").value;
    const newPlayerAffiliation = document.getElementById("newPlayerAffiliation").value;
    const newPlayerId = document.getElementById("newPlayerId").value;
    const newPlayerPhoneNumber = document.getElementById("newPlayerPhoneNumber").value;
    const newPlayerPosition = document.getElementById("newPlayerPosition").value;
    const newPlayerHeight = document.getElementById("newPlayerHeight").value;
    const newPlayerWingspan = document.getElementById("newPlayerWingspan").value;
    const newPlayerImage = document.getElementById("newPlayerImage").files[0];

    if (
        newPlayerName &&
        newPlayerSurname &&
        newPlayerNickname &&
        newPlayerDateOfBirth &&
        newPlayerNationality &&
        newPlayerLoqdownTeam &&
        newPlayerEvent &&
        newPlayerResidentialDistrict &&
        newPlayerAffiliation &&
        newPlayerId &&
        newPlayerPhoneNumber &&
        newPlayerPosition &&
        newPlayerHeight &&
        newPlayerWingspan &&
        newPlayerImage
    ) {
        const newPlayer = {
            name: newPlayerName,
            surname: newPlayerSurname,
            nickname: newPlayerNickname,
            dateOfBirth: newPlayerDateOfBirth,
            nationality: newPlayerNationality,
            loqdownTeam: newPlayerLoqdownTeam,
            event: newPlayerEvent,
            residentialDistrict: newPlayerResidentialDistrict,
            affiliation: newPlayerAffiliation,
            id: newPlayerId,
            phoneNumber: newPlayerPhoneNumber,
            position: newPlayerPosition,
            height: newPlayerHeight,
            wingspan: newPlayerWingspan,
            image: URL.createObjectURL(newPlayerImage),
        };

        players.push(newPlayer);
        currentIndex = players.length - 1;

        saveData();

        console.log("Before updateTable");
        updateTable();
        console.log("After updateTable");

        newPlayerForm.reset();
    } else {
        alert("Please fill in all fields, including selecting an image.");
    }
}

document.getElementById("addPlayerButton").addEventListener("click", showAddPlayerModal);
document.getElementById("closeModal").addEventListener("click", toggleAddPlayerModal);
document.getElementById("submitNewPlayer").addEventListener("click", submitNewPlayer);

loadData();

updatePlayerInfo(currentIndex);

updateTable();