using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;


namespace  HolaMundoASP.NET.Pages;

public class AlumnosServidorModel : PageModel {

    public partial class Alumno
    {
        public int ID { get; set; }
        public string? Matricula { get; set; }
        public string? Nombre { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }
        public string? Domicilio { get; set; }
    }

    public async Task OnGet() {      
        var listAlumnos = new List<Alumno>();

        try {   
            var handler = new HttpClientHandler() 
            { 
                ServerCertificateCustomValidationCallback = 
                HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };      
            HttpClient cliente = new HttpClient(handler);
            cliente.BaseAddress = new Uri("https://localhost:7044/");
            cliente.DefaultRequestHeaders.Accept.Clear();
            cliente.DefaultRequestHeaders.Accept
                    .Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage respuesta = await cliente.GetAsync("Alumnos");
            if (respuesta.IsSuccessStatusCode) {            
                listAlumnos = await respuesta.Content.ReadAsAsync<List<Alumno>>();     
            }
        } catch (Exception e) {

        }
        ViewData["listaAlumnos"] = listAlumnos;
        //ViewData["mensaje"] = $"Hoy es {DateTime.Now.ToShortDateString()} {DateTime.Now.ToShortTimeString()} {DateTime.Now.Second}";
    }
}