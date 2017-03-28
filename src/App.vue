 <template>
    <transition name="fade">
        <router-view></router-view>
    </transition>    
 </template>
 <script>
 	
 </script>
 <style>
  .fade-enter-active, .fade-leave-active{
    transition: all 0.4s;     
  }
  
  .fade-enter, .fade-leave-active{
  	/*transform: rotateY(90deg);*/
    opacity: 0;
  }
  
 </style>


