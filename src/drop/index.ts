const ele = document.getElementById('id') as HTMLDivElement;
let dragging = false;
let poistion: number[] = [];

ele.addEventListener('mousedown', (e) => {
	dragging = true;
	poistion = [e.clientX, e.clientY];
});

ele.addEventListener('mousemove', (e) => {
	if (!dragging) return;

	const x = e.clientX;
	const y = e.clientY;

	const deltaX = x - poistion[0];
	const deltaY = y - poistion[1];

	const left = parseFloat(ele.style.left || '0');
	const top = parseFloat(ele.style.top || '0');

	ele.style.left = `${left + deltaX}px`;
	ele.style.top = `${top + deltaY}px`;
});

ele.addEventListener('mouseup', () => {
	dragging = false;
});
