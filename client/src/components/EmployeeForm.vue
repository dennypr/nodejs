<template>
<v-form v-model="valid">
    <v-container>
        <h1 class="text-center mb-10" v-if="registration">Registration Forms </h1>
        <h1 class="text-center mb-10" v-if="edit">Edit Forms </h1>
        <v-row>
            <v-col cols="5">
                <v-text-field v-model="editedItem.nama" label="Employee Fullname" :rules="nameRules">
                    
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="5">
                <v-select v-model="editedItem.gender" :items="GenderList" label="Gender" :rules="genderRules">

                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="5">
                <v-autocomplete v-model="editedItem.departement" :items="departementList" label="Departement" :rules="departementRules">

                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="5">
                <v-textarea outlined v-model="editedItem.amout" label="Amout Employee" :rules="amoutRules">

                </v-textarea>
            </v-col>
            <v-dialog v-model="dialog" width="500px">
                <v-card>
                    <v-card-title>
                        <p v-if="success && registration">Employee Registration Success!</p>
                         <p v-if="!success && registration ">Employee Registration Failed!</p>
                          <p v-if="success && edit">Edit Success!</p>
                          <p v-if="!success && edit">Edit Failed!</p>
                    </v-card-title>
                    <v-card-text>
                        <p v-if="success">You can check detail in employee table</p>
                          <p v-if="!success">Try Again</p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn v-if="edit" color="primary" @click.stop="dialog = !dialog"> Continue</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click.stop ="dialog = !dialog" 
                        color="primary" 
                        :to="'/'">OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <!------ -->
        <!-- <v-row>
            <v-col cols="8">
                <form enctype="multipart/form-data">
                <div class="field">
                <input type="file" ref="file" @change="selectFile()" />
                </div>
                <div class="field">
                <button class="btn-is-info">Send</button>
                </div>
            </form>
            </v-col>
        </v-row> -->

        <v-row>
            <v-spacer>

            </v-spacer>
            <v-col cols="8">
                <v-btn color="primary" @click.stop="save" :disabled="!valid">SAVE</v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-form>
</template>

<script>
import axios from 'axios'

export default {
    props : {
        registration:{
            type : Boolean,
            default : false
        },
        edit:{
             type : Boolean,
             default : false
        }
    },
    data(){
        return{
            employee : null,
            GenderList :["Male", "Female"],
            departementList : ["IT","HR","GA","Marketing","Akunting"],
            dialog : false,
            editedItem : {
                nama :'',
                gender :'',
                departement :'',
                amout :''
            },
            isOperationSuccess : false,
            valid : false,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                 v => (v && v.length >= 3) || 'Name must be more than 3 characters'
            ],
            genderRules: [
                v => !!v || 'Gender is required'
            ],
             departementRules: [
                v => !!v || 'Departement is required'
            ],
             amoutRules: [
                v => !!v || 'Amout is required'
            ]
        }
    },
    computed :{

        success(){
            return this.isOperationSuccess
        }
    },
    methods:{
      save(){
        if(this.registration){
            axios({
                method : 'post',
                url : 'http://localhost:2000/api/employees/',
                data : this.editedItem
            }).then(response=>{
                this.isOperationSuccess = true
                this.dialog = true
                console.log(response.data)

            }).catch(error =>{
                this.isOperationSuccess =false
                this.dialog = true
                console.log(error)
            })
            }
        if(this.edit){
            const id = this.$route.params.id
            axios({
                method : 'put',
                url : `http://localhost:2000/api/employees/${id}`,
                data : this.editedItem
            }).then(response=>{
                this.isOperationSuccess = true
                this.dialog = true
                console.log(response.data)

            }).catch(error =>{
                this.isOperationSuccess =false
                this.dialog = true
                console.log(error)
            })
        }
            
        }
    },
    created(){
        if(this.edit){
            axios.
                get(`http://localhost:2000/api/employees/4`)
                .then(response =>{
                 this.employee = response.data[0]   
                 this.editedItem = this.employee           
               
            }).catch(error=> console.log(error))
        }

        if(this.registration){
            this.registration = this.editedItem
        }
    }
}
</script>