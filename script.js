$(function() {
    //Escuchar el formulario mensaje para eventos de tipo submit
    $('#formulario-mensaje').submit(function(event){
        event.preventDefault();

        //puedes usar la function desde aqui dentro: validarContacto
        var isValid = validarContacto()//la function nos retornara true o false (false si es que no es valido)
        
        if (isValid == false) {
        	return; //si es invalido entonces solo damos return, esto sirve para detener la ejecucion, asi ya no se enviaria el ajax
        }

        var resultado = document.getElementById("info");

        //Aqui mismo puedes meter la function que tienes en validarContacto.js
        function validarContacto(){        
        
            var xmlhttp;

            if(window.XMLHttpRequest){
                xmlhttp = new XMLHttpRequest();
            }else{
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
    	//NOTA 1: Siempre agregale el .trim() al final, porque eso quita los espacios en blanco
    	//NOTA 2: Siempre que puedas, declara asi las variables, si ves solamente dice "var" una sola vez, al final de cada linea hay una coma ","
        //de esta manera declare todas esas como var pero en lugar de escribir varias veces "var" solamente las separe por comas, eso es mas optimizado.
        var nombre = document.getElementById("nombre").value.trim(),
        	email = document.getElementById("email").value.trim(),
        	mensaje = document.getElementById("mensaje").value.trim(),        
        	expresionRegular = /\w+@\w+\.+[a-z]/,
            expresionNombre = /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/,
            informacionDelUsuario = "nombre=" + nombre + "&email=" + email + "&mensaje=" + mensaje;

        
    	//Para que entiendas por que es optimizado, supongamos que te mandan a la tienda:
    	//var huevos = 2; y vas a la tienda por huevos
    	//var frijoles = 3; ya habias regresado de la tienda pero te volvieron a mandar ahora por frijoles
    	//var leche = 1; de nuevo ya habias vuelto de la tienda pero te volvieron a mandar ahora por leche...
    	//pero, si te dicen: var huevos = 2, friholes = 3, leche = 1; entonces irias a la tienda una sola vez por esas 3 cosas de golpe y eso seria mas optimo que ir 3 veces a la tienda
        
        xmlhttp.onreaadystatechange=function(){
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                resultado.innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST", "registrarContacto.php", true);
        xmlhttp.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
        xmlhttp.send(informacionDelUsuario);

        $.ajax( {
            type: 'post',
            url: 'registrarContacto.php',
            data: ('nombre='+nombre+'&email='+email+'&mensaje='+mensaje),
            cache: false,
            success: function(respuesta) {
                if(respuesta==1){
                    $('#info').html('Tu mensaje se ha enviado correctamente');
                    
                }
                else{
                    $('#info').html('Tu mensaje no se ha enviado');
                }
                
                
                //no recargues la pagina completa, la idea es que limpies el formulario directamente con JS
                //la manera mas facil es asi:
                
            }
        })
        //ESTA PARTE DEL DONE ES LO MISMO QUE SUCCESS
        .done(function(){
            console.log("success");
            
        })
        .fail(function(){
            console.log("error");
        })

          //aqui se supone que el back te contesta que ya completo el request...
                //asi que aqui puedes meter todo el codigo que necesites... puedes limpiar el formulario

            if(nombre === "" || email === "" || mensaje === ""){
                    alert("Todos los campos son obligatorios");
                    return false;
            }else if(nombre.length>100){
                    alert("El nombre es muy largo, intenta con uno mas corto.");
                    return false;
            
            }else if(email.length>100){
                    alert("El correo es muy largo.")
                    return false;
            
            }
                //mensaje no mas de 280
            else if(mensaje.length>280){
                    alert("Tu mensaje es demasiado largo.");
                    return false;
            }
                //validar correo electronico
            else if(!expresionRegular.test(email)){
            
                    alert("El correo no es valido");
                    return false;
            
            }
                //validar nombre
            else if(!expresionNombre.test(nombre)){
            
                    alert("El nombre no es valido");
                    return false;
            
            } else {
                    //Si llegamos a este punto quiere decir que todo fue valido
                    $('#formulario-mensaje').trigger('reset'); //esto limpiara el formulario
                    return true;
            }
        } 
    });
});