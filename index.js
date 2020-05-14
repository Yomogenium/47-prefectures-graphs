



function PullApiData(){

	return new Promise(function(resolve, reject){
		const apikey = 'Rdj12wQTJR5qA5QihOp1lfMvgvPlrOAcbpsXBzRZ';
		const apiurl = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';

		// リクエストの設定
		let request = new XMLHttpRequest();
		request.open("GET", apiurl);
		request.setRequestHeader('X-API-KEY', apikey);

		// 成功時
		request.addEventListener('load', function(){

			resolve('a');
		}, false);

		// エラー時
		request.addEventListener('error', function(){
			reject('Request error.');
		}, false);


		// タイムアウト
		request.addEventListener('timeout', function(){
			reject('Request timeout.');
		}, false);




	});
	request.send();
}



// PullApiData()
