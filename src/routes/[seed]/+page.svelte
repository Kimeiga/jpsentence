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
</script>

<h1>{@html data.japaneseRuby}</h1>
<p>{data.translation}</p>
<div class="button-row">
	<button on:click={speak}>Speak</button>
	<button on:click={copySentence}>Copy</button>
</div>
<small>{data.seed}</small>
