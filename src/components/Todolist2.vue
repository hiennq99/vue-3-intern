<template>
<div class="flex">
    <div class="flex">
      <draggable 
          v-model="data.list"
          group="people" 
          @start="drag=true" 
          @end="drag=false" 
          item-key="title"
          tag="transition-group"
          >
          
          <template #item="{element}">
            <div>
              <div class="w-60 bg-gray-200 mx-2 py-2 px-1 mb-3 rounded">
              <div class="font-bold m-2">{{element.title}}</div>
              <draggable 
              v-model="element.array"
              group="people" 
              @start="drag=true" 
              @end="drag=false" 
              item-key="name">
              <template #item="{element}">
                <div>
                  <div class="bg-white m-2 rounded flex justify-between p-2 shadow-md" @click="onEdit(element)">
                      <div class="">
                        <div>{{element.name}}</div>
                        <div v-if="element.content!=null">
                          <!-- <img src="./stream-solid.svg" alt=""> -->
                          |||
                        </div>
                      </div>
                      <div><button>Sửa</button></div>
                  </div>
                </div>
              </template>
              </draggable>
              <div class="mx-2"><button @click="onClickAddCard(element)">+Add another card</button></div>
              </div>
            </div>
          </template>
      </draggable>
    </div>
    <!-- todo -->
    
    
    <!-- add list -->
    <div>
      <div class="w-60 bg-gray-500 bg-opacity-20 px-2 py-2 mx-2">
        <button class="" v-if="data.addListBlock==true" @click="onAddListBlock()">+Add an another list</button>
        <div v-if="data.addListBlock==false">
          <input type="text" placeholder="Enter list title" v-model="data.title">
          <button class="mx-2" @click="onAddList()">Add list</button>
          <button @click="onCloseAddListBlock()">	&times;</button>
        </div>
      </div>
    </div>
</div>
<!-- add card -->
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
            <button @click="onAdd(data.currentList)" class="btn-add mb-2">Add</button>
            <button @click="onClickAddOne(data.currentList)" class="btn-add">AddOne</button>
            </div>
          </div>
          
          </label>
      </div>
      <!-- edit card -->
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
      <div v-if="data.add==true" @click="onClickClose" class="fixed bg-gray-200 bg-opacity-60 top-0 left-0 right-0 bottom-0">
    </div>
    <button @click="$emit('text')"></button>
</template>
<script>
import { reactive } from '@vue/reactivity'
import Todolist from './Todolist.vue'
import draggable from 'vuedraggable'
export default {
    components:{
        Todolist,
        draggable,
    },
    emits:{
      click(){
        console.log('click');
      }
    },
    setup(){

        const data=reactive({
        currentList:'',
        array:[1,1,11,1,1,],
        title:null,
        add:null,
        name:null,
        item:null,
        content:null,
        indexEdit:null,
        element:null, 
        addListBlock:true,
        list:[
          // {
          //   title:'todo',
          //   array:[{
          //     name:'a',
          //     content:'',
          //   },
          //   {
          //     name:'b',
          //     content:'content2'
          //   }]
          // },
          // {
          //   title:'doing',
          //   array:[{
          //     name:'c',
          //     content:'',
          //   },
          //   {
          //     name:'d',
          //     content:'content2'
          //   }]
          // },
        ],
        });
        return {
            data,
        }
    },
    methods: {
      onCloseAddListBlock(){
        this.data.addListBlock=true;
      },
      onAddListBlock(){
        this.data.addListBlock=false;
      },
      onAddList(){
        let test=true;
        for(let index in this.data.list){
          if(this.data.list[index].title===this.data.title){
            test=false;
          }
        }
        if(this.data.title!=null&&test===true){
          this.list.push({
            title:this.data.title,
            array:[
              
            ],
          })
          this.$toast.success(`Thêm thành công`); 
          this.data.title=null;
        }
        localStorage.setItem('list',JSON.stringify(this.data.list));
      },
      log(){
        console.log(this.data.list)
      },
      onAdd(currentList){
        let test=true;
        for(let index in currentList.array){
          if(currentList.array[index].name===this.data.name){
            test=false;
          } 
        }
        if(this.data.name!=null&&test===true){
          currentList.array.push({
            name:this.data.name,
            content:this.data.content,
          })
          this.$toast.success(`Thêm thành công`); 
          this.data.name=null;
          this.data.content=null;
        }
        localStorage.setItem('list',JSON.stringify(this.data.list));
      },
      onClickAddCard(item){
        this.data.currentList=item;
        this.data.add=true;
        
      },
      onClickAddOne(currentList){
        this.onAdd(currentList);
        this.data.add=false;
      },
      onClickClose(){
        this.data.add=false;
        this.data.edit=false;
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
      onEdit(element){
        this.data.element=element;
        console.log(element);
        this.data.edit=true;
        this.data.name=element.name;
        this.data.content=element.content;
      },
      onSave(){
        this.data.element.name=this.data.name;
        this.data.element.content=this.data.content;
        this.data.edit=false;this.data.add=false;
        localStorage.setItem('list',JSON.stringify(this.data.list))
        this.$toast.success(`Sửa thành công`);
      },
    },
    computed:{
      list(){
        return this.data.list;
      },
    },
    watch: {
      list:{
        handler(){
          localStorage.setItem('list',JSON.stringify(this.data.list));
          
        },
        deep:true
      },
    },
    created(){
      // localStorage.setItem('list',JSON.stringify(this.data.list));
      this.data.list=JSON.parse(localStorage.getItem('list'))||[];
    },
}
</script>