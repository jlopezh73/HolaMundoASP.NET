using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace  HolaMundoASP.NET.Pages;

public class OperacionesModel : PageModel {
    [BindProperty]
    public Operacion operacion {get; set;}        

    public class Operacion {
        public double op1 {get; set;}
        public double op2 {get; set;}        
        public String operador {get; set;}
        public double resultado {get; set;}
    }

    public void OnGet() {        
        ViewData["mensaje"] = $"Hoy es {DateTime.Now.ToShortDateString()} {DateTime.Now.ToShortTimeString()} {DateTime.Now.Second}";
        HttpClient cliente = new HttpClient();
    }

    public void OnPost() {
        /*double op1 = 0;
        Double.TryParse(Request.Form["op1"], out op1);
        double op2 = 0;
        Double.TryParse(Request.Form["op2"], out op2);
        double resultado = 0;
        var operador = Request.Form["operador"];*/

        if (operacion.operador.Equals("1"))
            operacion.resultado = operacion.op1 + operacion.op2;
        else if (operacion.operador.Equals("2"))
            operacion.resultado = operacion.op1 - operacion.op2;
        else if (operacion.operador.Equals("3"))
            operacion.resultado = operacion.op1 * operacion.op2;
        else if (operacion.operador.Equals("4"))
            if (operacion.op2 != 0)
                operacion.resultado = operacion.op1 / operacion.op2;
        //ViewData["resultado"] = resultado;
        ViewData["mensaje"] = $"El día de hoy es {DateTime.Now.ToShortDateString()} {DateTime.Now.ToShortTimeString()} {DateTime.Now.Second}";
    }
    
}