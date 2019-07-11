var app = (function () {

	var input = document.getElementById('input-task'),
		button = document.getElementById('add'),
		checks = document.querySelectorAll('.check');

	var addTask = function () {
		button.addEventListener('click', function () {
			console.log(input.value)
			input.value = '';
			input.focus();
		})
	}

	var checkTask = function () {
		for (let check of checks) {
			check.addEventListener('click', function () {
				if (this.classList.contains('active')) {
					this.classList.remove('active');
				} else {
					this.classList.add('active')
				}
			})
		}
	}

	return {
		addTask: addTask,
		checkTask: checkTask
	}
})();

app.addTask();
app.checkTask();
