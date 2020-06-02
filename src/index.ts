import {TodoItem} from './todoItem';
import {TodoCollection} from './todoCollection';

let todos=[
    new TodoItem(1,"Buy FLowers"),
    new TodoItem(2,"Study for the exam"),
    new TodoItem(3,"Hangout with friends")
] 

let collection = new TodoCollection("Sithum",todos);

collection.markComplete(1,true);
collection.removeComplete();
let newId=collection.addTodo("Go for a run");

console.clear();
console.log(`${collection.userName}'s Todo List `+`${collection.getItemsCounts().incomplete} items to do`);
//console.log(JSON.stringify(todoItem));
collection.getTodoItems(true).forEach(item => item.printDetails());
