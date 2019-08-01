var app = (function () {
	var input = document.getElementById("input-task"),
		button = document.getElementById("add"),
		list = document.getElementById("listTask");

	// Private Methods
	var createElement = function () {
		var li = document.createElement("li");
		var ele =
			'<div class="check">' +
			"</div>" +
			"<p>" +
			input.value +
			"</p>" +
			'<div class="delete"></div>';
		li.insertAdjacentHTML("afterbegin", ele);
		return li;
	};

	var addTask = function () {
		if (input.value == "") {
			input.style.border = "1px solid red";
			input.focus();
			inputTyping();
		} else {
			list.appendChild(createElement());
			checkTask();
			deleteTask();
			input.value = "";
		}
	};

	var checkTask = function () {
		var lastli = list.lastChild,
			check = lastli.getElementsByClassName('check');
		check[0].addEventListener("click", function () {
			check[0].classList.toggle("active");
		});
	}

	var deleteTask = function () {
		var lastli = list.lastChild,
			del = lastli.getElementsByClassName('delete');
		del[0].addEventListener('click', function (e) {
			del[0].parentNode.remove();
		})
	}

	var inputTyping = function () {
		input.addEventListener('keydown', function () {
			this.style.border = "1px solid transparent";
		})
	}

	button.addEventListener("click", addTask);

	return {
		// addTask: addTask,
		createElement: createElement
	};
})();
