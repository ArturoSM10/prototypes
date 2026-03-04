function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
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
        option.value = year - 1;
        optionYear.appendChild(option);
    }
};
document.addEventListener('DOMContentLoaded', () =>{
    ui.agregarDatosYear();
});