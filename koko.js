let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let formattedDate = year + month + day;

fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const championsLeaguelink = `https://championsleague.f20.us#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${championsLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('championsfixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));

// Europa League
fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const europaLeaguelink = `https://europaleague.f20.us#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${europaLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('europafixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));


// Premier League
fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const plLeaguelink = `https://premierleague.f20.us#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${plLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('plfixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));


// ITA 
fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const itaLeaguelink = `https://ita.f20.us#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${itaLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('itafixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));


// la liga
fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const espLeaguelink = `https://hesgoal.f20.us#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${espLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('esfixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));

// la liga
fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const deLeaguelink = `https://bundesliga.f20.us#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${deLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('defixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));

// del rey 
fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/esp.copa_del_rey/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const delrayLeaguelink = `http://wcupstreaming.iceiy.com/super.html#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${delrayLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('delrayfixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));


// LIGA MX 
fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/mex.1/scoreboard?dates=${formattedDate}`)
  .then(response => response.json())
  .then(data => {
    const schedule = data.events.filter(event => event.status.type.state !== "post"); // Filter out post events
    const leagueLogoUrl = data.leagues[0].logos[0].href;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight



    // Generate HTML table rows for each event in the schedule
  const rows = schedule.map(event => {
  const logoUrl = leagueLogoUrl;
  const eventDate = new Date(event.date);
  const eventDateMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const date = (eventDateMidnight === today) ? 'Today' : eventDate.toLocaleDateString();
  
  const homeTeam = event.competitions[0].competitors[0].team.shortDisplayName;
  const awayTeam = event.competitions[0].competitors[1].team.shortDisplayName;
  const score1 = event.competitions[0].competitors[0].score;
  const score2 = event.competitions[0].competitors[1].score;
  const score = (score1 != null && score2 != null) ? `${score1} - ${score2}` : '';

  const now = new Date();
  const eventStart = new Date(event.date);
  const eventEnd = new Date(event.status.type.detail);
  const isLive = event.status.type.state === 'in' || (eventEnd > now && eventStart <= now);

  const watchLiveText = isLive ? score : 'Watch Live';
  const watchLiveStyle = isLive ? 'color: red;font-weight:bold;}' : '';

  const mxLeaguelink = `https://ligamx.f20.us#${homeTeam} vs ${awayTeam}`;

  return `
    <tr>
      <td><img src="${logoUrl}" width="50" height="50"></td>
      <td>${watchLiveText}</td>
      <td>
        <div>${homeTeam} vs ${awayTeam}</div>
      </td>
      <td><a href="${mxLeaguelink}" target="_blank" style="${watchLiveStyle}">${isLive ? 'LIVE NOW' : 'Watch Live'}</a></td>
    </tr>
  `;
});


    // Add the rows to the table body
    const tbody = document.getElementById('mxfixtures');
    tbody.innerHTML = rows.join('');
  })
  .catch(error => console.log('Error fetching data:', error));

