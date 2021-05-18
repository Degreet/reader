goBtn.onclick = () => {
	const text = textTA.value;
	localStorage.text = text;

	const parts = splitText(text, 300);
	localStorage.parts = JSON.stringify(parts);

	localStorage.savedPart = 1;
	location.href = 'read.html';
};
