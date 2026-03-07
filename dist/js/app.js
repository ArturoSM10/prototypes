function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.calcularPrecio = function() {
    const tablaMarca = {
        americano: 1.15,
        asiatico: 1.05,
        europeo: 1.35
    };

    const tablaTipo = {
        basico: 30,
        completo: 50
    };

    const yearDiferencia = ((new Date().getFullYear() - this.year) * 3)/100;
    const base = 2000;
    const costoMarca = base * tablaMarca[this.marca];
    const costoTipo = costoMarca + (costoMarca* (tablaTipo[this.tipo] / 100));
    const costoYear = costoTipo - (costoTipo * yearDiferencia);

    const costoFinal = costoYear;
    return costoFinal;
}

function UI() {}
const ui = new UI();

UI.prototype.agregarDatosYear = () =>{
    const optionYear = document.querySelector(`#year`);
    const year = new Date().getFullYear()
    const max = 20; 

    for (let i=0; i<max; i++) {
        const option = document.createElement(`option`);
        option.textContent = year - i;
        option.value = year - i;
        optionYear.appendChild(option);
    }
};

UI.prototype.agregarAlerta = function(texto, tipo) {
    const existe = document.querySelector('.alert');
    if(existe) {
        existe.remove();
    };
    const info = document.querySelector('.info');
    const etiquetaP = document.createElement('P');
    etiquetaP.textContent = texto;
    etiquetaP.classList.add(`alert`, `${tipo}`);
    info.appendChild(etiquetaP);
    setTimeout(()=>{
        etiquetaP.remove();
    }, 3000);
};

UI.prototype.crearTabla = function(texto, dato) {
    const tableBody = document.querySelector('.tbody');

    const fila = document.createElement('tr');
    const span = document.createElement('span');
    const col = document.createElement('td');

    span.textContent = dato;
    col.textContent = texto;
    col.appendChild(span);
    fila.appendChild(col);
    tableBody.appendChild(fila);
}

UI.prototype.agregarInfoTabla = function(total, seguro) {
    const infoTabla = {
        Marca: seguro.marca,
        Año: seguro.year,
        Tipo: seguro.tipo,
        Total: `$${total}`
    };

    for (const key in infoTabla) {
        this.crearTabla(`${key}: `, infoTabla[key]);
    }
}

UI.prototype.limpiarTabla = (element) => {
    while(element.firstChild) {
        element.firstChild.remove();
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    ui.agregarDatosYear();
    leerEventos();
});

function leerEventos() {
    const form = document.querySelector('.form');
    form.addEventListener('submit', manejarSubmit);
}

function manejarSubmit(e) {
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    e.preventDefault();
    if (marca=== '' || year=== '' || tipo === '') {
        ui.agregarAlerta('Todos los campos son obligatorios.', 'incorrecto');
        return;
    }

    limpiarResultado();

    const seguro = new Seguro(marca, year, tipo);
    const precioTotal = seguro.calcularPrecio();

    mostrarResumen (precioTotal, seguro);
}

function limpiarResultado() {
    const table = document.querySelector('.table');
    const tBody = document.querySelector('.tbody');
    if (table.style.display === 'table') {
        table.style.display = 'none';
    }
    ui.limpiarTabla(tBody);
}

function mostrarResumen (precioTotal, seguro) {
    ui.agregarAlerta('Cotizando...', 'correcto');

    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';
    
    setTimeout(()=>{
        spinner.style.display = 'none';

        const table = document.querySelector('.table').style.display = 'table';
        ui.agregarInfoTabla(precioTotal, seguro);
    }, 3000);
}