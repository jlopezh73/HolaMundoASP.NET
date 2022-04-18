using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("[Controller]")]
public class OpsController : ControllerBase {

    public class DatosOperacion {
        public double op1 {get; set;}
        public double op2 {get; set;}
        public double operador {get; set;}
    }

    [HttpPost]    
    public double Operacion([FromForm]double op1,  [FromForm]double op2,  [FromForm]int operador) {
        double resultado=0;
        if (operador.Equals(1))
            resultado = op1 + op2;
        else if (operador.Equals(2))
            resultado = op1 - op2;
        else if (operador.Equals(3))
            resultado = op1 * op2;
        else if (operador.Equals(4))
            if (op2 != 0)
                resultado = op1 / op2;
                
        /*if (datos.operador.Equals(1))
            resultado = datos.op1 + datos.op2;
        else if (datos.operador.Equals(2))
            resultado = datos.op1 - datos.op2;
        else if (datos.operador.Equals(3))
            resultado = datos.op1 * datos.op2;
        else if (datos.operador.Equals(4))
            if (datos.op2 != 0)
                resultado = datos.op1 / datos.op2;*/
        return resultado;
    }
}