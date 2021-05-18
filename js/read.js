let savedPart = +localStorage.savedPart || 1;
let parts = localStorage.parts;
if (!parts || isNaN(savedPart)) location.href = './get-text.html';

parts = JSON.parse(parts);
if (!(parts instanceof Array)) location.href = './get-text.html';

function showPart(idx) {
	const part = parts[idx];

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
