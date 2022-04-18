var urlServidor = "https://localhost:7044";



function descargarDatos(tablaAlumnos) {
    /*$.getJSON("https://localhost:7044/Alumnos", function(data){
        alumnos = data;
        cargarDatosTabla(alumnos);
    });*/

    fetch(urlServidor+"/DatosAlumnos")
    .then(response => {        
        return response.json();
    })
    .then(data => {
        alumnos = data;
        cargarDatosTabla(alumnos, tablaAlumnos);
        
    })
}

function cargarDatosTabla(listaAlumnos, tablaAlumnos) {   
                         
    $.each(listaAlumnos, function (i, alumno) {                  
        cad ="<a href=# onclick='eliminarAlumno(\""+alumno.matricula+"\");'><i <i class='fa-solid fa-trash'></i></i></a>";
        var alumnom = {"matricula": alumno.matricula, "nombre": alumno.nombre, "sexo": alumno.sexo, "eliminar": cad};
        
        tablaAlumnos.row.add(alumnom).draw();      
        tablaAlumnos.row.add(alumnom).draw();      
        tablaAlumnos.row.add(alumnom).draw();      
        tablaAlumnos.row.add(alumnom).draw();      
        tablaAlumnos.row.add(alumnom).draw();      
        /*agregarAlumnoTabla(alumno.matricula, 
                           alumno.nombre, 
                           alumno.sexo, 
                           "/Images/"+alumno.matricula+".jpg");*/
    });
}

function agregarAlumnoTabla(smatricula, snombre, ssexo, simagen) {
    if (smatricula === "")
        smatricula = "__";
    $("#tablaAlumnos").find("tbody")
        .append($("<tr>")
            .append($("<td>").html("<a href='"+simagen+"'><img src='"+simagen+"' height='100px'></a>"))
                .append($("<td>").html("<a href=# onclick='cargarDatosAlumno(\""+smatricula+"\");'>"+smatricula+"</a>"))
            .append($("<td>").html(snombre))
            .append($("<td class='text_centrado'>").html(ssexo))
            .append($("<td>").html("<a href=# onclick='eliminarAlumno(\""+smatricula+"\");'><i <i class='fa-solid fa-trash'></i></i></a>"))
        );
}

function calcularPromedio() {
    var calificaciones = [8.5, 9.2, 9.5, 6.3];
    var suma = 0;
    for(var i=0;i<4; i++)
      suma += calificaciones[i];
    var promedio = suma / 4;
    $("#spromedio").html(promedio);                
    //$("#dialogoAgregar").modal("show");
    //alert("El promedio de las calificaciones es "+promedio);
}

var modificarAlumno=false;
function cargarDatosAlumno(matricula) {
    modificarAlumno = true;
    $.ajax({
        method: "GET",
        url: urlServidor+"/Alumnos/matricula/"+matricula,    
        cache: false,                                                                        
        processData: false,
        contentType: false,                        
        data: null                  
        }).done(function(data) {
            var fecha = data.fechaNacimiento;
            if (fecha != null && fecha != "") {
                fecha = fecha.substring(0,10);
            }
            $('#dialogoAgregar').modal('show');                            
            $("#matricula").val(data.matricula);
            $("#nombre").val(data.nombre);    
            $("#domicilio").val(data.domicilio);    
            $("#fechaNacimiento").val(fecha);    
            $("#sexo").val(data.sexo);    
        });
}

var matriculaAEliminar="";
function eliminarAlumno(matricula) {
    matriculaAEliminar = matricula;
    $("#nombreAlumno").html(matricula);
    $("#dialogoEliminar").modal("show");
}

function eliminarAlumnoAjax() {
    $.ajax({
        method: "DELETE",
        url: urlServidor+"/Alumnos/"+matriculaAEliminar,    
        cache: false,                                                                        
        processData: false,
        contentType: false,                        
        data: null                  
        }).done(function(data) {
            if (data.correcto) {
                alert("El alumno ha sido eliminado de manera correcta");                
                
                $("#dialogoEliminar").modal("hide");
            } else {
                alert(data.mensaje);
            }
    });
}

function agregarAlumno() {

    var smatricula = $("#matricula").val();
    var snombre = $("#nombre").val();
    var sdomicilio = $("#domicilio").val();
    var sfechaNacimiento = $("#fechaNacimiento").val();
    var ssexo = $("#sexo").val();
        
    var alumno = {
        "matricula": smatricula,
        "nombre": snombre,
        "sexo": ssexo,
        "domicilio": sdomicilio,
        "fechaNacimiento": sfechaNacimiento,
        "foto": "/images/anonimo.jpg"
    };
              
    
    if (!modificarAlumno) {
         $.ajax({
            method: "POST",
            url: urlServidor+"/Alumnos",    
            cache: false,                                                                        
            processData: false,
            contentType: "application/json",                        
            data: JSON.stringify(alumno)                  
            }).done(function(data) {
                if (data.correcto) {
                    alert("El alumno ha sido almacenado de manera correcta");
                    alumnos.push(alumno);
                    console.log(alumnos);

                    agregarAlumnoTabla(smatricula, snombre, ssexo, '/images/anonimo.jpg');
                    $("#matricula").val("");
                    $("#nombre").val("");    
                    $("#dialogoAgregar").modal("hide");
                } else {
                    alert(data.mensaje);
                }
        });
    } else {
        $.ajax({
            method: "PUT",
            url: urlServidor+"/Alumnos",    
            cache: false,                                                                        
            processData: false,
            contentType: "application/json",                        
            data: JSON.stringify(alumno)                  
            }).done(function(data) {
                if (data.correcto) {
                    alert("El alumno ha sido modificado de manera correcta");
                    alumnos.push(alumno);
                    console.log(alumnos);

                    //agregarAlumnoTabla(smatricula, snombre, ssexo, '/images/anonimo.jpg');
                    $("#matricula").val("");
                    $("#nombre").val("");    
                    $("#dialogoAgregar").modal("hide");
                } else {
                    alert(data.mensaje);
                }
        });
    }
    modificarAlumno = false;
}