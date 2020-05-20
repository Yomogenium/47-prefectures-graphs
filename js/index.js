
	document.body.appendChild(document.createElement('header'));
	document.body.appendChild(document.createElement('main'));

	// header
	const header = ReactDOM.render(
		<HeaderComponent />,
		document.querySelector('header')
	);

	// ContentArea
	ReactDOM.render(
		<ContentAreaComponent />,
		document.querySelector('main')
	);


/*
{
    "message": null,
    "result": {
        "boundaryYear": 2015,
        "data": [{
            "label": "総人口",
            "data": [{
                "year": 1980,
                "value": 12817
            }, {
                "year": 1985,
                "value": 12707
            }, {
                "year": 1990,
                "value": 12571
            }, {
                "year": 1995,
                "value": 12602
            }, {
                "year": 2000,
                "value": 12199
            }, {
                "year": 2005,
                "value": 11518
            }, {
                "year": 2010,
                "value": 10888
            }, {
                "year": 2015,
                "value": 10133
            }, {
                "year": 2020,
                "value": 9275
            }, {
                "year": 2025,
                "value": 8431
            }, {
                "year": 2030,
                "value": 7610
            }, {
                "year": 2035,
                "value": 6816
            }, {
                "year": 2040,
                "value": 6048
            }, {
                "year": 2045,
                "value": 5324
            }]
        }, 

*/


/*
				graphoption: {
					title: null,
					subtitle: null,
					yaxis: {title: {align: 'high', rotation: 0, y: -30, offset: 0, text: '人口数'}},
					xaxis: {title: {text: '年度', align: 'high', x: 40}},
					legend: {layout: '', align: 'right', verticalAlign: 'middle'},
					plotOptions: {series: {label: {connectorAllowed: false }, pointStart: 20}},
					  responsive: {rules: [{condition: {maxWidth: 500},	chartOptions: {legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom'}}}]},
					series: [],
				},
				populations: [],


*/





var obj = {

  title: {text: 'Solar Employment Growth by Sector, 2010-2016'},
  subtitle: {text: 'Source: thesolarfoundation.com'},

  yAxis: {title: {align: 'high', rotation: 0, y: -30, offset: 0, text: '人口数'}},
  xAxis: {title: {text: '年度', align: 'high', x: 40}},


  legend: {layout: '', align: 'right', verticalAlign: 'middle'},
  plotOptions: {series: {label: {connectorAllowed: false }, pointStart: 2010}},
  series: [
  {name: 'Installation', data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]},
  {name: 'Manufacturing', data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]},
  {name: 'Sales & Distribution', data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]},
  {name: 'Project Development', data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]},
  {name: 'Other', data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]}
  ],

  responsive: {
  	rules: [
  	{condition:
  		{maxWidth: 500},
  		chartOptions: {legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom'}}
  	}
  	]
  }
};


// Highcharts.chart('graph', obj);