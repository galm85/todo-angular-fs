import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/interfaces/list';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists:List[]=[];
  tasks:Task[]=[];
  selectedListId:string = '';
  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      console.log(params);
      this.selectedListId = params.listId;
      this.taskService.getTasks(params.listId).subscribe((tasks:any)=>{
        this.tasks = tasks;
      })
    })

    this.taskService.getLists().subscribe((lists:any)=>{
      this.lists = lists
    })

  }


  onTaskClick(task:Task){
    this.taskService.complete(task).subscribe(()=>{

      task.complete = !task.complete;
    });
  }

  onDeleteList(){
    this.taskService.deleteList(this.selectedListId).subscribe((res:any)=>{
      alert(res.message);
      this.router.navigate(['/lists']);
    });

  }


  deleteTask(taskId:any){
    this.taskService.deleteTask(taskId).subscribe((res:any)=>{
      alert(res.message);
      //this.router.navigate([`/lists/${this.selectedListId}`]);
      this.tasks = this.tasks.filter(task => task._id !== taskId);
    })

  }


}
