import '../sass/main.sass'

document.addEventListener('DOMContentLoaded', function() {
	let links = document.querySelectorAll('a');
	links.forEach(item => {
		item.addEventListener('click', function() {
			location.hash = '#' + this.getAttribute('href');
		});
	});
});
