fetch("https://api-colombia.com/api/v1/airport")
.then(response => {
    if (!response.ok) {
        throw new Error("Error al consumir la API");
    }
    return response.json();
})
.then(data => {

    const conteo = {};

    data.forEach(aeropuerto => {
        // Acceder al departamento
        const dpmnto = aeropuerto.department?.name || "Desconocido";
        conteo[dpmnto] = (conteo[dpmnto] || 0) + 1;
    });

    // Array
    const resultado = Object.entries(conteo)
        .map(([dpmnto, cantidad]) => ({ dpmnto, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad);

    // Definir los ejes X y Y
    const dpmntos = resultado.map(r => r.dpmnto);
    const cantidades = resultado.map(r => r.cantidad);

    // Plotly
    const trace = {
        labels: dpmntos,
        values: cantidades,
        type: "pie"
    };

    const layout = {
        title: "Top 10 Departamentos con más aeropuertos",
        xaxis: { title: "Departamento" },
        yaxis: { title: "Cantidad de aeropuertos" }
    };

    Plotly.newPlot("grafica", [trace], layout);

})
.catch(error => {
    console.error(error);
    document.getElementById("grafica").innerHTML =
        "<p>Error cargando datos</p>";
});