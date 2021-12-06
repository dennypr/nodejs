<template>
 <v-container>
   <v-row>
       <v-col cols="4">  
           <v-text-field 
           v-model="search"
        append-icon="mdi-magnify" 
        label="Search Employees...">

        </v-text-field>
       </v-col>
   </v-row>
        
        <v-row>
            <v-col>
                <v-data-table 
                :headers="headers"
                :items="employees"
                :search="search">   
                <template v-slot:top>
                    <v-dialog v-model="dialogDelete" max-width="500px">  
                    <v-card>
                        <v-card-title>Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="closeDelete">cancel</v-btn>
                            <v-btn color="primary" @click="deleteItemConfirm">ok</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>   
                </template>      

                <template v-slot:[`item.nama`]="{ item }">
                    <router-link :to="`/details/${item.id}/${linkNeated(item.nama)}`">
                    {{ item.nama }}                     
                    </router-link>
                    
               </template>

               <template v-slot:[`item.Actions`]="{ item }">
                <router-link style="text-decoration:none;" :to="`/edit/${item.id}/${linkNeated(item.nama)}`">
                 <v-icon
                    small
                    class="mr-2"
                    
                >
                    mdi-pencil
                </v-icon>
                </router-link>
                
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
               </template>
                </v-data-table>
            </v-col>
        </v-row>
    
 </v-container>
    
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            search : '',
            selectedItemIndex : -1,
            dialogDelete : false,
            headers : [
                    {text :'ID', value : 'id'},
                    {text :'Nama', value : 'nama'},
                    {text :'Departement', value : 'departement'},
                    {text :'Actions', value : 'Actions'}
            ],
            employees :[
                // {"id" : 1,
                //  "nama" : "Denny Prayudi",
                //  "gender" : "Male",
                //  "departement" : "IT",
                //  "amout" : "10 years"},
                //  {"id" : 2,
                //  "nama" : "Antonio",
                //  "gender" : "Male",
                //  "departement" : "FE",
                //  "amout" : "10 years"}
            ]
        }
    },
    methods :{
        linkNeated(link){

            return link.replace(/\s+/g, '-').toLocaleLowerCase()

        },
        closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      deleteItem (item) {
        this.selectedItemIndex = this.employees.indexOf(item)       
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        const deleteEmployee = this.employees[this.selectedItemIndex]
        axios.
            delete(`http://localhost:2000/api/employees/${deleteEmployee.id}`)
            .then(response =>{
                 this.employees.splice(this.selectedItemIndex, 1)
                 this.closeDelete()
                console.log(response.data)
            }).catch(error=> console.log(error))
      
      }
    },
    mounted(){
        axios.
            get('http://localhost:2000/api/employees/')
            .then(response =>{
                this.employees = response.data
                console.log(response.data)
            }).catch(error=> console.log(error))
    }

    
}
</script>