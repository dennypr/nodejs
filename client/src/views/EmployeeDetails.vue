<template>
<div v-if="employee" class="ml-5">

    <h1> Employee Detail </h1>
    <p>Nama : {{ employee.nama }}</p>
     <p>Gender : {{ employee.gender }}</p>
      <p>Departement : {{ employee.departement }}</p>
       <p>Amout : {{ employee.amout }}</p>
</div>
    
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            employee : null
        }
    },
    methods :{
        fetchData(){
            axios.
                get(`http://localhost:2000/api/employees/${this.$route.params.id}`)
                .then(response =>{
                 this.employee = response.data[0]              
               
            }).catch(error=> console.log(error))
      
        }
    },

    created(){
        this.fetchData()
    }
}
</script>

