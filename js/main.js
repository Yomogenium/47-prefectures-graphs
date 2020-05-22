
	/* APIからデータ取得 */
	function PullApiData(apiurl) {
		return new Promise(function(resolve, reject) {
			const apikey = 'Rdj12wQTJR5qA5QihOp1lfMvgvPlrOAcbpsXBzRZ';
			
			/* リクエストの設定 */
			let request = new XMLHttpRequest();
			request.open("GET", apiurl);
			request.setRequestHeader('X-API-KEY', apikey);

			/* 成功時 */
			request.addEventListener('load', function() {
				const result = JSON.parse(this.response);
				resolve(result);
			}, false);

			request.addEventListener('error', function() {
				reject(0); /* Request error. */
			}, false);

			request.addEventListener('timeout', function() {
				reject(1); /* Request timeout. */
			}, false);

			request.send();
		});
	}

	function LoadDOM() {
		return <p className="loading">お待ちください...</p>;
	}

	function ErrorDOM(props) {
		return <p className="error">{props.message}</p>;
	}

	function ConvertToDOMList(props) {
		const result = props.prefs.map(value =>
									<li key={value.prefCode}>
										<label>
											<input type='checkbox' name={value.prefCode} onChange={props.handle} />
											{value.prefName}
										</label>
									</li>);
		return <ul className='preflist'>{result}</ul>;
	}


	// ヘッダー
	class HeaderComponent extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				title: document.querySelector('title').innerHTML,
			}
		}
		render() {
			return <h1>{this.state.title}</h1>;
		}
	}

	// 本体部分生成
	class ContentAreaComponent extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<div className="contents">
					<h2>都道府県</h2>
					<PrefList />
				</div>
			);
		}
	}

	// 都道府県リストの管理
	class PrefList extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				wait: 0,
				list_data: [],
				check_n: null,
				check_b: false,
			};
			this.handleClick = this.handleClick.bind(this);
		}

		handleClick(event) {
			this.setState({
						check_n: event.target.getAttribute('name'),
						check_b: event.target.checked,
			});
		}

		async componentDidMount() {
			this.setState({ wait: 1 });
			try {
				const data = await PullApiData('https://opendata.resas-portal.go.jp/api/v1/prefectures');
				this.setState({
					list_data: data.result,
					wait: 2,
				});
			}catch(e) {
				this.setState({
					wait: 3,
				});
			}
		}

		render() {
			const waitmode = this.state.wait;
			if(waitmode === 0) {
				return null;
			}
			if(waitmode === 1) {
				return <LoadDOM />;

			}else if(waitmode === 2) {

				return (
						<section>
							<ConvertToDOMList prefs={this.state.list_data} handle={this.handleClick} />
							<Graph prefs={this.state.list_data} number={this.state.check_n} check={this.state.check_b} />
						</section>
				);

			}else if(waitmode === 3) {
				return <ErrorDOM message='エラーが発生しました。' />;
			}
		}
	}

	class Graph extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				gotdata: [],
			};
		}

		convertData(num, preflist, apidata) {
			num = Number(num);
			// 都道府県名
			const targetpref = preflist.find(value => value.prefCode == num);
			// ※総人口のみ抽出
			let population_data = apidata;
			population_data = population_data.result.data.find(value => value.label == '総人口');
			let obj = {
				code: num,
				name: targetpref.prefName,
				popdata: population_data,
			};
			return obj;
		}

		// Highcharts格納用のデータリスト
		initForHighcharts() {
			const formatter_1 = function() {
				return Highcharts.numberFormat(this.value, 0, '', ',') + '人';
			};

			return {
				title: {text: '人口数の変遷'},
				subtitle: {text: 'Source: https://opendata.resas-portal.go.jp/'},
				yAxis: {title: {text: '総人口数', align: 'high', rotation: 0, y: -30, offset: 0}, labels: {allowDecimals: true, formatter: formatter_1} },
				xAxis: {title: {text: '年度', align: 'high', x: 40}, type: 'datetime', labels: { format: '{value:%Y}' } },
				legend: {layout: '', align: 'right', verticalAlign: 'middle'},
				plotOptions: {series: {label: {connectorAllowed: false }}}, 
				series: [], // ここに各県の人口データが入ります
				responsive: {
						rules: [{
							condition: {maxWidth: 500},
							chartOptions: {legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom'}}
							}]
						},
			};
		}

		// Highcharts設定
		setToHighcharts(objlist) {
			let result = this.initForHighcharts();

			let current_obj; // 各県の人口データ
			let popdt, startyear;
			for(let val_1 of objlist) {
				popdt = val_1.popdata.data.map(val_2 => val_2.value);
				startyear = val_1.popdata.data[0].year;
				current_obj = {
					name: val_1.name,
					data: popdt,
					pointStart: Date.parse(startyear),
					pointInterval: 3600 * 1000 * 24 * 365 * 5, // 5年ごとのデータ
				};
				result.series.push(current_obj);
			}
			Highcharts.chart('graph', result); // 適用
		}

		async componentDidUpdate() {

			const num = this.props.number;
			const check = this.props.check;

			const gotdata = this.state.gotdata;
			const target_from_list = gotdata.find(value => value.code == num);
			if(check && target_from_list === undefined) {

				// API
				const apiurl = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';
				const fromapi = await PullApiData(apiurl + '?prefCode=' + num);

				// 変換+セット
				const conv_obj = this.convertData(num, this.props.prefs, fromapi);
				gotdata.push(conv_obj);

			}else if(!check && target_from_list !== undefined) {
				const target_index = gotdata.findIndex(value => value.code == num);
				gotdata.splice(target_index, 1);
			}

			if(gotdata.length > 0) {
				this.setToHighcharts(gotdata);
			}else{
				document.getElementById('graph').innerHTML = '';
			}
		}

		render() {
			return <div id='graph'></div>;
		}
	}
