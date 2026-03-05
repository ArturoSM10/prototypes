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

UI.prototype.mostrarSpinner = () => {
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';
    setTimeout(()=>{
        spinner.style.display = 'none';
    }, 3000);
}

UI.prototype.agregarInfoTabla = (total, seguro) => {
    const table = document.querySelector('.table');
    const tableBody = document.querySelector('.tbody');

    const filMarca = document.createElement('tr')
    const colMarca = document.createElement('td')
    colMarca.textContent = seguro.marca;
    filMarca.appendChild(colMarca);
    tableBody.appendChild(filMarca);

    const filYear = document.createElement('tr')
    const colYear = document.createElement('td')
    colYear.textContent = seguro.year;
    filYear.appendChild(colYear);
    tableBody.appendChild(filYear);

    const filTipo = document.createElement('tr')
    const colTipo = document.createElement('td')
    colTipo.textContent = seguro.tipo;
    filTipo.appendChild(colTipo);
    tableBody.appendChild(filTipo);

    const filTotal = document.createElement('tr')
    const colTotal = document.createElement('td')
    colTotal.textContent = total;
    filTotal.appendChild(colTotal);
    tableBody.appendChild(filTotal);

}

document.addEventListener('DOMContentLoaded', () =>{
    ui.agregarDatosYear();
    leerEventos();
});

function leerEventos() {
    const form = document.querySelector('.form');
    const marca = document.querySelector('#marca');
    const year = document.querySelector('#year');
    form.addEventListener('submit', e => {
        const tipo = document.querySelector('input[name="tipo"]:checked');
        e.preventDefault();
        if (marca.value === '' || year.value === '' || tipo.value === '') {
            ui.agregarAlerta('Todos los campos son obligatorios.', 'incorrecto');
            return;
        }
        ui.agregarAlerta('Cotizando...', 'correcto');
        ui.mostrarSpinner();
        const seguro = new Seguro(marca.value, year.value, tipo.value);
        const precioTotal = seguro.calcularPrecio();
        
        const table = document.querySelector('.table').style.display = 'table';
        ui.agregarInfoTabla(precioTotal, seguro);
    });
}