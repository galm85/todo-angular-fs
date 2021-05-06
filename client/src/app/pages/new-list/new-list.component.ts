import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/interfaces/list';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService,private router:Router) { }

  createNewList(title:string){
    this.taskService.createList(title).subscribe((task:any)=>{
      console.log(task);
      this.router.navigate(['/lists',task._id]);

    })
  }

  ngOnInit(): void {
  }

}
