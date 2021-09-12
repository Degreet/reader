const textTA = document.getElementById('textTA');
const btnsDiv = document.getElementById('btnsDiv');
const progress = document.getElementById('progress');

let savedPart = +localStorage.savedPart || 1;
let parts = localStorage.parts;
if (!parts || isNaN(savedPart)) location.href = './get-text.html';

parts = JSON.parse(parts);
if (!(parts instanceof Array)) location.href = './get-text.html';

function speak(text) {
	const message = new SpeechSynthesisUtterance();
	message.text = text;
	message.rate = 0.8;
	window.speechSynthesis.speak(message);
}

function showPart(idx) {
	const part = parts[idx];
	let voice = new Voice(part);

	if (!part) {
		sessionStorage.parts = sessionStorage.savedPart = null;
		document.body.innerHTML = /*html*/ `
      <main id="info">
        <h1>Финиш!</h1>
        <a href="./get-text.html">Начать новое чтение</a>
      </main>
    `;
	}

	const hasPrevPart = idx > 0;
	progress.style.width = `${(100 * (idx + 1)) / parts.length}%`;

	textTA.value = part.trim();
	btnsDiv.innerHTML = ``;

	const voiceBtnHandler = (e) => {
		if (voice.isPlaying) {
			voice.pause();
			e.target.innerText = 'Озвучить';
		} else {
			voice.play();
			e.target.innerText = 'Пауза';
		}
	};

	if (hasPrevPart) {
		const prevBtn = document.createElement('button');
		prevBtn.className = 'btn btn-outline-danger';
		prevBtn.innerText = 'Пред. блок';
		btnsDiv.append(prevBtn);

		prevBtn.onclick = () => {
			localStorage.savedPart = --savedPart;
			showPart(savedPart - 1);
		};
	}

	const voiceBtn = document.createElement('button');
	voiceBtn.className = 'btn btn-outline-primary';
	voiceBtn.innerText = 'Озвучить';
	voiceBtn.onclick = voiceBtnHandler;
	btnsDiv.append(voiceBtn);

	voice.voice.onend = () => {
		voiceBtn.innerText = 'Озвучить';
		voice = new Voice(part);
	}

	const nextBtn = document.createElement('button');
	nextBtn.className = 'btn btn-outline-success';
	nextBtn.innerText = idx + 1 == parts.length ? 'Завершить' : 'След. блок';
	btnsDiv.append(nextBtn);

	nextBtn.onclick = () => {
		localStorage.savedPart = ++savedPart;
		showPart(savedPart - 1);
	};
}

showPart(savedPart - 1);
