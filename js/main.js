// 動作開始
(function() {

	'use strict';

	document.addEventListener("DOMContentLoaded", PageStart);


	// タイトル等の変更処理


	async function PageStart(){

		// ページ生成
		document.body.appendChild(document.createElement('header'));
		document.body.appendChild(document.createElement('main'));

		// タイトル
		let pagetitle;




		// 都道府県リストの作成
		let pref_api_url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
		
	    try {
	        const pref_result = await PullApiData(pref_api_url);
	        console.log(pref_result);






/*
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}








	const prefectures_area = React.createElement;

	class main extends React.Component {
		render() {
			return main_elements(
				'div',
				);
		}
	}


	const graphs_area = React.createElement;



	}




/*
	const main_elements = React.createElement;



	ReactDOM.render(
		main_elements(Header),
		document.body.appendChild(document.insertAdjacentHTML('afterend', '<div></div>'))
	);

ReactDom.render(
　　<Main />,
　　document.body
)

*/



















	    } catch (error_num) {
	        console.log(error_num);
	    }



		

// https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode=11




	}

	// APIからデータ取得
	function PullApiData(apiurl){
		return new Promise(function(resolve, reject){
			const apikey = 'Rdj12wQTJR5qA5QihOp1lfMvgvPlrOAcbpsXBzRZ';
			
			// リクエストの設定
			let request = new XMLHttpRequest();
			request.open("GET", apiurl);
			request.setRequestHeader('X-API-KEY', apikey);

			// 成功時
			request.addEventListener('load', function(){
				const result = JSON.parse(this.response);
				resolve(result);
			}, false);

			request.addEventListener('error', function(){
				reject(0); // Request error.
			}, false);

			request.addEventListener('timeout', function(){
				reject(1); // Request timeout.
			}, false);

			request.send();

		});
	}

})();