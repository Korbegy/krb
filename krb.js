 //  كود جلب تاريخ اليوم في المباريات
let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let formattedDate = year + month + day;

//  ?dates=${formattedDate}`

   // PL LEAGUE
   const API_URLPL = `https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=${formattedDate}`;
 
   
   async function getPLfixture() {
     const response = await fetch(`${API_URLPL}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
	     if (event.status.type.description !== "Postponed"){
		   const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
		   const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const PL_URL = `https://premierleague.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#plfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${PL_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${PL_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#plfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${PL_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${PL_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#plfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    
}
   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("plfixtures").style.display = "none";}
   }
   getPLfixture()
   // END OF ENGLISH PREMIER LEAGUE API CODE 
   
   
   
   const API_URLNFL = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?date=${formattedDate}`;
 
     
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
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           const M_URL = `https://nfl.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`; 
           if (event.status.type.description === "In Progress" || ((event.status.type.description === "Scheduled") && (eventDayOfWeek === currentDayOfWeek) || (event.status.type.description === "Halftime"))) {
           const container = document.querySelector('#nflfixtures');
       const teamContainer = document.createElement('div');
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${M_URL}', '_blank')">
              
               <div id='matchstate' onclick="location.href = '${M_URL}'"><div id='matchstate2'></div> <p>${timeOfMatch} <strong>${weather.displayValue}</strong> ${weather.temperature}ْc</p></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32.5%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'  >VS</td>
               <td width='32.5%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
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
   // END OF NFL API CODE 
   
  
  
  // NBA
   
   
const API_URLNBA = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
   async function getNBA() {
     const response = await fetch(`${API_URLNBA}`);
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
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           const NBA_URL = `https://nba.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`;
           if (eventDayOfWeek === currentDayOfWeek ||
             (event.status.type.state == "in" && eventDayOfWeek === currentDayOfWeek - 1)) {
           const container = document.querySelector('#nbafixtures');
       const teamContainer = document.createElement('div');
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${NBA_URL}', '_blank')">
               <div id='matchstate'></div>
   
    <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32.5%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'  >VS</td>
               <td width='32.5%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       
       container.appendChild(teamContainer);
   }
   matchesFound = true;
    }
    
     }
     //   IF NO MATCHES TODAY SHOW THIS CODE 
   if (!matchesFound) {document.getElementById("nbafixtures").style.display = "none";}
   }
   getNBA();
   // END OF NBA API CODE 
   
     
 
   // es LEAGUE


   
   const API_URLes = `https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard?dates=${formattedDate}`;
   
   
   async function getesfixture() {
     const response = await fetch(`${API_URLes}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
   
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
		 
		 
const es_URL = `https://hesgoal.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`; 
   
   if (event.status.type.state === "pre"){
		const container = document.querySelector('#esfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${es_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${es_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#esfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${es_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${es_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#esfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("esfixtures").style.display = "none";}
   }
   getesfixture()
   // END OF ENGLISH PREMIER LEAGUE API CODE 
    //del rey LEAGUE


   
   const API_URLdelrey = `https://site.api.espn.com/apis/site/v2/sports/soccer/esp.copa_del_rey/scoreboard?dates=${formattedDate}`;
   
   
   async function getdelreyfixture(){
     const response = await fetch(`${API_URLdelrey}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
	 const league = data.leagues;
	 const Slug = league[0].slug;
	 const events = data.events;
     
     let matchesFound = false;
     for (const event of events) {
       
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventId = event.id;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
		 
		 
const delrey_URL = `https://live.f20.us/#${Slug}/${eventId}`; 
   
   if (event.status.type.state === "pre"){
		const container = document.querySelector('#delreyfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${delrey_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${delrey_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#delreyfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${delrey_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${delrey_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#delreyfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("delreyfixtures").style.display = "none";}
   }
   getdelreyfixture()
   // END OF copa del rey
   
// de LEAGUE


   
   const API_URLde = `https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard?dates=${formattedDate}`;
 
   
   async function getdefixture() {
     const response = await fetch(`${API_URLde}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
     
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const de_URL = `https://bundesliga.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`;
  if (event.status.type.state === "pre"){
		const container = document.querySelector('#defixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${de_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${de_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#defixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${de_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${de_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#defixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {
		  document.getElementById("defixtures").style.display = "none";
		}
   }
   getdefixture()
   // END OF De LEAGUE API CODE 

    // ksa LEAGUE


   
   const API_URLksa = `https://site.api.espn.com/apis/site/v2/sports/soccer/ksa.1/scoreboard?dates=${formattedDate}`;
 
   
   async function getksafixture() {
     const response = await fetch(`${API_URLksa}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
      
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const ksa_URL = `https://all.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`;
  if (event.status.type.state === "pre"){
		const container = document.querySelector('#ksafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${ksa_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${ksa_URL}'">
              
          </div>
   
				<td width='47.5%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='47.5%'>${awayTeam.team.shortDisplayName}</td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#ksafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${ksa_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${ksa_URL}'">
              
          </div>
   
             <td width='47.5%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='47.5%'>${awayTeam.team.shortDisplayName}</td>
			   			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#ksafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
            <td width='47.5%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='47.5%'>${awayTeam.team.shortDisplayName}</td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("ksafixtures").style.display = "none";}
   }
   getksafixture()
   // END OF De LEAGUE API CODE 
  
 
   // CARABAO CUP


   
   const API_URLcarabao = `https://site.api.espn.com/apis/site/v2/sports/soccer/eng.league_cup/scoreboard?dates=${formattedDate}`;
 
   
   async function getcarabaofixture() {
     const response = await fetch(`${API_URLcarabao}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
       if (event.status.type.completed !== true) {
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const car_URL = `https://wcup.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`;
   if (eventDayOfWeek === currentDayOfWeek || 
             (event.status.type.state == "in" && eventDayOfWeek === currentDayOfWeek - 1)) {
           const container = document.querySelector('#carfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${car_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${car_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32.5%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32.5%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   matchesFound = true;
    }
   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
  if (!matchesFound) {document.getElementById("carfixtures").style.display = "none";}
   }
	getcarabaofixture();
   // END OF CARABAO CUP FIXTURE 
   
    

   // ita league


   
   const API_URLita = `https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard?dates=${formattedDate}`;
 
   
   async function getitafixture() {
     const response = await fetch(`${API_URLita}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
	 const league = data.leagues;
	 const Slug = league[0].slug;
	 const events = data.events;
     let matchesFound = false;
     for (const event of events) {
      
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventId = event.id;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const ita_URL = `https://live.f20.us/#${Slug}/${eventId}`
 if (event.status.type.state === "pre"){
		const container = document.querySelector('#itafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${ita_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${ita_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#itafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${ita_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${ita_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#itafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("itafixtures").style.display = "none";}
   }
	getitafixture()
   // END OF ITA FIXTURE 
   


   // fra league


   
   const API_URLfra = `https://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard?dates=${formattedDate}`;
 
   
   async function getfrafixture() {
     const response = await fetch(`${API_URLfra}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
	 const league = data.leagues;
	 const Slug = league[0].slug;
	 const events = data.events;
     let matchesFound = false;
     for (const event of events) {
      
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventId = event.id;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const ita_URL = `https://live.f20.us/#${Slug}/${eventId}`
 if (event.status.type.state === "pre"){
		const container = document.querySelector('#frafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${ita_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${ita_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#frafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${ita_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${ita_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#frafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("frafixtures").style.display = "none";}
   }
	getfrafixture()
   // END OF FRA FIXTURE 


        

   // FA CUP league

   const API_URLfa = `https://site.api.espn.com/apis/site/v2/sports/soccer/eng.fa/scoreboard?dates=${formattedDate}`;
 
   
   async function getFAfixture() {
     const response = await fetch(`${API_URLfa}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
       
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const fa_URL = `http://wcupstreaming.iceiy.com/facup.html#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`
   if (event.status.type.state === "pre"){
		const container = document.querySelector('#fafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${fa_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${fa_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#fafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${fa_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${fa_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#fafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("fafixtures").style.display = "none";}
   }
	getFAfixture()
   // END OF FA CUP FIXTURE 
   

  // FIFA CLUB WORLD CUP


   
   const API_URLcwc = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.cwc/scoreboard?dates=${formattedDate}`;
 
   
   async function getCWCfixture() {
     const response = await fetch(`${API_URLcwc}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
       if (event.status.type.completed !== true) {
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const cwc_URL = `http://wcupstreaming.iceiy.com/cwc.html#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`
   if (eventDayOfWeek === currentDayOfWeek || 
             (event.status.type.state == "in" && eventDayOfWeek === currentDayOfWeek - 1)) {
           const container = document.querySelector('#cwcfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${cwc_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${cwc_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32.5%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32.5%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			    <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   matchesFound = true;
    }
   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("cwcfixtures").style.display = "none";}
   }
	getCWCfixture()
   // END OF FIFA CLUB WORLD CUP 





  // CHAMPIONS LEAGUE 


   
   const API_URLchampions = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard?dates=${formattedDate}`;
 
   
   async function getChampionsfixture() {
     const response = await fetch(`${API_URLchampions}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
      
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const champions_URL = `https://championsleague.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`
   if (event.status.type.state === "pre"){
		const container = document.querySelector('#championsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${champions_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${champions_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#championsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${champions_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${champions_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#championsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
     if (!matchesFound) {document.getElementById("championsfixtures").style.display = "none";}
   }
	getChampionsfixture()
   // END OF CHAMPIONS LEAGUE





  // CHAMPIONS LEAGUE 


   
   const API_URLeuropa = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard?dates=${formattedDate}`;
 
   
   async function getEuropafixture() {
     const response = await fetch(`${API_URLeuropa}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
     
           const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const europa_URL = `https://europaleague.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`
  if (event.status.type.state === "pre"){
		const container = document.querySelector('#europafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${europa_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${europa_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#europafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${europa_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${europa_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#europafixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
              <div>
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("europafixtures").style.display = "none";}
   }
	getEuropafixture()
   // END OF europa LEAGUE

const API_URLxfl = "https://site.api.espn.com/apis/site/v2/sports/football/xfl/scoreboard";
async function getxflfixture() {
  const response = await fetch(`${API_URLxfl}`);
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
    const weather = event.weather
    const eventDate = new Date(event.date);
	const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const eventDayOfWeek = eventDate.getDay();
    const startTime = new Date(event.date);
    const currentTime = new Date();
	const detail = event.status.type.detail;
console.log(events);
    const xfl_URL = `https://nfl.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`
	
      if (event.status.type.description === "In Progress" || ((event.status.type.description === "Scheduled") && (eventDayOfWeek === currentDayOfWeek) || (event.status.type.description === "Halftime"))) {
        const container = document.querySelector('#xflfixtures');
        const teamContainer = document.createElement('div');
          
        teamContainer.innerHTML = `
          <center>
            <table class="demo">
              <tbody>
                <!-- champ-->
                <tr onclick="window.open('${xfl_URL}', '_blank')">
				
                  <div id='matchstate' onclick="location.href = '${xfl_URL}'">
                    
                  </div>
   
                  <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
                  <td width='32.5%'>${homeTeam.team.shortDisplayName}</td>
                  <td id='vs' width='5%'  >VS</td>
                  <td width='32.5%'>${awayTeam.team.shortDisplayName}</td>
                  <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
				   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
                </tr>
              </tbody>
            </table>
          </center>
        `;
        container.appendChild(teamContainer);
      }
      matchesFound = true;
    }
  }

   if (!matchesFound) {document.getElementById("xflfixtures").style.display = "none";}
}

getxflfixture();
// end of xfl


// MX LEAGUE
   const API_URLmx = `https://site.api.espn.com/apis/site/v2/sports/soccer/mex.1/scoreboard`;
 
   
   async function getmxfixture() {
     const response = await fetch(`${API_URLmx}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
	 const league = data.leagues;
	 const Slug = league[0].slug;
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
		   const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventId = event.id;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const mx_URL = `https://live.f20.us/#${Slug}/${eventId}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#mxfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${mx_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${mx_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
    if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#mxfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${mx_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${mx_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#mxfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    

   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("mxfixtures").style.display = "none";}
   }
   getmxfixture()
   // END OF LIGA MX

   // Euro 2024
   const API_URLeuro = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.euroq/scoreboard?dates=${formattedDate}`;
 
   
   async function getEUROfixture() {
     const response = await fetch(`${API_URLeuro}`);
     const data = await response.json();
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const today = new Date();
     const currentDayOfWeek = today.getDay();
   
     const events = data.events;
     let matchesFound = false;
     for (const event of events) {
	     if (event.status.type.description !== "Postponed"){
		   const homeTeam = event.competitions[0].competitors[0];
           const awayTeam = event.competitions[0].competitors[1];
           const detail = event.status.type.detail;
		   const eventDate = new Date(event.date);
		   const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
		   const eventDayOfWeek = eventDate.getDay();
           const startTime = new Date(event.date);
           const currentTime = new Date();
           console.log(events);
     const euro_URL = `https://euro.f20.us/#${homeTeam.team.shortDisplayName} vs ${awayTeam.team.shortDisplayName}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#eurofixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${euro_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${euro_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#eurofixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${euro_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${euro_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#eurofixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    
}
   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("eurofixtures").style.display = "none";}
   }
   getEUROfixture()
   // END OF ENGLISH PREMIER LEAGUE API CODE 
   
   
   
 // women champions league
   const API_URLwomen = `https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.wchampions/scoreboard?dates=${formattedDate}`;
 
   
   async function getWomenfixture() {
     const response = await fetch(`${API_URLwomen}`);
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
           console.log(events);
     const women_URL = `https://live.f20.us/#${Slug}/${eventId}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#womenfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${women_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${women_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#womenfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${women_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${women_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#womenfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr>
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    
}
   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("womenfixtures").style.display = "none";}
   }
   getWomenfixture()
   // END OF ENGLISH PREMIER LEAGUE API CODE 
   
   
   
    // Friendly
   const API_URLFriendly = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.friendly/scoreboard?dates=${formattedDate}`;
 
   
   async function getFriendlyfixture() {
     const response = await fetch(`${API_URLFriendly}`);
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
           console.log(league);
     const Friendly_URL = `https://live.f20.us/#${Slug}/${eventId}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#Friendlyfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${Friendly_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${Friendly_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#Friendlyfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${Friendly_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${Friendly_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#Friendlyfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${Friendly_URL}', '_blank')">
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    
}
   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("Friendlyfixtures").style.display = "none";}
   }
   getFriendlyfixture()
   // END OF ENGLISH PREMIER LEAGUE API CODE 
   
        // CLUB Friendly
   const API_URLFriendlyc = `https://site.api.espn.com/apis/site/v2/sports/soccer/club.friendly/scoreboard?dates=${formattedDate}`;
 
   
   async function getclubfixture() {
     const response = await fetch(`${API_URLFriendlyc}`);
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
           console.log(league);
     const Friendlyc_URL = `https://live.f20.us/#${Slug}/${eventId}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#clubfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${Friendlyc_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${Friendlyc_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#clubfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${Friendlyc_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${Friendlyc_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#clubfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${Friendlyc_URL}', '_blank')">
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
		
	}
	
   matchesFound = true;
    
}
   }
    //   IF NO MATCHES TODAY SHOW THIS CODE 
    if (!matchesFound) {document.getElementById("clubfixtures").style.display = "none";}
   }
   getclubfixture()
   // END OF CLUB FRIENDLY API CODE 
   
       // MLS MATCHES 
   const API_URLmls = `https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard?dates=${formattedDate}`;
 
   
   async function getmlsfixture() {
     const response = await fetch(`${API_URLmls}`);
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
           console.log(league);
     const mls_URL = `https://live.f20.us/#${Slug}/${eventId}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#mlsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${mls_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${mls_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#mlsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${mls_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${mls_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#mlsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${mls_URL}', '_blank')">
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
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
   // END OF MLS FIXTURES

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
           console.log(league);
     const nations_URL = `https://live.f20.us/#${Slug}/${eventId}`;
	 if (event.status.type.state === "pre"){
		const container = document.querySelector('#nationsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${nations_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${nations_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>${estTimeStr}</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer); 
		 
	 }
if (event.status.type.state === "in" || (event.status.type.description === "Halftime")) {
           const container = document.querySelector('#nationsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${nations_URL}', '_blank')">
              <div id='matchstate' onclick="location.href = '${nations_URL}'">
              
          </div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>VS</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time' class='timee' style='color:red;font-weight: 800;'> LIVE</span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
       `;
       container.appendChild(teamContainer);
      
   }
   // لو الماتش خلص // 
    if (event.status.type.state === "post") {
		const hometeamscore = event.competitions[0].competitors[0].score;
		const awayteamscore = event.competitions[0].competitors[1].score;
	   const container = document.querySelector('#nationsfixtures');
       const teamContainer = document.createElement('div');
          
           teamContainer.innerHTML = `
       <center>
                 <table class="demo">
                     <tbody>
                 
                    <!-- champ-->
        
              <tr onclick="window.open('${nations_URL}', '_blank')">
               <div id='matchstate'></div>
   
             <td><img alt='${homeTeam.team.displayName} logo' src='${homeTeam.team.logo}' id='team1' width='15%' /></td>
               <td width='32%'>${homeTeam.team.shortDisplayName}</td>
               <td id='vs' width='5%'>FT</td>
               <td width='32%'>${awayTeam.team.shortDisplayName}</td>
               <td><img alt='${awayTeam.team.displayName} logo' src='${awayTeam.team.logo}' id='team2' width='15%'/></td>
			   <td id='timetd' width='1%'><span id='time'>
			   
			  <img src='${homeTeam.team.logo}' style='height:15px;'/> ${hometeamscore} : ${awayteamscore} <img src='${awayTeam.team.logo}' style='height:15px;'/>
			   
			   </span></td>
           </tr>
             
        </tbody>
                     
                 </table></center>
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
