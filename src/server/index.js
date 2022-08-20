const fs=require('fs')

let data=require('./ipl')

let jsonData=data.jsonData

let matches=jsonData

let season = matches.map((match) => match.season)
// console.log(season);
let uniqueSeasons = [...new Set(season)]
// console.log(uniqueSeason);


//q1..

let numberOfMatch = uniqueSeasons.map((season) => {
    let num = matches.filter((match) => match.season == season).length;

    return {
        [season]: num
    }
})
// console.log(numberOfMatch);

// q2 no matches won per team per year
let Team = matches.map((match) => match.winner)
let uniqueTeam = [... new Set(Team)]
// console.log(uniqueTeam);

let windata = uniqueSeasons.map((season) => {
    let years = matches.filter((match) => match.season == season)
   let uni= uniqueTeam.map((team) => {

        let num = years.filter((year) => year.winner == team).length

        return {

           [team]:num
        }
    })
    return {
      [season]:JSON.stringify(uni)
    }
   

})
let refineData=windata.reduce((acc,curr)=>{
    let key=Object.keys(curr)[0]
    let one={}
    one[key]=JSON.parse(curr[key])
    acc.push(one)
    return acc
  },[])
console.log(refineData);
let delivery=data.jsonDelivery
// q3 Extra runs conceded per team in the year 2016   
// get id of 2016 match from match and the use that id to calculate extra runs
let idOf2016=jsonData.filter((ele)=>ele.season==2016).map((ele)=>ele.id)
let data2016=delivery.filter((ele)=>idOf2016.includes(ele.match_id))
let allteams2016=data2016.map((ele)=>ele.batting_team);
let uniqueteam2016=[... new Set(allteams2016)]

// console.log(uniqueteam2016);

let extraRuns=uniqueteam2016.reduce((pre,curr)=>{
    let total=data2016.filter((ele)=>ele.batting_team==curr).reduce((acc,itr)=>acc+parseInt(itr.extra_runs),0)
    pre[curr]=total
    return pre
},{})

// console.log(extraRuns);

//q4 Top 10 economical bowlers in the year 2015
// get the id of 2015 get all the bowlers and their score sort them and slice top 10
let idOf2015=jsonData.filter((ele)=>ele.season==2015).map((ele)=>ele.id)
let data2015=delivery.filter((ele)=>idOf2015.includes(ele.match_id))
let totalBowler=data2016.map((ele)=>ele.bowler);
let uniqueBowler=[... new Set(totalBowler)]
let totalBowling=uniqueBowler.reduce((pre,curr)=>{

    let totalRuns=data2015.filter((ele)=>ele.bowler==curr).reduce((o,c)=>o+parseInt(c.total_runs),0)
    let totalBalls=data2015.filter((ele)=>ele.bowler==curr).reduce((o,c)=>o+1,0);
    let economy=((totalRuns/totalBalls)*6).toFixed(2)
    if(economy!='NaN'){
    let one={
        [curr]:economy
    }
    pre.push(one)
}
 return pre
},[])
console.log(totalBowling);
totalBowling.sort((a,b)=>{
    let ap=Object.values(a)[0]
    let bp=Object.values(b)[0]
    return ap-bp

})
let topTen=totalBowling.slice(0,10)

//  console.log(topTen);

let str=JSON.stringify(topTen)
// console.log(str);
// console.log(JSON.parse(str));
// fs.writeFileSync("../public/output/TopTenEconomicalBowler2015.json",JSON.stringify(topTen))
//  fs.writeFileSync("../public/output/ExtreRunPerTeamIn2016.json",JSON.stringify(extraRuns))
//  fs.writeFileSync("../public/output/matchesWonPerYear2.json",JSON.stringify(refineData))
//  fs.writeFileSync("../public/output/matchesPerYear.json",JSON.stringify(numberOfMatch))




