// الدوري السعودي 
const apisaudileague = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=649`;
async function getsaudileague() {
    let matchesFound = false; 
    const response = await fetch(apisaudileague);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#saudileague');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
   
    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "Postponed")) {
        if (sport.statusText === "Scheduled") {
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                matchesFound = true; 
                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Ended")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
            }
           
    }
    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getsaudileague();
// نهاية الدوري السعودي


////////---------------///////////



// الدوري بتاع ميسي 
const apileaguescup = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=7242`;
async function getleaguescup() {
    let matchesFound = false; 
    const response = await fetch(apileaguescup);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    
    const container = document.querySelector('#leaguescup');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
    
   

    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "Postponed")) {
            
        if (sport.statusText === "Scheduled") {
            
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                matchesFound = true; 
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Ended")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
                                 
            }
}
if (!matchesFound) {
    // No matches found, hide the container
    container.style.display = 'none';
}
}

getleaguescup();
// دوري بتاع ميسي




////////---------------///////////



// كاس السوبر الاوروبي
const apisupercup = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=472`;
async function getsupercup() {
    let matchesFound = false; 
    const response = await fetch(apisupercup);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    
    const container = document.querySelector('#supercup');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
    
   

    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "Postponed")) {
            
        if (sport.statusText === "Scheduled") {
            
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                matchesFound = true; 
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Ended")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
                                 
            }
}
if (!matchesFound) {
    // No matches found, hide the container
    container.style.display = 'none';
}
}

getsupercup();
//نهاية كاس السوبر الاوروبي


////////---------------///////////



// دوري ابطال اوروبا
const apichampionsleague = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=572`;
async function getchampionsleaguenow() {
    let matchesFound = false; 
    const response = await fetch(apichampionsleague);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    
    const container = document.querySelector('#championsleague');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
    
   

    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "Postponed")) {
            
        if (sport.statusText === "Scheduled") {
            
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                matchesFound = true; 
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Ended")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
                                 
            }
}
if (!matchesFound) {
    // No matches found, hide the container
    container.style.display = 'none';
}
}

getchampionsleaguenow();
// دوري ابطال اوروبا



////////---------------///////////



// دوري ابطال اسيا
const apiasia = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=623`;
async function getasia() {
    let matchesFound = false; 
    const response = await fetch(apiasia);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    
    const container = document.querySelector('#asia');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
    
   

    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "After ET")) {
            
        if (sport.statusText === "Scheduled") {
            
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                matchesFound = true; 
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled") { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
                                 
            }
}
if (!matchesFound) {
    // No matches found, hide the container
    container.style.display = 'none';
}
}

getasia();
// دوري ابطال اسيا



////////---------------///////////


// NCAAF 
const apincaaf = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=382`;
async function getncaaf() {
    let matchesFound = false; 
    const response = await fetch(apincaaf);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    
    const container = document.querySelector('#ncaaf');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
    
   

    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.shortStatusText !=="Final" && (sport.shortStatusText !== "Final (OT)")) {
            console.log(sport.statusText);
        if (sport.statusText === "Scheduled") {
            
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                matchesFound = true; 
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled") { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
                                 
            }
}
if (!matchesFound) {
    // No matches found, hide the container
    container.style.display = 'none';
}
}

getncaaf();
// end of ncaaf



// FIBA WORLD CUP 
const apinbaworld = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=471`;
async function getnbaworld() {
    let matchesFound = false; 
    const response = await fetch(apinbaworld);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    
    const container = document.querySelector('#nbaworld');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
    
   

    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.shortStatusText !=="Final" && (sport.shortStatusText !== "Final (OT)")) {
            console.log(sport.statusText);
        if (sport.statusText === "Scheduled") {
            
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                matchesFound = true; 
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled") { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
                                 
            }
}
if (!matchesFound) {
    // No matches found, hide the container
    container.style.display = 'none';
}
}

getnbaworld();
// end of fiba



// التأهل لكأس العالم 
const apiconmebol = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=613`;
async function getconmebol() {
    let matchesFound = false; 
    const response = await fetch(apiconmebol);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#conmebol');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
   
    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "Postponed")) {
        if (sport.statusText === "Scheduled") {
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                matchesFound = true; 
                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Ended")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
            }
           
    }
    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getconmebol();
// تصفيات امريكا المؤهلة لكاس العالم 




// us open live stream
const apiusopen = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=230`;
async function getusopen() {
    let matchesFound = false; 
    const response = await fetch(apiusopen);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#usopen');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
   
    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "Postponed")) {
        if (sport.statusText === "Scheduled") {
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                matchesFound = true; 
                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Ended")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
            }
           
    }
    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getusopen();
// us open live stream 



// nfl live stream
const apinfl = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=352`;
async function getnfl() {
    let matchesFound = false; 
    const response = await fetch(apinfl);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#nfl');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
   
    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Final" && (sport.statusText !== "Postponed")) {
        if (sport.statusText === "Scheduled") {
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                matchesFound = true; 
                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Final")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
            }
           
    }
    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getnfl();
// nfl live stream 
// MLB live stream
const apimlb = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=438`;
async function getmlb() {
    let matchesFound = false; 
    const response = await fetch(apimlb);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#mlb');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Find the index of the first scheduled game
    let firstScheduledIndex = -1;
    for (let i = 0; i < Sports.length; i++) {
        if (Sports[i].statusText === "Scheduled") {
            firstScheduledIndex = i;
            break;
        }
    }

    // هنا اضافة الاسم قبل البتاع الاول بس 
    if (firstScheduledIndex !== -1) {
        const champElement = document.createElement('p');
        champElement.className = 'champ';
        champElement.textContent = `${leagueName}`;
        container.appendChild(champElement);
    }
   
    // Render all scheduled games
    for (const sport of Sports) {
        
        if (sport.statusText !== "Final" && (sport.statusText !== "Postponed")) {
        if (sport.statusText === "Scheduled") {
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
                const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                matchesFound = true; 
                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const gameID = sport.id;
                const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                <div class="row">
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                        <h3 class="team-name">${homeTeam}</h3>
                                    </div>
                                    <div class="col">
                                        <h1>VS</h1>
                                        <span id="time">${estTimeStr}</span>
                                    </div>
                                    <div class="col">
                                        <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                        <h3 class="team-name">${awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(teamContainer);
            }
           
        }
        
                // if live  now
                if (sport.statusText !== "Scheduled" && (sport.statusText !== "Final")) { 
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const hometeamscore = sport.homeCompetitor.score;
                    const awayteamscore = sport.awayCompetitor.score;
                    const minu = sport.gameTimeDisplay;
                    const gameID = sport.id;
                    const link = `https://weego365.f20.us/#${gameID}#${leagueSlug}`;
    
                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-6 offset-md-3">
                                <div class="fixture-card" onclick="window.open('${link}', '_blank')">
                                    <div class="row">
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${HLogo}" alt="${homeTeam} logo">
                                            <h3 class="team-name">${homeTeam}</h3>
                                        </div>
                                        <div class="col">
                                        <h1 id='time'>
                             
                                        ${hometeamscore} : ${awayteamscore}
                                         
                                         </h1>
                                        
   
                                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> ${minu} LIVE</span></td>
                                        </div>
                                        <div class="col">
                                            <img class="team-logo" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitors/${ALogo}" alt="${awayTeam} Logo">
                                            <h3 class="team-name">${awayTeam}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    
                    container.appendChild(teamContainer);
                    
                } // if live 
            }
           
    }
    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getmlb();
// mlb live stream 
