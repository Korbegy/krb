const apiallsports = `https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=649`;

async function getsportsfixture() {
    const response = await fetch(apiallsports);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;

    const container = document.querySelector('#new');
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
        if (sport.statusText !== "Ended" && (sport.statusText !== "Final")) {
        if (sport.statusText === "Scheduled") {
            const gameDate = new Date(sport.startTime);
            // Check if the game is scheduled for today
            if (
                gameDate.getDate() === today.getDate() &&
                gameDate.getMonth() === today.getMonth() &&
                gameDate.getFullYear() === today.getFullYear()
            ) {
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
                    const link = `https://live.f20.us/`;
    
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
}

getsportsfixture();
