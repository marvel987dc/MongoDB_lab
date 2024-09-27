import { MongoClient } from "mongodb";
import "dotenv/config";

// Connection URL
const url = process.env.MONGO_DB_SERVER; // Fill in your server address in .env
const client = new MongoClient(url);

// Database Name
const dbName = "comp229week2";

async function connectDb() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const countries = db.collection("countries");
  const medals = db.collection("medals");

  return { countries, medals };
}

let { countries, medals } = await connectDb();

await runQuestions();

// 1. What is the Capital of the country that has the largest 2022 population?
async function Question1() {
  let answer = "";

  // MongoDB Part: Fetch all countries
  const countriesList = await countries.find({}).toArray();

  // JS Part: Find the country with the largest population
  let largestCountry = countriesList[0];
  for (let i = 1; i < countriesList.length; i++) {
    if (
      countriesList[i]["2022 Population"] > largestCountry["2022 Population"]
    ) {
      largestCountry = countriesList[i];
    }
  }

  answer = largestCountry.Capital;
  return answer;
}

// 2. What is the total population of countries in Europe as of 2022?

async function Question2() {

  let answer = 0;
  
  const europe_list = await countries
  .find({ Continent: "Europe" }).toArray();

  for (let i = 0; i < europe_list.length; i++) {
      answer += europe_list[i]["2022 Population"];
    }
    return answer;
  }


// 3. How many medals did Canada win in the 2024 Olympics?
async function Question3() {

    let answer = 0;
    
    const medalsList = await medals.find({
      Country: "Canada"
    }).toArray();
  
    for (let i = 0; i < medalsList.length; i++) {
        answer += medalsList[i].Total
    }
    return answer;
  }
  //or. if(medaList) { answer = medaList.Total }


// 4. How many gold medals were won by countries in Asia?
async function Question4() {

  let answer = 0;
  let country_codes = [];

  const asia_countries = await countries.find({Continent: "Asia"}).toArray();
  
  for(let i = 0; i < asia_countries.length; i++){
    country_codes.push(asia_countries[i].CCA3);
  }
  const asian_medals = await medals.find({"Country Code": {$in: country_codes}}).toArray();

  for(let i = 0; i < asian_medals.length; i++){
    answer += asian_medals[i]["Gold"]    
  }
  return answer;
}


// 5. Which country with a population under 5 million won the most medals in the 2024 Olympics? 
//TODO:
// Countries with population under 5 million
//Which one has more total
async function Question5() {
  // let answer = "";
  // let country_codes = [];

  // const small_countries = await countries.find({"2022 Population": {$lt: 5000000}}).toArray();

  // for(let i = 0; i < small_countries.length; i++){
  //   country_codes.push(small_countries[i].CCA3)
  // }

  // const all_medals = await medals.find({"Country Code": {$in: country_codes}}).toArray()
  //   let country = all_medals[0].Country
  //   let totalMedals = all_medals[0].Total

  // for(let j = 0; j < all_medals.length; j++){ 
  //   if(all_medals[j].Total > totalMedals){
  //     totalMedals = all_medals[j].Total
  //     country = all_medals[j].Country
  //   }
  // }
  // answer = country;

  // return answer
let answer = "";
let country_code = [];

const small_countries = await countries.find({"2022 Population": {$lt: 5000000} }).toArray();

for(let i = 0; i < small_countries.length; i++){
  country_code.push(small_countries[i].CCA3);
}
const medal_list = await medals.find({"Country Code": {$in: country_code}}).toArray();
let medal_top = medal_list[0].Total;
let top_country = medal_list[0].Country;
for(let j = 0; j < medal_list.length; j++){
  if(medal_list[j].Total > medal_top){
    medal_top = medal_list[j].Total
    top_country = medal_list[j].Country
  }
  
}
answer = top_country;
return answer


}

async function Question6() {
  let answer = 0;

  const europe_countries = await countries.find({Continent: "Europe"}).toArray();
  let countries_code = [];

  for (let i = 0; i < europe_countries.length; i++) {
    countries_code.push(europe_countries[i].CCA3);
  }

  const medals_list = await medals.find({"Country Code": { $in: countries_code }}).toArray();

  for (let j = 0; j < medals_list.length; j++) {
    answer += medals_list[j].Bronze; 
  }

  return answer;
}




// 7. What is the total population of countries in Africa that participated in the 2024 Olympics?
async function Question7() {
  let answer = 0;
  const africa_population = await countries.find({Continent: "Africa"}).toArray();
  
  const africa_olympics =  await medals.find({}).toArray();
  let total_population = [];

  for (let i = 0; i < africa_population.length; i++){
    for (let j = 0; j < africa_olympics.length; j++){
        if(africa_olympics[j]["Country Code"] === africa_population[i].CCA3){
          total_population.push(africa_population[i]);
          break;
        }
      }
  }

  for(let k = 0; k < total_population.length; k++){
    answer += total_population[k]["2022 Population"];
  }
  return answer;
}

// 8. Which country with more than 50 million people in 2022 won the fewest medals in the 2024 Olympics?
async function Question8() {
  let answer = "";
  // Fill in your solution here
  return answer;
}

// 9. Which country with a population under 1 million has the highest medal count in the 2024 Olympics?
async function Question9() {
  let answer = "";
  // Fill in your solution here
  return answer;
}

// 10. Which country had the highest medal-to-population ratio in the 2024 Olympics?
async function Question10() {
  let answer = "";
  // Fill in your solution here
  return answer;
}

async function runQuestions() {
  // Display each question's result individually
  const question1Result = await Question1();
  console.log(`Question 1 result: ${question1Result}`);

  const question2Result = await Question2();
  console.log(`Question 2 result: ${question2Result}`);

  const question3Result = await Question3();
  console.log(`Question 3 result: ${question3Result}`);

  const question4Result = await Question4();
  console.log(`Question 4 result: ${question4Result}`);

  const question5Result = await Question5();
  console.log(`Question 5 result: ${question5Result}`);

  const question6Result = await Question6();
  console.log(`Question 6 result: ${question6Result}`);

  const question7Result = await Question7();
  console.log(`Question 7 result: ${question7Result}`);

  const question8Result = await Question8();
  console.log(`Question 8 result: ${question8Result}`);

  const question9Result = await Question9();
  console.log(`Question 9 result: ${question9Result}`);

  const question10Result = await Question10();
  console.log(`Question 10 result: ${question10Result}`);
}
