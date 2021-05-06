import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId:string = '';
  listId:string = '';
  constructor(private route:ActivatedRoute,private taskService:TaskService,private router:Router) { }



  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.taskId = params.taskId;
      this.listId = params.listId;
    })
  }

  updateTask(title:string){
    this.taskService.updateTask(title,this.taskId).subscribe((res:any)=>{
      alert(res.message);
      this.router.navigate([`/lists/${this.listId}`]);
    })
  }

}