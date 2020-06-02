import {TodoItem} from './todoItem';
import {TodoCollection} from './todoCollection';
import * as inquirer from 'inquirer';
import {JsonTodoCollection} from './jsonTodoCollection';

let todos=[
    new TodoItem(1,"Buy FLowers"),
    new TodoItem(2,"Study for the exam"),
    new TodoItem(3,"Hangout with friends")
] 

let collection:TodoCollection = new JsonTodoCollection("Sithum",todos);
let showCompleted=true;

//collection.markComplete(1,true);
//collection.removeComplete();
//let newId=collection.addTodo("Go for a run");

function displayTodoList():void{
    console.log(`${collection.userName}'s Todo List `+`${collection.getItemsCounts().incomplete} items to do`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands{
    Add="Add New Task",
    Complete="Complete Task",
    Toggle="Show/Hide Completed",
    Purge="Remove Completed Tasks",
    Quit = "Quit"
}

 function promptAdd():void{
     console.clear();
     inquirer.prompt({
         type:"input",
         name:"add",
         message:"Enter Task : "
     }).then(answers =>{
         if(answers["add"] !== ""){
             collection.addTodo(answers["add"]);
         }
         promptUser();
     })
 }

 function promptComplete():void{
    console.clear();
    inquirer.prompt({
        type:"checkbox",
        name:"complete",
        message:"Mark Tasks Complete",
        choices:collection.getTodoItems(showCompleted).map(item=>
            ({name:item.task,value:item.id,checked:item.complete}))
    }).then(answers =>{
        let completedTasks = answers["complete"] as number[];
        collection.getTodoItems(true).forEach(item => 
            collection.markComplete(item.id,completedTasks.find(id => id === item.id)!= undefined ));

            promptUser();
    })
 }

function promptUser():void{
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type:"list",
        name:"command",
        message:"Choose Option",
        choices:Object.values(Commands)
    }).then(answers => {
         switch(answers["command"]){
             case Commands.Toggle : showCompleted = !showCompleted;
             promptUser();
             break;

             case Commands.Add : promptAdd();
             break;

             case Commands.Complete : 
             if(collection.getItemsCounts().incomplete > 0){
                promptComplete();
             }else{
                 promptUser();
             }
             break;

             case Commands.Purge : collection.removeComplete();
             break;
         }
    })
}

promptUser();




