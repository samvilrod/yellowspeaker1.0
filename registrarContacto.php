<?php require_once('cn.php');
if(isset($_POST['nombre']) && ($_POST['email']) && ($_POST['mensaje']!="")) {
   //recibir los datos y almacenarlos en variables
   $nombre =$_POST["nombre"];
   $email =$_POST["email"];
   $mensaje =$_POST["mensaje"];

   $insertar = "INSERT INTO registrocontacto(nombre,email,mensaje) VALUES ('$nombre','$email','$mensaje')";

   //hacer una consulta para encontrar correos duplicados
   $verificar_correo = mysqli_query($conexion, "SELECT * FROM registrocontacto WHERE email = '$email'");

   if(mysqli_num_rows($verificar_correo) > 0){
      echo  '<script> alert("La direccion de correo electronico ya existe, prueba con otro!!");
            window.history.go(-1);
            </script>';
      exit;
      
   }
   //ejecutar consulta
   $resultado = mysqli_query($conexion, $insertar);
   if(!$resultado){
      echo '<script>alert("ERROR");    window.history.go(-1);   </script>';
   }else{  
      echo "<span style = 'color:green';>"."Gracias". $nombre." ". $email. "</span>";
      echo  '<script> alert("Gracias por registrate");   window.history.go(-1);
            </script>';
      exit;
   }
   mysqli_close($conexion);
   // if(!$resultado){
   //    echo 'Error al registrarse';
   // }else{
   //    echo ' <script> 
   //    alert("Hemos recibido tu mensaje, nos pondremos en contacto contigo!");
   //    window.history.go(-1);
   //    </script>';
   // }
   //Cerrar conexion
   // 
   
}
