
let listContainer = document.getElementById('list')
let createNoteBtn = document.getElementById('create')

const toDoList = JSON.parse(window.localStorage.getItem('toDoList'))



for(note in toDoList) {

	listContainer.insertAdjacentHTML('beforeEnd', `
		<li
			class="
			list-group-item d-flex justify-content-between align-items-center
			${toDoList[note].actuality === false ? 'bg-success' : null}
			"
		>
			<span data-value="${toDoList[note].text}">${toDoList[note].text}</span>
			<span>
				<span class="btn btn-small btn-success">&check;</span>
				<span class="btn btn-small btn-danger">&times;</span>
			</span>
		</li>
	`
	)

	
	var successNoteBtn = document.querySelectorAll('.btn-success')
	var deleteNoteBtn = document.querySelectorAll('.btn-danger')

	deleteNoteBtn.forEach((e) => {
		e.onclick = () => {
			removeNote(e)
		}
	})
	
	successNoteBtn.forEach((e) => {
		e.onclick = () => {
			successNote(e)
		}
	})
}

function validate(newNote) {
	const curentListItems = listContainer.querySelectorAll('li')

	newNote.text = newNote.text.trim()

	if(newNote.text === '') {
		return
	}

	const findNote = Array.prototype.find.call(curentListItems, (e) => {
		if (e.querySelector('span').dataset.value.toLowerCase() === newNote.text.toLowerCase()) {
			return e
		}
	})

	if (findNote) {
		return
	}


	return newNote
}

function render(newNote) {
	if(validate(newNote)) {
		listContainer.insertAdjacentHTML('beforeEnd', `
			<li
				class="list-group-item d-flex justify-content-between align-items-center"
			>
				<span data-value="${newNote.text}">${newNote.text}</span>
				<span>
					<span class="btn btn-small btn-success">&check;</span>
					<span class="btn btn-small btn-danger">&times;</span>
				</span>
			</li>
		`
		)

		toDoList.push(newNote)
		localStorage.setItem("toDoList", JSON.stringify(toDoList))

		successNoteBtn = document.querySelectorAll('.btn-success')
		deleteNoteBtn = document.querySelectorAll('.btn-danger')
	}
	
	deleteNoteBtn.forEach((e) => {
		e.onclick = () => {
			removeNote(e)
		}
	})

	successNoteBtn.forEach((e) => {
		e.onclick = () => {
			successNote(e)
		}
	})
}

function removeNote(e) {
	const currentNote = e.closest('li')
	const noteValue = currentNote.querySelector('span').dataset.value
	const noteId = toDoList.map(function(o) { return o.text }).indexOf(noteValue)

	currentNote.remove()
	toDoList.splice([noteId], 1)
	localStorage.setItem("toDoList", JSON.stringify(toDoList))
}

function successNote(e) {
	const currentNote = e.closest('li')
	const noteValue = currentNote.querySelector('span').dataset.value
	const noteId = toDoList.map(function(o) { return o.text }).indexOf(noteValue)

	if (toDoList[noteId].actuality === true) {
		toDoList[noteId].actuality = false
		currentNote.classList.add("bg-success");
	} else {
		toDoList[noteId].actuality = true
		currentNote.classList.remove("bg-success");
	}
	localStorage.setItem("toDoList", JSON.stringify(toDoList))
}

createNoteBtn.onclick = function () {
	newNote = document.getElementById('title').value

	render({text: newNote, actuality: true})
}
