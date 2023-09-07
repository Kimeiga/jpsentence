
function makeid(length) {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export async function load({ params }) {

	console.log(params)
	let seed = makeid(4);

	let response = await fetch("https://tatoeba.org/en/api_v0/search?from=jpn&orphans=no&sort=random&to=eng&trans_filter=limit&trans_to=eng&unapproved=no&limit=1&current=1&rand_seed=" + seed).then(r => r.json())

	// console.log(response);
	let japaneseText = response.results[0].text;
	let japaneseRuby = response.results[0].transcriptions[0].html;
	let japaneseRubyString = response.results[0].transcriptions[0].text;

	// filter the Japanese Text for full width period, and replace it with a half width period
	japaneseRuby = japaneseRuby.replace(/。/g, "｡").replace(/？/g, "?").replace(/！/g, "!");

	// japanese.innerHTML = japaneseRuby;

	let translation = '';
	if (response.results[0].translations[0]) {
		translation = response.results[0].translations[0][0].text;
	}
	else if (response.results[0].translations[1]) {
		translation = response.results[0].translations[1][0].text;
	}
	else {
		translation = "No translation available";
	}




	return {
		japaneseText, japaneseRuby, japaneseRubyString, translation, seed
	}
}