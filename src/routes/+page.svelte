<script>
	export let data;

	$: console.log(data);

	function speak() {
		let utterance = new SpeechSynthesisUtterance(data.japaneseText);
		utterance.lang = 'ja';
		utterance.rate = 0.8;
		speechSynthesis.speak(utterance);
	}

	function copySentence() {
		navigator.clipboard.writeText(data.japaneseText);
	}

	function setBackgroundImage() {
		// remove short words
		let extractedWords = data.translation.split(' ').filter((x) => x.length > 4);

		if (extractedWords.length == 0) {
			extractedWords = data.translation.split(' ').filter((x) => x.length > 3);
		}

		if (extractedWords.length == 0) {
			extractedWords = data.translation.split(' ').filter((x) => x.length > 2);
		}

		// remove words with apostrophe's like "didn't"
		let noApostrophes = extractedWords.filter((x) => x.indexOf("'") == -1);
		if (noApostrophes) extractedWords = noApostrophes;

		console.log('extractedWords');
		console.log(extractedWords);

		let backgroundImageURL = `url("https://source.unsplash.com/random/?${extractedWords.join()}")`;

		// console.log(backgroundImageURL);

		document.body.style.backgroundImage = backgroundImageURL;
	}

	setBackgroundImage();
</script>

<h1>{@html data.japaneseRuby}</h1>
<p>{data.translation}</p>
<div class="button-row">
	<button on:click={speak}>Speak</button>
	<button on:click={copySentence}>Copy</button>
</div>
<small>{data.seed}</small>
