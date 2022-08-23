// SELECTORS

let taskİnput = document.querySelector("#taskİnput")
let add = document.querySelector("#add")
let clear = document.querySelector("#clear")
let tasks = document.querySelector("#tasks")
let isEditTask=false
let editTaskIndex

// TASKS

let tasksStorage = []

if(localStorage.getItem("gorevListesi") !== null) {
    tasksStorage = JSON.parse(localStorage.getItem("gorevListesi"))
}


//////////////////////////////////////////////////////////////////

display()

//////////////////////////////////////////////////////////////////

// EVENTS

add.addEventListener("click", newTask)
add.addEventListener("keypress",function(){
    if(e.key=="Enter"){
        add.addEventListener("click", newTask)
    }
})
clear.addEventListener("click", clearAll)




// FUNCTİONS

function display() {

    tasks.innerHTML=""
    for(i in tasksStorage){
        if(tasksStorage[i].status=="checked"){
            let liDom = `
            <li class="task checked" onclick="completedItem(tasksStorage[${i}].status, ${tasksStorage[i].id})" id="${tasksStorage[i].id}">
                <p>${tasksStorage[i].contents}</p>
                <div class="right">
                    <img src="img/edit-btn.svg" onclick="editTask(${i})">
                    <img src="img/delete-btn.svg" onclick="deleteTask(${tasksStorage[i].id})">
                </div>
            </li>
            `
            tasks.insertAdjacentHTML("beforeend", liDom)
        } else{
            let liDom = `
            <li class="task" onclick="completedItem(tasksStorage[${i}].status, ${tasksStorage[i].id})" id="${tasksStorage[i].id}">
                <p>${tasksStorage[i].contents}</p>
                <div class="right">
                    <img src="img/edit-btn.svg" onclick="editTask(${i})">
                    <img src="img/delete-btn.svg" onclick="deleteTask(${tasksStorage[i].id})">
                </div>
            </li>
            `
            tasks.insertAdjacentHTML("beforeend", liDom)
        }
    }    
}

function newTask(event){
    if(taskİnput.value.trim().length==0){
        alert("İçerik kısmı boş olamaz")
    } else{
        if(isEditTask==false){
            tasksStorage.push({"id":tasksStorage.length+1, "contents":taskİnput.value, "status":""})
        } else{
            tasksStorage[editTaskIndex].contents = taskİnput.value
            isEditTask=false
        }
        taskİnput.value=""
        localStorage.setItem("gorevListesi", JSON.stringify(tasksStorage))
        display()
    }
    event.preventDefault()
}

function deleteTask(id){
    let deletedId;
    
    deletedId = tasksStorage.findIndex(task => task.id == id)

    console.log(deletedId)
    tasksStorage.splice(deletedId,1)
    localStorage.setItem("gorevListesi", JSON.stringify(tasksStorage))
    display()
}

function editTask(index){
    isEditTask=true
    editTaskIndex=index
    taskİnput.focus()
    taskİnput.value = tasksStorage[editTaskIndex].contents
}

function clearAll(event){
    tasksStorage = []
    localStorage.setItem("gorevListesi", JSON.stringify(tasksStorage))
    display()
    event.preventDefault()
}

function completedItem(status, id){
    statusId = tasksStorage.findIndex(task => task.id == id)
    if(status==""){
        tasksStorage[statusId].status="checked"
    } else{
        tasksStorage[statusId].status=""
    }
    localStorage.setItem("gorevListesi", JSON.stringify(tasksStorage))
    display()
}
