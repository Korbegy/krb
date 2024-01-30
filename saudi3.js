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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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



// fa cup 
const apileaguescup = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=8`;
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
    
    const container = document.querySelector('#fa');
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
// end fa cup 




////////---------------///////////



// كاس السوبر الاوروبي
const apisupercup = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=15`;
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
        
        if (sport.statusText !== "Ended" && (sport.statusText !== "After Penalties") && (sport.statusText !== "After ET")) {
            
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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



// DELRAY live stream
const apidelray = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=13`;
async function getdelray() {
    let matchesFound = false; 
    const response = await fetch(apidelray);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#delray');
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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

getdelray();
// delray live stream 

   
//ASIA CUP live stream
const apiwc = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=6196`;
async function getwc() {
    let matchesFound = false; 
    const response = await fetch(apiwc);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#wc');
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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

getwc();
// wc live stream end 




  
//AFRICA live stream
const apiaf = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=167`;
async function getaf() {
    let matchesFound = false; 
    const response = await fetch(apiaf);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#af');
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
                const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;

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
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueSlug}`;
    
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

getaf();
// africa live stream end 


// inter miami matches
const messi = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitors=54729`;

async function getmessi() {
    let matchesFound = false;
    const response = await fetch(messi);
    const data = await response.json();
    const matches = data.games;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();

    const container = document.querySelector('#messi');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    for (const match of matches) {
        if (match.statusText !== "Ended" && (match.statusText !== "Postponed")) {
            if (match.statusText === "Scheduled") {
                const gameDate = new Date(match.startTime);
                // Check if the game is scheduled for today
                if (
                    gameDate.getDate() === today.getDate() &&
                    gameDate.getMonth() === today.getMonth() &&
                    gameDate.getFullYear() === today.getFullYear()
                ) {
                    matchesFound = true;
                    const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    const leagueName = match.competitionDisplayName;
                    const homeTeam = match.homeCompetitor.name;
                    const awayTeam = match.awayCompetitor.name;
                    const HLogo = match.homeCompetitor.id;
                    const ALogo = match.awayCompetitor.id;
                    const hometeamscore = match.homeCompetitor.score;
                    const awayteamscore = match.awayCompetitor.score;
                    const minu = match.gameTimeDisplay;
                    const gameID = match.id;
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueName}`;

                    // Display the league name for each scheduled match
                    const champElement = document.createElement('p');
                    champElement.className = 'champ';
                    champElement.textContent = `${leagueName}`;
                    container.appendChild(champElement);

                    // Display the match details
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
            // ... (rest of your code for live matches)
        }
    }

    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getmessi();
// end of inter miami matches 
    

// al nassr  matches
const ronaldo = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitors=7549`;

async function getronaldo() {
    let matchesFound = false;
    const response = await fetch(ronaldo);
    const data = await response.json();
    const matches = data.games;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();

    const container = document.querySelector('#ronaldo');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    for (const match of matches) {
        if (match.statusText !== "Ended" && (match.statusText !== "Postponed")) {
            if (match.statusText === "Scheduled") {
                const gameDate = new Date(match.startTime);
                // Check if the game is scheduled for today
                if (
                    gameDate.getDate() === today.getDate() &&
                    gameDate.getMonth() === today.getMonth() &&
                    gameDate.getFullYear() === today.getFullYear()
                ) {
                    matchesFound = true;
                    const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    const leagueName = match.competitionDisplayName;
                    const homeTeam = match.homeCompetitor.name;
                    const awayTeam = match.awayCompetitor.name;
                    const HLogo = match.homeCompetitor.id;
                    const ALogo = match.awayCompetitor.id;
                    const hometeamscore = match.homeCompetitor.score;
                    const awayteamscore = match.awayCompetitor.score;
                    const minu = match.gameTimeDisplay;
                    const gameID = match.id;
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueName}`;

                    // Display the league name for each scheduled match
                    const champElement = document.createElement('p');
                    champElement.className = 'champ';
                    champElement.textContent = `${leagueName}`;
                    container.appendChild(champElement);

                    // Display the match details
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
            // ... (rest of your code for live matches)
        }
    }

    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getronaldo();
