 <template>
    <!-- <transition name="fade"> -->
         <router-view></router-view>
    <!-- </transition>     -->
 </template>
 <script>
 	
 </script>
 <style>
  .fade-enter-active, .fade-leave-active{
    transition: all 0.5s;     
  }
  
  .fade-enter, .fade-leave{
      opacity: 0;
  }
  
 </style>


