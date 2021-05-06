import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { WebRequiestService } from './web-requiest.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private web:WebRequiestService) { }

  createList(title:string){
    return this.web.post('/lists',{title});
  }

  updateList(listId:string,title:string){
    return this.web.patch(`/lists/${listId}`,{title});
  }

  getLists(){
    return this.web.get('/lists');
  }


  getTasks(listId:string){
    return this.web.get('/tasks/'+listId);
  }

  createTask(title:string,listId:string){
    return this.web.post('/tasks/'+listId,{title});
  }

  complete(task:Task){
     return this.web.patch(`/tasks/${task._id}`,{complete:!task.complete})
  }

  deleteList(id:string){
    return this.web.delete(`/lists/${id}`);
  }


  deleteTask(id:string){
    return this.web.delete(`/tasks/${id}`);
  }

  updateTask(title:string,taskId:string){
    return this.web.patch(`/tasks/${taskId}`,{title});
  }

}
