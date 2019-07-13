var app = (function () {

	var input = document.getElementById('input-task'),
		button = document.getElementById('add'),
		checks = document.querySelectorAll('.check'),
		list = document.getElementById('listTask')

	// Private Methods
	var createElement = function () {
		var ele = document.createElement('li');
		var li = '<div class="check">' + '</div>' + '<p>' + input.value + '</p>' + '<div class="delete"></div>';
		ele.insertAdjacentHTML('afterbegin', li)
		return ele
	}

	var addTask = function () {
		button.addEventListener('click', function () {
			console.log(input.value, this.id);
			list.appendChild(createElement());
			input.value = '';
			input.focus();
		})
	}

	var checkTask = function () {
		for (let check of checks) {
			console.log(check)
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
		checkTask: checkTask,
		createElement: createElement
	}
})();

app.addTask();
app.createElement();
app.checkTask();
