import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit {

  userList: User[] = [];
  paginatedUserList: User[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPage: number = 0;
  pages: number[] = [];
  pageStart: number = 0;
  isLoading: boolean = true;
  sortFullNameOrder: "asc" | "desc" = "asc";
  sortUsernameOrder: "asc" | "desc" = "asc";

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAllRandomUsers().subscribe({
      next: (res: User[]) => {
        this.userList = res;
        this.totalPage = res.length / this.pageSize;
        this.pages = Array.from({ length: this.totalPage }, (v, k) => k + 1).slice(0, 0 + this.pageSize);
        this.isLoading = false;
        this.setPage(1);

      },
      error: console.log
    })
  }

  getUserListPaginated(page: number): void {
    this.userService.getAllRandomUsersPaginated(page).subscribe({
      next: (res: User[]) => {
        this.paginatedUserList = res;
      },
      error: console.log
    })
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPage) {
      return;
    }
    this.currentPage = page;

    // const startIndex = (page - 1) * this.pageSize;
    // const endIndex = Math.min(startIndex + this.pageSize - 1, this.userList.length - 1);
    // this.paginatedUserList = this.userList.slice(startIndex, endIndex + 1);
    
    this.getUserListPaginated(page);
  }


  nextPageBtn(): void {
    if (!this.isLoading && this.currentPage < this.totalPage) {
      this.currentPage++;
      this.setPage(this.currentPage);
    }
  }

  previousPageBtn(): void {
    if (!this.isLoading && this.currentPage > 1) {
      this.currentPage--;
      this.setPage(this.currentPage);
    }
  }

  orderByFullName(): void {
    this.paginatedUserList.sort((a, b) => {
      const fullNameA = a.title + a.first + a.last;
      const fullNameB = b.title + b.first + b.last;

      if(fullNameA.toLowerCase() < fullNameB.toLowerCase()){
        return this.sortFullNameOrder === 'asc' ? 1 : -1;
      }
      if(fullNameA.toLowerCase() > fullNameB.toLowerCase()){
        return this.sortFullNameOrder === 'desc' ? 1 : -1;
      }
      return 0;
    });
  }

  orderByUsername(): void {
    this.paginatedUserList.sort((a, b) => {
      const usernameA = a.username;
      const usernameB = b.username;
      if(usernameA.toLowerCase() < usernameB.toLowerCase()){
        return this.sortUsernameOrder === 'asc' ? 1 : -1;
      }
      if(usernameA.toLowerCase() > usernameB.toLowerCase()){
        return this.sortUsernameOrder === 'desc' ? 1 : -1;
      }
      return 0;
    });
  }

  toggleFullNameSort(): void {
    this.sortFullNameOrder = this.sortFullNameOrder === 'asc' ? 'desc' : 'asc';
    this.orderByFullName();
  }

  toggleUserNameSort(): void {
    this.sortUsernameOrder = this.sortUsernameOrder === 'asc' ? 'desc' : 'asc';
    this.orderByUsername();
  }


}
