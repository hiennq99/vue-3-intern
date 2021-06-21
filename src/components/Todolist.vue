<template>
    <div class="bg-white w-3/4 mx-auto">
      <div class="p-4">
        <div class="mb-4">
          <label for="">
            Add
            <input type="text" placeholder="" class="border rounded px-2 " v-model="data.name">
            <button @click="onAdd()" class="btn-add">Add</button>
          </label>
        </div>
        <div class="flex justify-between text-sm font-normal font-serif mb-3" >
          <div >
              <label for="">
                  Show
                  <select name="" id="" class="bg-white border rounded" v-model="data.pageSize">
                      <!-- <option disabled value="">4</option> -->
                      <option value="4">4</option>
                      <option value="10">10</option>
                  </select>
                  entries
              </label>
          </div>
          <div>
              <label for="">
                  Search:
                  <input type="text" placeholder="tim" class="border rounded px-2" v-model="data.search" @keypress.enter="onSearch()">
              </label>
          </div>
        </div>
        <div>
          <table class="text-center">
            <thead>
              <tr class="border-b border-black">
                <!-- <th class="w-1/6">SST</th> -->
                <th class="w-2/6 cursor-pointer" @click="sorttable('name')">Name<span v-show="data.currentSortDir==='asc'">	&darr;</span><span v-show="data.currentSortDir==='desc'">		&uarr;</span></th>
                <th class="w-2/6">Status</th>
                <th class="w-1/6"></th>
                <th class="w-1/6"></th>
                <th class="w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in todoList" :key="index" class="border-b border-gray-300">
                <!-- <td class="w-1/6">{{item.name}}</td> -->
                <td class="w-2/6"><input type="text" v-model="item.name"></td>
                <td class="w-2/6">{{item.status}} <input class="ml-4" type="checkbox" v-model="item.status" @click="onCheck(index)"></td>
                <td class="w-1/12"><button class="btn-del" @click="onDelete(index)">Del</button> <button class="btn-edit" @click="onEdit(index)">Edit</button></td>
                
              </tr>
            </tbody>
          </table>

        </div>
        <div>
          <button @click="onPrevPage()" class="btn">	&lsaquo;</button>
          <button @click="onPage(data.currentPage)" class="btn" :class="{'btn-action':data.currentPage}">{{data.currentPage}}</button>
          <button @click="onPage(data.currentPage+1)" class="btn" v-show="(this.data.currentPage*this.data.pageSize)<this.data.todoList.length">{{data.currentPage+1}}</button>
          <!-- <button @click="onPage(data.currentPage+2)" class="btn" v-show="(this.data.currentPage*this.data.pageSize)<this.data.todoList.length" >{{data.currentPage+2}}</button> -->
          <button @click="onNextPage()" class="btn">	&rsaquo;</button>
        </div>
      </div>
    </div>
</template>
<script>
import { reactive } from '@vue/reactivity'
import vPagination from 'vue-plain-pagination'
export default {

    setup(){
      const data=reactive({
        currentSort:'name',
        currentSortDir:'asc',
        pageSize:4,
        currentPage:1,
        pageNumber:1,
        name:null,
        status:'false',
        search:'',
        arraySearch:[],
        todoList:[]
      });
      return{
        data,
      }
    },
    methods: {
      sorttable(nametable){
        if(nametable===this.data.currentSort){
          this.data.currentSortDir=this.data.currentSortDir==='asc'?'desc':'asc';
        }
        this.data.currentSort=nametable;
      },
      onAdd(){
        let test=true;
        for(let index in this.data.todoList){
          if(this.data.todoList[index].name===this.data.name){
            test=false;
          } 
        }
        
        if(this.data.name!=null&&test===true){
          this.data.todoList.push({
            name:this.data.name,
            status:false
          })
          this.data.name=null;
        }
        localStorage.setItem('todolist',JSON.stringify(this.data.todoList));
      },
      onCheck(index){
        if(this.data.todoList[index].status==true){
          this.data.todoList[index].status=false
        }
        else{
          this.data.todoList[index].status=true
        }
        console.log(this.data.todoList[index].status)

        // this.data.todoList[index].status=true;
        localStorage.setItem('todolist',JSON.stringify(this.data.todoList));
      },
      onDelete(index){
        this.data.todoList.splice(index,1);
        localStorage.setItem('todolist',JSON.stringify(this.data.todoList));
      },
      onEdit(index){
        localStorage.setItem('todolist',JSON.stringify(this.data.todoList))
      },
      onSearch(){
        for(let index in this.data.todoList){
          if(this.data.todoList[index].name.indexOf(this.data.search)!=-1){
            this.data.arraySearch.push(this.data.todoList[index]);
          }
        }
        this.data.todoList=this.data.arraySearch;
        if(this.data.search==''){
          this.data.todoList=JSON.parse(localStorage.getItem('todolist'));
        }
        this.data.arraySearch=[];
      },
      onNextPage(){
        if((this.data.currentPage*this.data.pageSize)<this.data.todoList.length){
          this.data.currentPage++;
          
        }
        console.log(this.data.currentPage)
      },
      onPrevPage(){
        if(this.data.currentPage>1){
          this.data.currentPage--;
        }
      },
      onPage(number){
        this.data.currentPage=number;
      }

    },
    computed:{
        todoList(){
           return this.data.todoList.filter((row, index) => {
          let start = (this.data.currentPage-1)*this.data.pageSize;
          let end = this.data.currentPage*this.data.pageSize;
          if(index >= start && index < end) return true;
	        })
          .sort((a,b) => {
            let modifier = 1;
            if(this.data.currentSortDir === 'desc') modifier = -1;
            if(a[this.data.currentSort] < b[this.data.currentSort]) return -1 * modifier;
            if(a[this.data.currentSort] > b[this.data.currentSort]) return 1 * modifier;
            return 0;
          });
        }
    },
    created(){
      this.data.todoList=JSON.parse(localStorage.getItem('todolist'));
    }
}

</script>