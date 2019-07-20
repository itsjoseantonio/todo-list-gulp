var app = (function () {

	var input = document.getElementById('input-task'),
		button = document.getElementById('add'),
		list = document.getElementById('listTask')

	// Private Methods
	var createElement = function () {
		var li = document.createElement('li');
		var ele = '<div class="check">' + '</div>' + '<p>' + input.value + '</p>' + '<div class="delete"></div>';
		li.insertAdjacentHTML('afterbegin', ele)
		return li
	}

	var addTask = function () {
		list.appendChild(createElement());
		input.value = '';
		input.focus();
		checkTask();
	}

	var checkTask = function () {
		var checks = document.getElementsByClassName('check');
		console.log(checks)
		for (var i = 0; i <= checks.length; i++) {
			checks[i].addEventListener('click', function () {
				console.log(checks.length, this);
			});
		}
		// checks.addEventListener('click', function (e) {
		// 	console.log(e, 'click!')
		// 	this.classList.toggle('active');
		// 	// if (!this.classList.contains('active')) {
		// 	// 	this.classList.add('active');
		// 	// } else {
		// 	// 	this.classList.remove('active')
		// 	// }
		// })
	}

	button.addEventListener('click', addTask);
	// button.addEventListener('click', checkTask);

	return {
		// addTask: addTask,
		checkTask: checkTask,
		createElement: createElement
	}
})();

// app.addTask();
app.createElement();
app.checkTask();
