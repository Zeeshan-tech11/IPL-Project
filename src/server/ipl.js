const fs=require('fs')

var data=fs.readFileSync('../data/matches.csv',{encoding:'utf8'})
// storing all line in array
const dataArray=(data.toString().split('\n'));

// strong headers
const headers=dataArray[0].split(',')

// rest data
const restData=dataArray.slice(1);

const jsonData=[];

restData.forEach((line)=>{
    let oneobje={}
    const singleData=line.split(',')
    for (let index = 0; index < headers.length; index++) {
        const element = headers[index];
        oneobje[element]=singleData[index]
        
    }
    jsonData.push(oneobje)

})
let jsonMatch=jsonData.filter((ele)=>ele.id!="")

let delivery=fs.readFileSync('../data/deliveries.csv',{encoding:'utf-8'})
let deliveryArray=delivery.toString().split('\n')
let delHeader=deliveryArray[0].toString().split(',')

console.log(delHeader);

let restDelivery=deliveryArray.slice(1);
let DeliveryData=[];
restDelivery.forEach((ele)=>{
    let rowData=ele.toString().split(',');
    let onedelivery={}
    for (let index = 0; index < rowData.length; index++) {
        const element = rowData[index];
        onedelivery[delHeader[index]]=element
    }
    DeliveryData.push(onedelivery)
})

let jsonDelivery=DeliveryData.filter((ele)=>ele.match_id !='')

let bundle ={
    jsonData,
    jsonDelivery
}
module.exports=bundle


