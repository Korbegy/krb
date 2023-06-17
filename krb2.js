 //  كود جلب تاريخ اليوم في المباريات
 let today = new Date();
 let year = today.getFullYear();
 let month = String(today.getMonth() + 1).padStart(2, '0');
 let day = String(today.getDate()).padStart(2, '0');
 let formattedDate = year + month + day;
 
 //  ?dates=${formattedDate}`
 
          // UEFA NATIONS LEAGUE MATCHES 
          const API_URLnations = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.nations/scoreboard?dates=${formattedDate}`;
 
   
          async function getnationsfixture() {
            const response = await fetch(`${API_URLnations}`);
            const data = await response.json();
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const today = new Date();
            const currentDayOfWeek = today.getDay();
            const league = data.leagues;
            const Slug = league[0].slug;
            const events = data.events;
            let matchesFound = false;
            for (const event of events) {
                if (event.status.type.description !== "Postponed"){
                  const homeTeam = event.competitions[0].competitors[0];
                  const awayTeam = event.competitions[0].competitors[1];
                  const detail = event.status.type.detail;
                  const eventId = event.id;
                  const eventDate = new Date(event.date);
                  const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                  const eventDayOfWeek = eventDate.getDay();
                  const startTime = new Date(event.date);
                  const currentTime = new Date();
                  const hometeamscore = event.competitions[0].competitors[0].score;
                  const awayteamscore = event.competitions[0].competitors[1].score;
                  console.log(league);
            const nations_URL = `https://live.f20.us/#${Slug}/${eventId}`;
            if (event.status.type.state === "pre"){
               const container = document.querySelector('#nationsfixtures');
              const teamContainer = document.createElement('div');
                 
                  teamContainer.innerHTML = `
                  <div class="row">
                  <div class="col-md-6 offset-md-3">
                      <div class="fixture-card" onclick="window.open('${nations_URL}', '_blank')">
                          <div class="row">
                              <div class="col">
                                  <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                  <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                              </div>
                              <div class="col">
                              <h1>VS</h1>
                              <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                              </div>
                              <div class="col">
                                  <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                  <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              `;
              container.appendChild(teamContainer); 
                
            }
       if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
                  const container = document.querySelector('#nationsfixtures');
              const teamContainer = document.createElement('div');
                 
                  teamContainer.innerHTML = `
                  <div class="row">
                  <div class="col-md-6 offset-md-3">
                      <div class="fixture-card" onclick="window.open('${nations_URL}', '_blank')">
                          <div class="row">
                              <div class="col">
                                  <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                  <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                              </div>
                              <div class="col">
                           <h1 id='time'>
                          
                              ${hometeamscore} : ${awayteamscore}
                               
                               </h1>
                                  <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                                   
                              </div>
                              <div class="col">
                                  <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                  <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              `;
              container.appendChild(teamContainer);
             
          }
          // لو الماتش خلص // 
           if (event.status.type.state === "post") {
              
              const container = document.querySelector('#nationsfixtures');
              const teamContainer = document.createElement('div');
                 
                  teamContainer.innerHTML = `
                  <div class="row">
                  <div class="col-md-6 offset-md-3">
                      <div class="fixture-card" onclick="window.open('${nations_URL}', '_blank')">
                          <div class="row">
                              <div class="col">
                                  <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                  <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                              </div>
                              <div class="col">
                           <h1 id='time'>
                          
                              ${hometeamscore} : ${awayteamscore}
                               
                               </h1>
                               <td>${event.status.type.shortDetail}</td>
                              </div>
                              <div class="col">
                                  <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                  <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              `;
              container.appendChild(teamContainer);
             
               
           }
           
          matchesFound = true;
           
       }
          }
           //   IF NO MATCHES TODAY SHOW THIS CODE 
           if (!matchesFound) {document.getElementById("nationsfixtures").style.display = "none";}
          }
          getnationsfixture()
          // END OF UEFA NATIONS FIXTURES



          // -- PREMIER LEAGUE  --//

 
            const API_PREMIERLEAGUE = `https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=${formattedDate}`;
 
   
            async function getpremierleaguefixture() {
              const response = await fetch(`${API_PREMIERLEAGUE}`);
              const data = await response.json();
              const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              const today = new Date();
              const currentDayOfWeek = today.getDay();
              const league = data.leagues;
              const Slug = league[0].slug;
              const events = data.events;
              let matchesFound = false;
              for (const event of events) {
                  if (event.status.type.description !== "Postponed"){
                    const homeTeam = event.competitions[0].competitors[0];
                    const awayTeam = event.competitions[0].competitors[1];
                    const detail = event.status.type.detail;
                    const eventId = event.id;
                    const eventDate = new Date(event.date);
                    const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                    const eventDayOfWeek = eventDate.getDay();
                    const startTime = new Date(event.date);
                    const currentTime = new Date();
                    const hometeamscore = event.competitions[0].competitors[0].score;
                    const awayteamscore = event.competitions[0].competitors[1].score;
                    console.log(league);
              const premierleague_URL = `https://live.f20.us/#${Slug}/${eventId}`;
              if (event.status.type.state === "pre"){
                 const container = document.querySelector('#plfixtures');
                const teamContainer = document.createElement('div');
                   
                    teamContainer.innerHTML = `
                    <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="fixture-card" onclick="window.open('${premierleague_URL}', '_blank')">
                            <div class="row">
                                <div class="col">
                                    <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                    <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                </div>
                                <div class="col">
                                <h1>VS</h1>
                                <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                                </div>
                                <div class="col">
                                    <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                    <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                container.appendChild(teamContainer); 
                  
              }
         if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
                    const container = document.querySelector('#plfixtures');
                const teamContainer = document.createElement('div');
                   
                    teamContainer.innerHTML = `
                    <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="fixture-card" onclick="window.open('${premierleague_URL}', '_blank')">
                            <div class="row">
                                <div class="col">
                                    <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                    <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                </div>
                                <div class="col">
                             <h1 id='time'>
                            
                                ${hometeamscore} : ${awayteamscore}
                                 
                                 </h1>
                                    <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                                     
                                </div>
                                <div class="col">
                                    <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                    <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                container.appendChild(teamContainer);
               
            }
            // لو الماتش خلص // 
             if (event.status.type.state === "post") {
                
                const container = document.querySelector('#plfixtures');
                const teamContainer = document.createElement('div');
                   
                    teamContainer.innerHTML = `
                    <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="fixture-card" onclick="window.open('${premierleague_URL}', '_blank')">
                            <div class="row">
                                <div class="col">
                                    <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                    <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                </div>
                                <div class="col">
                             <h1 id='time'>
                            
                                ${hometeamscore} : ${awayteamscore}
                                 
                                 </h1>
                                 <td>${event.status.type.shortDetail}</td>
                                </div>
                                <div class="col">
                                    <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                    <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                container.appendChild(teamContainer);
               
                 
             }
             
            matchesFound = true;
             
         }
            }
             //   IF NO MATCHES TODAY SHOW THIS CODE 
             if (!matchesFound) {document.getElementById("plfixtures").style.display = "none";}
            }
            getpremierleaguefixture()
            // END OF PREMIER LEAGUE FIXTURES


            // -- NFL FIXTURE --//
            const API_URLNFL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`;
 
     
            async function getWeek15Games() {
              const response = await fetch(`${API_URLNFL}`);
              const data = await response.json();
              const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              const today = new Date();
              const currentDayOfWeek = today.getDay();
              const events = data.events;
              let matchesFound = false;
              for (const event of events) {
                if (event.status.type.description !== "Final") {
                    const homeTeam = event.competitions[0].competitors[0];
                    const awayTeam = event.competitions[0].competitors[1];
                    const timeOfMatch = event.status.type.shortDetail;
                    const weather = event.weather;
                    const eventDate = new Date(event.date);
                    const detail = event.status.type.detail;
                    const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                    const eventDayOfWeek = eventDate.getDay();
                    const startTime = new Date(event.date);
                    const currentTime = new Date();
                    const hometeamscore = event.competitions[0].competitors[0].score;
                    const awayteamscore = event.competitions[0].competitors[1].score;


                    const M_URL = `https://nfl.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`; 
                    if (event.status.type.description === "In Progress" || ((event.status.type.description === "Scheduled") && (eventDayOfWeek === currentDayOfWeek) || (event.status.type.description === "Halftime"))) {
                    const container = document.querySelector('#nflfixtures');
                const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                    <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="fixture-card" onclick="window.open('${M_URL}', '_blank')">
                            <div class="row">
                                <div class="col">
                                    <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                    <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                </div>
                                <div class="col">
                                <h1>VS</h1>
                                <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                                </div>
                                <div class="col">
                                    <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                    <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
                `;
                container.appendChild(teamContainer);
            }
            
            matchesFound = true;
             }
           console.log(events)
              }
            //   IF NO MATCHES TODAY SHOW THIS CODE 
            if (!matchesFound) {document.getElementById("nflfixtures").style.display = "none";}
           }
            getWeek15Games();
            // -- END OF NFL API CODE ---//


             // -- FIFA FRIENDLY  --//

 
             const API_FIFAFRIENDLY = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.friendly/scoreboard?dates=${formattedDate}`;
 
   
             async function getfifafriendlyfixture() {
               const response = await fetch(`${API_FIFAFRIENDLY}`);
               const data = await response.json();
               const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
               const today = new Date();
               const currentDayOfWeek = today.getDay();
               const league = data.leagues;
               const Slug = league[0].slug;
               const events = data.events;
               let matchesFound = false;
               for (const event of events) {
                   if (event.status.type.description !== "Postponed"){
                     const homeTeam = event.competitions[0].competitors[0];
                     const awayTeam = event.competitions[0].competitors[1];
                     const detail = event.status.type.detail;
                     const eventId = event.id;
                     const eventDate = new Date(event.date);
                     const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                     const eventDayOfWeek = eventDate.getDay();
                     const startTime = new Date(event.date);
                     const currentTime = new Date();
                     const hometeamscore = event.competitions[0].competitors[0].score;
                     const awayteamscore = event.competitions[0].competitors[1].score;
                     console.log(league);
               const fifafriendly_URL = `https://live.f20.us/#${Slug}/${eventId}`;
               if (event.status.type.state === "pre"){
                  const container = document.querySelector('#friendlyfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${fifafriendly_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                                 <h1>VS</h1>
                                 <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer); 
                   
               }
          if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
                     const container = document.querySelector('#friendlyfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${fifafriendly_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                     <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                                      
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
             }
             // لو الماتش خلص // 
              if (event.status.type.state === "post") {
                 
                 const container = document.querySelector('#friendlyfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${fifafriendly_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                  <td>${event.status.type.shortDetail}</td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
                  
              }
              
             matchesFound = true;
              
          }
             }
              //   IF NO MATCHES TODAY SHOW THIS CODE 
              if (!matchesFound) {document.getElementById("friendlyfixtures").style.display = "none";}
             }
             getfifafriendlyfixture()
             // END FIFA FRIENDLY -- // 
 
 

             // -- MLS  --//

 
             const API_MLS = `https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard?dates=${formattedDate}`;
 
   
             async function getmlsfixture() {
               const response = await fetch(`${API_MLS}`);
               const data = await response.json();
               const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
               const today = new Date();
               const currentDayOfWeek = today.getDay();
               const league = data.leagues;
               const Slug = league[0].slug;
               const events = data.events;
               let matchesFound = false;
               for (const event of events) {
                   if (event.status.type.description !== "Postponed"){
                     const homeTeam = event.competitions[0].competitors[0];
                     const awayTeam = event.competitions[0].competitors[1];
                     const detail = event.status.type.detail;
                     const eventId = event.id;
                     const eventDate = new Date(event.date);
                     const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                     const eventDayOfWeek = eventDate.getDay();
                     const startTime = new Date(event.date);
                     const currentTime = new Date();
                     const hometeamscore = event.competitions[0].competitors[0].score;
                     const awayteamscore = event.competitions[0].competitors[1].score;
                     console.log(league);
               const mls_URL = `https://live.f20.us/#${Slug}/${eventId}`;
               if (event.status.type.state === "pre"){
                  const container = document.querySelector('#mlsfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${mls_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                                 <h1>VS</h1>
                                 <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer); 
                   
               }
          if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
                     const container = document.querySelector('#mlsfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${mls_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                     <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                                      
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
             }
             // لو الماتش خلص // 
              if (event.status.type.state === "post") {
                 
                 const container = document.querySelector('#mlsfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${mls_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                  <td>${event.status.type.shortDetail}</td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
                  
              }
              
             matchesFound = true;
              
          }
             }
              //   IF NO MATCHES TODAY SHOW THIS CODE 
              if (!matchesFound) {document.getElementById("mlsfixtures").style.display = "none";}
             }
             getmlsfixture()
             // END MSL-- // 
 
 
             // -- seria a fixtures --//

 
             const API_ITA = `https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard?dates=${formattedDate}`;
 
   
             async function getitafixture() {
               const response = await fetch(`${API_ITA}`);
               const data = await response.json();
               const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
               const today = new Date();
               const currentDayOfWeek = today.getDay();
               const league = data.leagues;
               const Slug = league[0].slug;
               const events = data.events;
               let matchesFound = false;
               for (const event of events) {
                   if (event.status.type.description !== "Postponed"){
                     const homeTeam = event.competitions[0].competitors[0];
                     const awayTeam = event.competitions[0].competitors[1];
                     const detail = event.status.type.detail;
                     const eventId = event.id;
                     const eventDate = new Date(event.date);
                     const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                     const eventDayOfWeek = eventDate.getDay();
                     const startTime = new Date(event.date);
                     const currentTime = new Date();
                     const hometeamscore = event.competitions[0].competitors[0].score;
                     const awayteamscore = event.competitions[0].competitors[1].score;
                     console.log(league);
               const ita_URL = `https://live.f20.us/#${Slug}/${eventId}`;
               if (event.status.type.state === "pre"){
                  const container = document.querySelector('#itafixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${ita_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                                 <h1>VS</h1>
                                 <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer); 
                   
               }
          if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
                     const container = document.querySelector('#itafixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${ita_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                     <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                                      
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
             }
             // لو الماتش خلص // 
              if (event.status.type.state === "post") {
                 
                 const container = document.querySelector('#itafixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${ita_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                  <td>${event.status.type.shortDetail}</td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
                  
              }
              
             matchesFound = true;
              
          }
             }
              //   IF NO MATCHES TODAY SHOW THIS CODE 
              if (!matchesFound) {document.getElementById("itafixtures").style.display = "none";}
             }
             getitafixture()
             // END SERIA A-- // 
 
 
             // -- la liga fixtures -- // 

             const API_es = `https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard?dates=${formattedDate}`;
 
   
             async function getesfixture() {
               const response = await fetch(`${API_es}`);
               const data = await response.json();
               const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
               const today = new Date();
               const currentDayOfWeek = today.getDay();
               const league = data.leagues;
               const Slug = league[0].slug;
               const events = data.events;
               let matchesFound = false;
               for (const event of events) {
                   if (event.status.type.description !== "Postponed"){
                     const homeTeam = event.competitions[0].competitors[0];
                     const awayTeam = event.competitions[0].competitors[1];
                     const detail = event.status.type.detail;
                     const eventId = event.id;
                     const eventDate = new Date(event.date);
                     const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                     const eventDayOfWeek = eventDate.getDay();
                     const startTime = new Date(event.date);
                     const currentTime = new Date();
                     const hometeamscore = event.competitions[0].competitors[0].score;
                     const awayteamscore = event.competitions[0].competitors[1].score;
                     console.log(league);
               const es_URL = `https://live.f20.us/#${Slug}/${eventId}`;
               if (event.status.type.state === "pre"){
                  const container = document.querySelector('#esfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${es_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                                 <h1>VS</h1>
                                 <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer); 
                   
               }
          if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
                     const container = document.querySelector('#esfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${es_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                     <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                                      
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
             }
             // لو الماتش خلص // 
              if (event.status.type.state === "post") {
                 
                 const container = document.querySelector('#esfixtures');
                 const teamContainer = document.createElement('div');
                    
                     teamContainer.innerHTML = `
                     <div class="row">
                     <div class="col-md-6 offset-md-3">
                         <div class="fixture-card" onclick="window.open('${es_URL}', '_blank')">
                             <div class="row">
                                 <div class="col">
                                     <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                     <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                 </div>
                                 <div class="col">
                              <h1 id='time'>
                             
                                 ${hometeamscore} : ${awayteamscore}
                                  
                                  </h1>
                                  <td>${event.status.type.shortDetail}</td>
                                 </div>
                                 <div class="col">
                                     <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                     <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                 container.appendChild(teamContainer);
                
                  
              }
              
             matchesFound = true;
              
          }
             }
              //   IF NO MATCHES TODAY SHOW THIS CODE 
              if (!matchesFound) {document.getElementById("esfixtures").style.display = "none";}
             }
             getesfixture()

             // -- end of la liga fixtuers -- //



              // -- la liga fixtures -- // 
             
              const API_de = `https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard?dates=${formattedDate}`;
 
   
              async function getbundesligafixture() {
                const response = await fetch(`${API_de}`);
                const data = await response.json();
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const today = new Date();
                const currentDayOfWeek = today.getDay();
                const league = data.leagues;
                const Slug = league[0].slug;
                const events = data.events;
                let matchesFound = false;
                for (const event of events) {
                    if (event.status.type.description !== "Postponed"){
                      const homeTeam = event.competitions[0].competitors[0];
                      const awayTeam = event.competitions[0].competitors[1];
                      const detail = event.status.type.detail;
                      const eventId = event.id;
                      const eventDate = new Date(event.date);
                      const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
                      const eventDayOfWeek = eventDate.getDay();
                      const startTime = new Date(event.date);
                      const currentTime = new Date();
                      const hometeamscore = event.competitions[0].competitors[0].score;
                      const awayteamscore = event.competitions[0].competitors[1].score;
                      console.log(league);
                const de_URL = `https://live.f20.us/#${Slug}/${eventId}`;
                if (event.status.type.state === "pre"){
                   const container = document.querySelector('#defixtures');
                  const teamContainer = document.createElement('div');
                     
                      teamContainer.innerHTML = `
                      <div class="row">
                      <div class="col-md-6 offset-md-3">
                          <div class="fixture-card" onclick="window.open('${de_URL}', '_blank')">
                              <div class="row">
                                  <div class="col">
                                      <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                      <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                  </div>
                                  <div class="col">
                                  <h1>VS</h1>
                                  <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                                  </div>
                                  <div class="col">
                                      <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                      <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  `;
                  container.appendChild(teamContainer); 
                    
                }
           if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
                      const container = document.querySelector('#defixtures');
                  const teamContainer = document.createElement('div');
                     
                      teamContainer.innerHTML = `
                      <div class="row">
                      <div class="col-md-6 offset-md-3">
                          <div class="fixture-card" onclick="window.open('${de_URL}', '_blank')">
                              <div class="row">
                                  <div class="col">
                                      <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                      <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                  </div>
                                  <div class="col">
                               <h1 id='time'>
                              
                                  ${hometeamscore} : ${awayteamscore}
                                   
                                   </h1>
                                      <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                                       
                                  </div>
                                  <div class="col">
                                      <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                      <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  `;
                  container.appendChild(teamContainer);
                 
              }
              // لو الماتش خلص // 
               if (event.status.type.state === "post") {
                  
                  const container = document.querySelector('#defixtures');
                  const teamContainer = document.createElement('div');
                     
                      teamContainer.innerHTML = `
                      <div class="row">
                      <div class="col-md-6 offset-md-3">
                          <div class="fixture-card" onclick="window.open('${de_URL}', '_blank')">
                              <div class="row">
                                  <div class="col">
                                      <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                                      <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                                  </div>
                                  <div class="col">
                               <h1 id='time'>
                              
                                  ${hometeamscore} : ${awayteamscore}
                                   
                                   </h1>
                                   <td>${event.status.type.shortDetail}</td>
                                  </div>
                                  <div class="col">
                                      <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                                      <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  `;
                  container.appendChild(teamContainer);
                 
                   
               }
               
              matchesFound = true;
               
           }
              }
               //   IF NO MATCHES TODAY SHOW THIS CODE 
               if (!matchesFound) {document.getElementById("defixtures").style.display = "none";}
              }
              getbundesligafixture()
 
              // -- end of bundesliga fixtuers -- //


 // -- champions league fixtures -- // 
             
 const API_championsleague = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard?dates=${formattedDate}`;
 
   
 async function getchampionsleaguefixture() {
   const response = await fetch(`${API_championsleague}`);
   const data = await response.json();
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const today = new Date();
   const currentDayOfWeek = today.getDay();
   const league = data.leagues;
   const Slug = league[0].slug;
   const events = data.events;
   let matchesFound = false;
   for (const event of events) {
       if (event.status.type.description !== "Postponed"){
         const homeTeam = event.competitions[0].competitors[0];
         const awayTeam = event.competitions[0].competitors[1];
         const detail = event.status.type.detail;
         const eventId = event.id;
         const eventDate = new Date(event.date);
         const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
         const eventDayOfWeek = eventDate.getDay();
         const startTime = new Date(event.date);
         const currentTime = new Date();
         const hometeamscore = event.competitions[0].competitors[0].score;
         const awayteamscore = event.competitions[0].competitors[1].score;
         console.log(league);
   const championsleague_URL = `https://live.f20.us/#${Slug}/${eventId}`;
   if (event.status.type.state === "pre"){
      const container = document.querySelector('#championsfixtures');
     const teamContainer = document.createElement('div');
        
         teamContainer.innerHTML = `
         <div class="row">
         <div class="col-md-6 offset-md-3">
             <div class="fixture-card" onclick="window.open('${championsleague_URL}', '_blank')">
                 <div class="row">
                     <div class="col">
                         <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                         <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                     </div>
                     <div class="col">
                     <h1>VS</h1>
                     <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                     </div>
                     <div class="col">
                         <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                         <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     `;
     container.appendChild(teamContainer); 
       
   }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
         const container = document.querySelector('#championsfixtures');
     const teamContainer = document.createElement('div');
        
         teamContainer.innerHTML = `
         <div class="row">
         <div class="col-md-6 offset-md-3">
             <div class="fixture-card" onclick="window.open('${championsleague_URL}', '_blank')">
                 <div class="row">
                     <div class="col">
                         <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                         <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                     </div>
                     <div class="col">
                  <h1 id='time'>
                 
                     ${hometeamscore} : ${awayteamscore}
                      
                      </h1>
                         <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                          
                     </div>
                     <div class="col">
                         <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                         <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     `;
     container.appendChild(teamContainer);
    
 }
 // لو الماتش خلص // 
  if (event.status.type.state === "post") {
     
     const container = document.querySelector('#championsfixtures');
     const teamContainer = document.createElement('div');
        
         teamContainer.innerHTML = `
         <div class="row">
         <div class="col-md-6 offset-md-3">
             <div class="fixture-card" onclick="window.open('${championsleague_URL}', '_blank')">
                 <div class="row">
                     <div class="col">
                         <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                         <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                     </div>
                     <div class="col">
                  <h1 id='time'>
                 
                     ${hometeamscore} : ${awayteamscore}
                      
                      </h1>
                      <td>${event.status.type.shortDetail}</td>
                     </div>
                     <div class="col">
                         <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                         <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     `;
     container.appendChild(teamContainer);
    
      
  }
  
 matchesFound = true;
  
}
 }
  //   IF NO MATCHES TODAY SHOW THIS CODE 
  if (!matchesFound) {document.getElementById("championsfixtures").style.display = "none";}
 }
 getchampionsleaguefixture()

 // -- end of champions league fixtuers -- //


// -- euro qualification fixtures -- // 
             
const API_euro = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.euroq/scoreboard?dates=${formattedDate}`;
 
   
async function geteuroqualificationfixture() {
  const response = await fetch(`${API_euro}`);
  const data = await response.json();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const league = data.leagues;
  const Slug = league[0].slug;
  const events = data.events;
  let matchesFound = false;
  for (const event of events) {
      if (event.status.type.description !== "Postponed"){
        const homeTeam = event.competitions[0].competitors[0];
        const awayTeam = event.competitions[0].competitors[1];
        const detail = event.status.type.detail;
        const eventId = event.id;
        const eventDate = new Date(event.date);
        const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
        const eventDayOfWeek = eventDate.getDay();
        const startTime = new Date(event.date);
        const currentTime = new Date();
        const hometeamscore = event.competitions[0].competitors[0].score;
        const awayteamscore = event.competitions[0].competitors[1].score;
        console.log(league);
  const euro_URL = `https://live.f20.us/#${Slug}/${eventId}`;
  if (event.status.type.state === "pre"){
     const container = document.querySelector('#eurofixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${euro_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                    <h1>VS</h1>
                    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer); 
      
  }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
        const container = document.querySelector('#eurofixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${euro_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 <h1 id='time'>
                
                    ${hometeamscore} : ${awayteamscore}
                     
                     </h1>
                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                         
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
}
// لو الماتش خلص // 
 if (event.status.type.state === "post") {
    
    const container = document.querySelector('#eurofixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${euro_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 <h1 id='time'>
                
                    ${hometeamscore} : ${awayteamscore}
                     
                     </h1>
                     <td>${event.status.type.shortDetail}</td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
     
 }
 
matchesFound = true;
 
}
}
 //   IF NO MATCHES TODAY SHOW THIS CODE 
 if (!matchesFound) {document.getElementById("eurofixtures").style.display = "none";}
}
geteuroqualificationfixture()

// -- end of euro qualifications fixtuers -- //



// -- saudi pro league fixtures -- // 
             
const API_ksa = `https://site.api.espn.com/apis/site/v2/sports/soccer/ksa.1/scoreboard?dates=${formattedDate}`;
 
   
async function getksafixture() {
  const response = await fetch(`${API_ksa}`);
  const data = await response.json();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const league = data.leagues;
  const Slug = league[0].slug;
  const events = data.events;
  let matchesFound = false;
  for (const event of events) {
      if (event.status.type.description !== "Postponed"){
        const homeTeam = event.competitions[0].competitors[0];
        const awayTeam = event.competitions[0].competitors[1];
        const detail = event.status.type.detail;
        const eventId = event.id;
        const eventDate = new Date(event.date);
        const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
        const eventDayOfWeek = eventDate.getDay();
        const startTime = new Date(event.date);
        const currentTime = new Date();
        const hometeamscore = event.competitions[0].competitors[0].score;
        const awayteamscore = event.competitions[0].competitors[1].score;
        console.log(league);
  const ksa_URL = `https://live.f20.us/#${Slug}/${eventId}`;
  if (event.status.type.state === "pre"){
     const container = document.querySelector('#ksafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${ksa_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                    <h1>VS</h1>
                    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer); 
      
  }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
        const container = document.querySelector('#ksafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${ksa_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 <h1 id='time'>
                
                    ${hometeamscore} : ${awayteamscore}
                     
                     </h1>
                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                         
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
}
// لو الماتش خلص // 
 if (event.status.type.state === "post") {
    
    const container = document.querySelector('#ksafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${ksa_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 <h1 id='time'>
                
                    ${hometeamscore} : ${awayteamscore}
                     
                     </h1>
                     <td>${event.status.type.shortDetail}</td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
     
 }
 
matchesFound = true;
 
}
}
 //   IF NO MATCHES TODAY SHOW THIS CODE 
 if (!matchesFound) {document.getElementById("ksafixtures").style.display = "none";}
}
getksafixture()

// -- end of ksa fixtuers -- //




// -- europa league fixtures -- // 
             
const API_europa = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard?dates=${formattedDate}`;
 
   
async function geteuropafixture() {
  const response = await fetch(`${API_europa}`);
  const data = await response.json();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const league = data.leagues;
  const Slug = league[0].slug;
  const events = data.events;
  let matchesFound = false;
  for (const event of events) {
      if (event.status.type.description !== "Postponed"){
        const homeTeam = event.competitions[0].competitors[0];
        const awayTeam = event.competitions[0].competitors[1];
        const detail = event.status.type.detail;
        const eventId = event.id;
        const eventDate = new Date(event.date);
        const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
        const eventDayOfWeek = eventDate.getDay();
        const startTime = new Date(event.date);
        const currentTime = new Date();
        const hometeamscore = event.competitions[0].competitors[0].score;
        const awayteamscore = event.competitions[0].competitors[1].score;
        console.log(league);
  const europa_URL = `https://live.f20.us/#${Slug}/${eventId}`;
  if (event.status.type.state === "pre"){
     const container = document.querySelector('#europafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${europa_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                    <h1>VS</h1>
                    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer); 
      
  }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
        const container = document.querySelector('#europafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${europa_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 <h1 id='time'>
                
                    ${hometeamscore} : ${awayteamscore}
                     
                     </h1>
                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                         
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
}
// لو الماتش خلص // 
 if (event.status.type.state === "post") {
    
    const container = document.querySelector('#europafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${europa_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 <h1 id='time'>
                
                    ${hometeamscore} : ${awayteamscore}
                     
                     </h1>
                     <td>${event.status.type.shortDetail}</td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
     
 }
 
matchesFound = true;
 
}
}
 //   IF NO MATCHES TODAY SHOW THIS CODE 
 if (!matchesFound) {document.getElementById("europafixtures").style.display = "none";}
}
geteuropafixture()

// -- end europa league fixtuers -- //




// ufc //

const API_mma = `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=${formattedDate}`;
 
   
async function getmmafixture() {
  const response = await fetch(`${API_mma}`);
  const data = await response.json();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const league = data.leagues;
  const Slug = league[0].slug;
  const ufclogo = league[0].logos[0].href;
  const events = data.events;
  let matchesFound = false;
  for (const event of events) {
      if (event.status.type.description !== "Postponed"){
        const homeTeam = event.competitions[0].competitors[0].athlete.displayName;
        const awayTeam = event.competitions[0].competitors[1].athlete.displayName;
        const detail = event.status.type.detail;
        const eventId = event.id;
        const eventDate = new Date(event.date);
        const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
        const eventDayOfWeek = eventDate.getDay();
        const startTime = new Date(event.date);
        const currentTime = new Date();
     
        
        console.log(events);
  const mma_URL = `https://live.f20.us/#${Slug}/${eventId}`;
  if (event.status.type.state === "pre" ){
     const container = document.querySelector('#mmafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${mma_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${ufclogo}" alt="${homeTeam} logo">
                        <h3 class="team-name">${homeTeam}</h3>
                    </div>
                    <div class="col">
                    <h1>VS</h1>
                    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${ufclogo}" alt="${awayTeam} Logo">
                        <h3 class="team-name">${awayTeam}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer); 
      
  }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
        const container = document.querySelector('#mmafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${mma_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 
                        <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                         
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
}
// لو الماتش خلص // 
 if (event.status.type.state === "post") {
    
    const container = document.querySelector('#mmafixtures');
    const teamContainer = document.createElement('div');
       
        teamContainer.innerHTML = `
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="fixture-card" onclick="window.open('${mma_URL}', '_blank')">
                <div class="row">
                    <div class="col">
                        <img class="team-logo" src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName} logo">
                        <h3 class="team-name">${homeTeam.team.shortDisplayName}</h3>
                    </div>
                    <div class="col">
                 
                     <td>${event.status.type.shortDetail}</td>
                    </div>
                    <div class="col">
                        <img class="team-logo" src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName} Logo">
                        <h3 class="team-name">${awayTeam.team.shortDisplayName}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(teamContainer);
   
     
 }
 
matchesFound = true;
 
}
}
 //   IF NO MATCHES TODAY SHOW THIS CODE 
 if (!matchesFound) {document.getElementById("mmafixtures").style.display = "none";}
}
getmmafixture()

// -- end mma fixtuers -- //



  //  F1
  const API_URLF1 = `https://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard`;


  async function getf1fixture() {
    const response = await fetch(`${API_URLF1}`);
    const data = await response.json();
    const events = data.events;
    console.log(events);
    let matchesFound = false;

    for (const event of events) {
      if (event.status.type.description !== "Postponed") {
        const nameofevent = event.shortName;
      const circuitfullname = event.circuit.fullName;
        const competitions = event.competitions;

        for (const competition of competitions) {
                    const eventDate = new Date(competition.date);
          const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const eventDayOfWeek = eventDate.getDay();
          const startTime = new Date(competition.date);
          const currentTime = new Date();

          const formula_URL = `https://wrestlemania.f20.us#${nameofevent}`;
          if (competition.status.type.state === "pre") {
            const container = document.querySelector('#formula1');
            const teamContainer = document.createElement('div');

            teamContainer.innerHTML = `<div class="row">
              <div class="col-md-6 offset-md-3">
                <div class="fixture-card" onclick="window.open('${formula_URL}', '_blank')">
                  <div class="row">
                    <div class="col-3">
                      <img class="team-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/1024px-F1.svg.png" alt="f1 logo">
                    </div>
                    <div class="col-9">
                      <div id="row">
                        <div id="col-10">
                          <h1>${nameofevent}</h1>
                          <td id='timetd' width='1%'><span id='time'>${circuitfullname}</span></td>
                        </div>
                        <div id="col-2">
                          <td id='timetd' width='1%'><span id='time'></span></td>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

            // Countdown logic
            const countdownElement = teamContainer.querySelector('#time');
            const countdownDate = eventDate.getTime();

            function updateCountdown() {
              const currentTime = new Date().getTime();
              const distance = countdownDate - currentTime;

              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);

              countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

              if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "Event Started!";
              }
            }

            updateCountdown();
            const countdownInterval = setInterval(updateCountdown, 1000);

            container.appendChild(teamContainer);
            matchesFound = true;
          } else if (competition.status.type.state === "in" || (competition.status.type.description === "Halftime")) {
            const container = document.querySelector('#formula1');
            const teamContainer = document.createElement('div');

            teamContainer.innerHTML = `
              <div class="row">
                <div class="col-md-6 offset-md-3">
                  <div class="fixture-card" onclick="window.open('${formula_URL}', '_blank')">
                    <div class="row">
                      <div class="col-3">
                        <img class="team-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/1024px-F1.svg.png" alt="f1 logo">
                      </div>
                      <div class="col-9">
                        <div id="row">
                          <div id="col-10">
                            <h1>${nameofevent}</h1>
                            <td id='timetd' width='1%'><span id='time'>${circuitfullname}</span></td>
                          </div>
                          <div id="col-2">
                            <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;

            container.appendChild(teamContainer);
            matchesFound = true;
          } else if (competition.status.type.state === "post") {
            const container = document.querySelector('#formula1');
            const teamContainer = document.createElement('div');

            teamContainer.innerHTML = `
              <div class="row">
                <div class="col-md-6 offset-md-3">
                  <div class="fixture-card" onclick="window.open('${formula_URL}', '_blank')">
                    <div class="row">
                      <div class="col-3">
                        <img class="team-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/1024px-F1.svg.png" alt="f1 logo">
                      </div>
                      <div class="col-9">
                        <div id="row">
                          <div id="col-10">
                            <h1>${nameofevent}</h1>
                            <td id='timetd' width='1%'><span id='time'>${circuitfullname}</span></td>
                          </div>
                          <div id="col-2">
                            <td id='timetd' width='1%'><span id='time' >FINISHED</span></td>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;

            container.appendChild(teamContainer);
            matchesFound = true;
          }
        }
      }
    }

    if (!matchesFound) {
      document.getElementById("formula1").style.display = "none";
    }
  }

  getf1fixture();


