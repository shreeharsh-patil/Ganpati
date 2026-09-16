// Regional Ganpati coverage outside the original Mumbai dataset.
// "confirmed" means a 2026 event/location was found in a current public source.
// "check" means the mandal/location is established in a recent source but its 2026 details should be re-verified.

window.regionalPandals = [
  // Maharashtra — Pune
  { id: "mh-pune-kasba", name: "Kasba Ganpati", area: "Kasba Peth", city: "Pune", state: "Maharashtra", lat: 18.5196, lng: 73.8567, status: "confirmed", timing: "Manacha Ganpati · Verify daily aarti locally" },
  { id: "mh-pune-tambdi", name: "Tambdi Jogeshwari Ganpati", area: "Budhwar Peth", city: "Pune", state: "Maharashtra", lat: 18.5174, lng: 73.8562, status: "confirmed", timing: "Manacha Ganpati · Verify daily aarti locally" },
  { id: "mh-pune-guruji", name: "Guruji Talim Ganpati", area: "Ganpati Chowk / Budhwar Peth", city: "Pune", state: "Maharashtra", lat: 18.5158, lng: 73.8561, status: "confirmed", timing: "Manacha Ganpati · Verify daily aarti locally" },
  { id: "mh-pune-tulshibaug", name: "Tulshibaug Ganpati", area: "Tulshibaug / Laxmi Road", city: "Pune", state: "Maharashtra", lat: 18.5139, lng: 73.8555, status: "confirmed", timing: "Manacha Ganpati · Verify daily aarti locally" },
  { id: "mh-pune-kesari", name: "Kesari Wada Ganpati", area: "Narayan Peth", city: "Pune", state: "Maharashtra", lat: 18.5238, lng: 73.8496, status: "confirmed", timing: "Manacha Ganpati · Verify daily aarti locally" },
  { id: "mh-pune-dagdusheth", name: "Shreemant Dagdusheth Halwai Ganpati", area: "Budhwar Peth", city: "Pune", state: "Maharashtra", lat: 18.5164, lng: 73.8565, status: "confirmed", timing: "Major Pune darshan stop · Verify live queue/aarti locally" },

  // Karnataka
  { id: "ka-bengaluru-bgu", name: "64th Bengaluru Ganesh Utsava", area: "APS College Grounds, Basavanagudi", city: "Bengaluru", state: "Karnataka", lat: 12.9423, lng: 77.5735, status: "confirmed", timing: "14–26 Sep 2026 · Morning pooja 8:30–9:30 AM · Evening pooja 4:30–6 PM" },
  { id: "ka-belagavi-bhagyavidhata", name: "Belgaum cha Bhagyavidhata", area: "Bhagya Nagar, Angol", city: "Belagavi", state: "Karnataka", lat: 15.8421, lng: 74.4977, status: "confirmed", timing: "Aarti: 8–9 AM · 8–9 PM" },
  { id: "ka-mangaluru-siddhi", name: "Sri Siddhi Vinayaka Sarvajanika Sri Ganeshotsava", area: "Omkara Nagar, Bunts Hostel", city: "Mangaluru", state: "Karnataka", lat: 12.8756, lng: 74.8437, status: "confirmed", timing: "37th annual celebration · 14 Sep 2026 · Verify programme timings locally" },
  { id: "ka-mangaluru-mithra", name: "Mithra Mandali Sarvajanika Sri Ganeshotsava", area: "Mangaluru", city: "Mangaluru", state: "Karnataka", lat: 12.8698, lng: 74.8421, status: "confirmed", timing: "70th public Ganeshotsava · Verify darshan/aarti timings locally" },
  { id: "ka-hubballi-idgah", name: "Hubballi Idgah Ground Ganeshotsava", area: "Idgah Ground", city: "Hubballi", state: "Karnataka", lat: 15.3647, lng: 75.1239, status: "confirmed", timing: "2026 festivities approved · Verify daily programme locally" },

  // Goa — recent Goa government Sarvajanik Ganeshotsav listings; 2026 participation should be checked.
  { id: "ga-st-estevam-brahmeshwar", name: "Brahmeshwar Yuvak Sangh", area: "Akhada, St. Estevam, Tiswadi", city: "Tiswadi", state: "Goa", lat: 15.5007, lng: 73.9688, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-korgao", name: "Korgao Sarvajanik Ganeshotsav Mandal", area: "Corgao, Pernem", city: "Pernem", state: "Goa", lat: 15.7180, lng: 73.7950, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-casarwarnem", name: "Sarvajanik Ganeshotsav Mandal Casarwarnem", area: "Casarwarnem, Pernem", city: "Pernem", state: "Goa", lat: 15.6820, lng: 73.8280, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-bicholim", name: "Sarvajanik Ganeshotsav Mandal Bicholim", area: "Bicholim", city: "Bicholim", state: "Goa", lat: 15.5937, lng: 73.9451, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-shiroda", name: "Shivkrupanand Swami Foundation Ganeshotsav", area: "Shiroda", city: "Ponda", state: "Goa", lat: 15.3323, lng: 74.0272, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-harmal", name: "Harmal Sarvajanik Ganeshotsav Mandal", area: "Harmal / Arambol, Pernem", city: "Pernem", state: "Goa", lat: 15.6868, lng: 73.7049, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-sanguem", name: "Sanguem Police Station Ganeshotsav", area: "Sanguem", city: "Sanguem", state: "Goa", lat: 15.2294, lng: 74.1518, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-tudav", name: "Sarvajanik Ganeshotsav Mandal Tudav", area: "Tudav, Sanguem", city: "Sanguem", state: "Goa", lat: 15.1960, lng: 74.1880, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-panaji-grp", name: "Goa Reserve Police Ganeshotsav", area: "Altinho", city: "Panaji", state: "Goa", lat: 15.4923, lng: 73.8205, status: "check", timing: "Recent Sarvajanik Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-ponda-zareshwar", name: "Shree Zareshwar Sarvajanik Ganeshotsav Mandal", area: "Old Bus Stand / Indira Market", city: "Ponda", state: "Goa", lat: 15.4024, lng: 74.0081, status: "check", timing: "Recent cultural Ganeshotsav listing · Check 2026 schedule" },
  { id: "ga-navelim", name: "Navelim Sarvajanik Shree Ganeshotsav Mandal Trust", area: "Navelim, Salcete", city: "Margao", state: "Goa", lat: 15.2640, lng: 73.9555, status: "check", timing: "Recent cultural Ganeshotsav listing · Check 2026 schedule" }
];

window.regionalModakStops = [];
