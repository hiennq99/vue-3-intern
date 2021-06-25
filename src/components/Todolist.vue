<template>
    <div class="bg-white w-3/4 mx-auto flex">
      <div class="p-4 w-3/4">
        <div class="mb-4">
          
          <button @click="onClickAdd" class="btn-add">Thêm</button>
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
                  <input type="text" placeholder="tim" class="border rounded px-2" v-model="data.search">
              </label>
          </div>
        </div>
        <div>
          <table class="text-center">
            <thead>
              <tr class="border-b border-black">
                <!-- <th class="w-1/6">SST</th> -->
                <th class="w-2/6 cursor-pointer" @click="sorttable('name')">Name<span v-show="data.currentSortDir==='asc'">	&darr;</span><span v-show="data.currentSortDir==='desc'">		&uarr;</span></th>
                <th >Content</th>
                <th >Status</th>
                <th class="w-1/6"></th>
                <th class="w-1/6"></th>
                <th class="w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in todoList1" :key="index" class="border-b border-gray-300">
                <!-- <td class="w-1/6">{{item.name}}</td> -->
                <td ><input type="text" v-model="item.name"></td>
                <td ><input type="text" v-model="item.content"></td>
                <!-- <td >{{item.status}}</td> -->
                <td>
                  <button class="ml-4 btn-add" @click="onCheck(index)">
                      <span v-if="item.status==true">UnCheck</span>
                      <span v-if="item.status==false">Check</span>  
                  </button>
                </td>
                <td>
                  <button class="btn-del" @click="onDelete(index)">Del</button> 
                  <button class="btn-edit" @click="onEdit(index)">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
          
        </div>
        <div>
          <button @click="onPrevPage()" class="btn">	&lsaquo;</button>
          <div class="inline-block">
            <button @click="onPage(data.currentPage)" class="btn" :class="{'btn-action':data.currentPage}">{{data.currentPage}}</button>
            <button @click="onPage(data.currentPage+1)" class="btn" v-show="(this.data.currentPage*this.data.pageSize)<this.data.todoList.length">{{data.currentPage+1}}</button>
          </div>
          <!-- <button @click="onPage(data.currentPage+2)" class="btn" v-show="(this.data.currentPage*this.data.pageSize)<this.data.todoList.length" >{{data.currentPage+2}}</button> -->
          <button @click="onNextPage()" class="btn">	&rsaquo;</button>
        </div>
      </div>
      <div class="my-auto mt-32 text-center text-green-500 font-bold text-md w-1/4">Có <span>{{totalNumber}}</span> việc hoàn thành</div>
      <!-- add -->
      <div v-if="data.add" class="w-96 h-40 fixed border z-10 r bg-blue-50 top-1/3 left-1/3 rounded-md p-3">
        <label for="">
          <div>
            <div>
              Name
            </div>
            <input type="text" placeholder="" class="border rounded px-2 w-64" v-model="data.name">
          </div>
          <div class="flex">
            <div>
              <div>
              Content
              </div>
              <textarea placeholder="" class="border rounded px-2 w-64 " v-model="data.content"></textarea>
            </div>
            <div class="ml-8 -mt-2">
            <button @click="onAdd()" class="btn-add mb-2">Add</button>
            <button @click="onClickAddOne()" class="btn-add">AddOne</button>
            </div>
          </div>
          
          </label>
      </div>
      <!-- edit -->
      <div v-if="data.edit" class="w-96 h-40 fixed border z-10 r bg-blue-50 top-1/3 left-1/3 rounded-md p-3">
        <label for="">
          <div>
            <div>
              Name
            </div>
            <input type="text" placeholder="" class="border rounded px-2 w-64" v-model="data.name">
          </div>
          <div class="flex">
            <div>
              <div>
              Content
              </div>
              <textarea placeholder="" class="border rounded px-2 w-64 " v-model="data.content"></textarea>
            </div>
            <div class="ml-8">
            <button @click="onSave()" class="btn-add mb-2">Save</button>
            <button @click="onClickClose()" class="btn-del">Cancel</button>
            </div>
          </div>
          
          </label>
      </div>
    </div>
      <div v-if="data.add==true" @click="onClickClose" class="fixed bg-gray-200 bg-opacity-60 top-0 left-0 right-0 bottom-0">
    </div>
  