// end of alnassr matches matches 


// Novak Djokovic tennis 
const Novak = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitors=2409`;

async function getNovak() {
    let matchesFound = false;
    const response = await fetch(Novak);
    const data = await response.json();
    const matches = data.games;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();

    const container = document.querySelector('#Novak');
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    for (const match of matches) {
        if (match.statusText !== "Ended" && (match.statusText !== "Postponed")) {
            if (match.statusText === "Scheduled") {
                const gameDate = new Date(match.startTime);
                // Check if the game is scheduled for today
                if (
                    gameDate.getDate() === today.getDate() &&
                    gameDate.getMonth() === today.getMonth() &&
                    gameDate.getFullYear() === today.getFullYear()
                ) {
                    matchesFound = true;
                    const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    const leagueName = match.competitionDisplayName;
                    const homeTeam = match.homeCompetitor.name;
                    const awayTeam = match.awayCompetitor.name;
                    const HLogo = match.homeCompetitor.id;
                    const ALogo = match.awayCompetitor.id;
                    const hometeamscore = match.homeCompetitor.score;
                    const awayteamscore = match.awayCompetitor.score;
                    const minu = match.gameTimeDisplay;
                    const gameID = match.id;
                    const link = `https://stream.krbgy.xyz/#${gameID}#${leagueName}`;

                    // Display the league name for each scheduled match
                    const champElement = document.createElement('p');
                    champElement.className = 'champ';
                    champElement.textContent = `${leagueName}`;
                    container.appendChild(champElement);

                    // Display the match details
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
            // ... (rest of your code for live matches)
        }
    }

    if (!matchesFound) {
        // No matches found, hide the container
        container.style.display = 'none';
    }
}

getNovak();
// end of novak matches matches 



// boxing live stream
const url = "https://boxingschedule.co/";

// Ensure that jQuery is loaded before using it
$(document).ready(function () {
    $.get(url, (html) => {
        const eventsDivs = $(html).find('.col-md-6.col-sm-6');

        eventsDivs.each((index, element) => {
            const date = $(element).find('.mec-event-date').text().trim();
            const eventDate = new Date(date + ' ' + new Date().getFullYear());
            const fullTitle = $(element).find('.mec-event-title').text().trim();
            const matchTime = fullTitle.split(' – ')[3] || "N/A"; // Assuming the time is the third part in the split
            const title = fullTitle.split(' – ')[0];
            const detailsDiv = $(element).find('.mec-event-detail');
            const placeElement = detailsDiv.find('.mec-event-loc-place');
            const place = placeElement.text().trim() || "N/A";

            // Check if the event date is today
            const isToday = isTodayDate(eventDate);

            console.log('Event Date:', eventDate);
            console.log('Is Today:', isToday);
            
            const resultHtml = `
            <div class="row">
              <div class="col-md-6 offset-md-3">
                  <div class="fixture-card" onclick="window.open('https://boxing.krbgy.xyz/#${title}', '_blank')">
                      <div class="row">
                          <div class="col-3">
                              <img class="team-logo" src="https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-boxing.png" alt="boxing logo">
                              </div>
                          <div class="col">
                              <h3>${title}</h3>
                              <span id="time">${date} - ${matchTime}</span>
                          </div>
                          <div class="col">
                            ${isToday ? 
                              `<button class="event-button" onclick="handleButtonClick('${title}')">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 58" height="15" width="15">
                                      <path stroke-width="9" stroke="currentColor" d="M44.25 36.3612L17.25 51.9497C11.5833 55.2213 4.5 51.1318 4.50001 44.5885L4.50001 13.4115C4.50001 6.86824 11.5833 2.77868 17.25 6.05033L44.25 21.6388C49.9167 24.9104 49.9167 33.0896 44.25 36.3612Z"></path>
                                  </svg> Live
                              </button>` : 
                              ``
                          }
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            `;
            $('#boxing').append(resultHtml);
        });
    });
});

function isTodayDate(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}

// end of boxing fixtures      

