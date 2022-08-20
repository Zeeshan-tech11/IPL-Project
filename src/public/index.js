const fetchData = (makeChart, file) => {
  fetch(file)
    .then((res) => res.json())
    .then((res) => {
      makeChart(res);
    });
};

// function makeChart(res){
//     // res=res.slice(0,11)
//     var data = [
//         {
//           x: res.map((ele)=>{return Object.keys(ele)[0]}),
//           y: res.map((ele)=>Object.values(ele)[0]),
//           type: 'bar'
//         }
//       ];

//       Plotly.newPlot('myDiv', data);
// }

const MatchesPerYear = (res) => {
  res = res.slice(0, 10);
  Highcharts.chart("container-1", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Won Per Year",
    },

    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches Won",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Matches Won in: <b>{point.y:.1f} </b>",
    },
    series: [
      {
        name: "Matches Won Data",
        data: res.map((ele) => [Object.keys(ele)[0], Object.values(ele)[0]]),
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          format: "{point.y:.1f}", // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
};
const ExtraRun = (res) => {
  Highcharts.chart("container-2", {
    chart: {
      type: "column",
    },
    title: {
      text: "Extra Runs Per Team In  2016",
    },

    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Extra Runs in: <b>{point.y:.1f} </b>",
    },
    series: [
      {
        name: "Extra Runs Data",
        data: Object.entries(res),
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          format: "{point.y:.1f}", // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
};
const matchesYearwiseTeam = (res) => {
  let years = res.map((ele) => Object.keys(ele)[0]).slice(0,10);
  console.log(years);
  let teams = res[0]["2017"]
    .map((ele) => Object.keys(ele)[0])
    .filter((ele) => {
      if (ele == "" || ele == "undefined") {
        return false;
      } else {
        return true;
      }
    });
  console.log(teams);
  let ser = teams.reduce((acc, curr) => {
    let total = res.reduce((pre, next) => {
      let score = Object.values(
        Object.values(next)[0].filter((ele) => Object.keys(ele)[0] == curr)
      )[0];
      pre.push(Object.values(score)[0]);
      return pre;
    }, []);

    let one = {
      name: curr,
      data: total,
    };
    acc.push(one);
    return acc;
  }, []);
  
  Highcharts.chart("container-3", {
    title: {
      text: "Number of matches won per team per year in IPL.",
    },

    // subtitle: {
    //   text: "Source: thesolarfoundation.com",
    // },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      categories: years,
      // accessibility: {
      //   rangeDescription: 'Range: 2010 to 2017'
      // }
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        // pointStart: 2010
      },
    },

    series: ser,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
};
const economicalBowler=(res)=>{
  
  // Build the chart
  let ser=res.reduce((resArr,ele)=>{
      let one={
        name:Object.keys(ele)[0],
        y:parseFloat(Object.values(ele)[0])
      }
    resArr.push(one)
    return resArr
  },[])
  
    
  ser[0]['sliced']=true;
  ser[0]['selected']=true
  console.log(ser);
Highcharts.chart('container-4', {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Top Ten'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: ser
  }]
});
}
const anotherEconomiccal=(res)=>{
  let ser=res.reduce((pre,curr)=>{
    let a=[]
    a.push(Object.keys(curr)[0])
    a.push(parseFloat(Object.values(curr)[0]))
    pre.push(a)
    return pre
  },[])
  console.log(ser);
  Highcharts.chart('container-4', {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: {
      text: 'Top Ten Economical Bowler of Season 2015'
    },
    // subtitle: {
    //   text: '3D donut in Highcharts'
    // },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    series: [{
      name: 'Economy',
      data: ser
    }]
  });
}

fetchData(MatchesPerYear,'./output/matchesPerYear.json')
fetchData(ExtraRun,'./output/ExtreRunPerTeamIn2016.json')
fetchData(matchesYearwiseTeam, "./output/matchesWonPerYear2.json");
fetchData(anotherEconomiccal,"./output/TopTenEconomicalBowler2015.json")