</template>
<script>
import { reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';

export default {

    setup(){
      const data=reactive({
        currentSort:'name',
        currentSortDir:'asc',
        pageSize:4,
        currentPage:1,
        pageNumber:1,
        add:false,
        edit:false,
        name:null,
        index:null,
        indexEdit:null,
        content:'',
        status:false,
        search:'',
        numberCheck:0,
        notificationStatus:false,
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
        this.data.todoList.sort((a,b) => {
            let modifier = 1;
            if(this.data.currentSortDir === 'desc') modifier = -1;
            if(a[this.data.currentSort] < b[this.data.currentSort]) return -1 * modifier;
            if(a[this.data.currentSort] > b[this.data.currentSort]) return 1 * modifier;
            return 0;
          });

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
            status:false,
            content:this.data.content,
          })
          this.$toast.success(`Thêm thành công`); 
          this.data.name=null;
          this.data.content=null;
        }
        this.data.todoList.sort((a,b) => {
            let modifier = 1;
            if(this.data.currentSortDir === 'desc') modifier = -1;
            if(a[this.data.currentSort] < b[this.data.currentSort]) return -1 * modifier;
            if(a[this.data.currentSort] > b[this.data.currentSort]) return 1 * modifier;
            return 0;
          });
        localStorage.setItem('todolist',JSON.stringify(this.data.todoList));
        // this.data.add=false;
      },
      onClickAdd(){
        this.data.add=true;
      },
      onClickAddOne(){
        this.onAdd();
        this.data.add=false;
      },
      onClickClose(){
        this.data.add=false;
        this.data.edit=false;
      },
      onCheck(index){
        
        this.data.index=0;
        this.data.index=index+(this.data.currentPage-1)*this.data.pageSize;
        console.log(this.data.index)

        if(this.data.todoList[this.data.index].status==true){
          this.data.todoList[this.data.index].status=false;
          // this.data.numberCheck--;
          this.$toast.success(`Thay đổi trạng thái thành công`);
          
        }
        else{
          this.data.todoList[this.data.index].status=true;
          // this.data.numberCheck++;
          this.$toast.success(`Thay đổi trạng thái thành công`);
        }
        console.log(this.data.todoList[this.data.index])
        localStorage.setItem('todolist',JSON.stringify(this.data.todoList));
        // localStorage.setItem('numberCheck',JSON.stringify(this.data.numberCheck))

      },
      onDelete(index){
        this.data.todoList.sort((a,b) => {
            let modifier = 1;
            if(this.data.currentSortDir === 'desc') modifier = -1;
            if(a[this.data.currentSort] < b[this.data.currentSort]) return -1 * modifier;
            if(a[this.data.currentSort] > b[this.data.currentSort]) return 1 * modifier;
            return 0;
          });
        this.data.index=0;
        this.data.index=index+(this.data.currentPage-1)*this.data.pageSize;
        console.log(this.data.index)
        // this.data.todoList=this.todoList1;
        this.data.todoList.splice(this.data.index,1);

        localStorage.setItem('todolist',JSON.stringify(this.data.todoList));
        this.$toast.success(`Xóa thành công`);
      },
      onEdit(index){
        this.data.indexEdit=index;
        this.data.index=0;
        this.data.index=index+(this.data.currentPage-1)*this.data.pageSize;
        this.data.edit=true;
        this.data.name=this.data.todoList[this.data.index].name;
        this.data.content=this.data.todoList[this.data.index].content;
      },
      onSave(){
        this.data.index=0;
        this.data.index=this.data.indexEdit+(this.data.currentPage-1)*this.data.pageSize;
        console.log(this.data.index)

        this.data.todoList[this.data.index].name=this.data.name;
        this.data.todoList[this.data.index].content=this.data.content;
        this.data.edit=false;this.data.add=false;
        console.log(this.data.edit);
        
        localStorage.setItem('todolist',JSON.stringify(this.data.todoList))
        this.$toast.success(`Sửa thành công`);
      },
      onSearch(){
        // this.data.todoList=this.todoList1;
        for(let index in this.data.todoList){
          if(this.data.todoList[index].name.indexOf(this.data.search)!=-1){
            this.data.arraySearch.push(this.data.todoList[index]);
          }
        }
        this.data.todoList=this.data.arraySearch;
        if(this.data.search===''){
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
        todoList1(){ 
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
        },
        todoList(){
            return this.data.todoList.sort((a,b) => {
            let modifier = 1;
            if(this.data.currentSortDir === 'desc') modifier = -1;
            if(a[this.data.currentSort] < b[this.data.currentSort]) return -1 * modifier;
            if(a[this.data.currentSort] > b[this.data.currentSort]) return 1 * modifier;
            return 0;
          });
        },
        getSearch() {
          return this.data.search;
        },
        // getTotal() {
        //   return this.data.todoList;
        // },
        // getTotal: {
        //   get(){
        //     return this.data.todoList;
        //   },
        //   set(){
        //     this.data.numberCheck=0;
        //     for(let index in this.data.todoList){
        //     if(this.data.todoList[index].status==true){
        //     this.data.numberCheck++;
        //     }
        //   }
        //   }
        // },
        totalNumber(){
            this.data.numberCheck=0;
            for(let index in this.data.todoList){
              if(this.data.todoList[index].status==true){
              this.data.numberCheck++;
            }
            }
            return this.data.numberCheck
        }

    },
    watch: {
      getSearch() {
        this.onSearch();
      },
      // getTotal() {
      //   this.data.numberCheck=0;
      //   for(let index in this.data.todoList){
      //     if(this.data.todoList[index].status==true){
      //       this.data.numberCheck++;
      //     }
      //   }
      // },
    },
    created(){
      this.data.todoList=JSON.parse(localStorage.getItem('todolist'));
      // this.data.numberCheck=JSON.parse(localStorage.getItem('numberCheck'));
    },
    
}

</script>