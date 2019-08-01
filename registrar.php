<?php require_once('cn.php');
//include 'cn.php';//incluir la conexion a la base de datos
 //recibir datos y alamacenar en variables
 $correo = $_POST["correo"];
  //consulta para insertar
 $insertar = "INSERT INTO usuarios(correo) VALUES('$correo')";

 //hacer una consulta para encontrar usuarios duplicados
 $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo = '$correo'");

 if(mysqli_num_rows($verificar_correo) > 0){
    echo  '<script> 
          alert("La direccion de correo electronico ya existe, prueba con otro!");
          window.history.go(-1);
          </script>';
    exit;
   
 }
 //ejecutar consultas y en donde
 $resultado = mysqli_query($conexion, $insertar);
if(!$resultado){
   echo '<script>alert("ERROR");window.history.go(-1);</script>';
}else{
   echo "<span style = 'color:green'>"."Gracias". $correo. "</span>";
   echo  '<script> alert("Gracias por registrate"); window.history.go(-1);
         </script>';
   exit;
   
}
mysqli_close($conexion);


 //ejecutar consultas y en donde
//  $resultado = mysqli_query($conexion, $insertar);
//  if(!$resultado){
//     echo 'Error al registrarse';
//  }else{
//     echo 'Gracias por registrarte! Recibiras mas informacion en tu correo.';
//  }
//     //Cerrar conexion
// mysqli_close($conexion);





    // require_once('cn.php');
    // $email = $_POST['email'];

    // $sql1 = "SELECT * FROM usuarios_boletin_noticias WHERE email = '$email'";
    // $resultado = $conn->query($sql1);
    // $fila = mysqli_num_rows($resultado);

    // if($fila==0){
    //     $sql = "INSERT into usuarios_boletin_noticias(email) values('$email')";
    //     $insert = $conn->query($sql) or die(mysqli_errno());
    //     echo 1;
    // }else{
    //     echo 0;
    // }
