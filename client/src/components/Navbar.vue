<template>
    <div>
        <v-app-bar dark >
        <v-app-bar-nav-icon @click.stop = "drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Employee Management</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer 
        v-model="drawer"
         absolute
         dark
         temporary>
         <v-list
         nav >
             <v-row justify="center" class="mt-5">
                 <v-col cols="7">
                     <v-avatar size="130">
                         <img src="/avr.png" alt="">
                     </v-avatar>
                 </v-col>
             </v-row>

             <v-row justify="center">
                 <v-col cols="7">
                     <p class="white--text">Denny Prayudi</p>
                 </v-col>
             </v-row>
             <v-list-item-group
             v-model="group">
                 <v-list-item v-for="(item, index) in items" :key="index" :to="item.route">  
                     <v-list-item-icon>
                         <v-icon v-text="item.icon">

                         </v-icon>
                     </v-list-item-icon>
                     <v-list-item-content>
                         <v-list-item-title v-text="item.title">

                         </v-list-item-title>
                     </v-list-item-content>
                 </v-list-item>
             </v-list-item-group>
         </v-list>
         
         </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            drawer : false,
            group : null,
            items : [
                {icon : 'mdi-book-search', title : 'List Employee', route : '/'},
                {icon : 'mdi-account-plus-outline', title : 'Register Employee', route : '/register-new-employee'}
            ]
        }
    },
    watch :{
        group(){
            this.drawer = false
        }
    }
}
</script>

