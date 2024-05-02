global using Microsoft.AspNetCore.Components;
global using System.Text.Json.Serialization;

using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

await builder.Build().RunAsync();
