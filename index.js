let currid=0;
  function limpiar(){
    document.getElementById('nombre').value='';
    document.getElementById('categoria').value='' ;
    document.getElementById('fecha').value='';
  }

  document.querySelector('#cancelar').addEventListener('click',function(){
      limpiar();      
   })

document.querySelector('#guardar').addEventListener('click',function(){
    const evento = new Array();
  
    const nombre= document.getElementById('nombre').value;
    const categoria= document.getElementById('categoria').value ;
    const fecha= document.getElementById('fecha').value;
    
    evento[0]=nombre;
    evento[1]=categoria;
    evento[2]=fecha;

    guardar(evento);
    limpiar();      
 })

function guardar(evento) {
    let n=0;
    let objeto = {};

    if (evento[0]!=="" && evento[1] !== "" && evento[2]!==""){
      n=neventos();
      
      if (currid==0){
        if (n==0){
          n=1;
        }
        else{
          n+=1;
        }
        window.localStorage.setItem(0,n)
      }  
      else {
        n=currid;
      }

      objeto.datos = evento;
      window.localStorage.setItem(n,JSON.stringify(objeto))
 
      currid=0;
      location.reload()
    }
}

function neventos() {
    let n=0;
    
    n=Number(window.localStorage.getItem(0))
  return n
}

function editar(ev){
  let id = ev.target.getAttribute('data-id')

  evento = window.localStorage.getItem(id)
  let data = JSON.parse(evento)
  
  document.getElementById('nombre').value = data.datos[0];
  document.getElementById('categoria').value = data.datos[1];
  document.getElementById('fecha').value = data.datos[2];
  currid=Number(id)
  
  console.log(currid);
}


function eliminar(ev){

  let id = ev.target.getAttribute('data-id')
  window.localStorage.removeItem(id) 
  currid=0;
  location.reload()
}


function muestrarenglon(evento, id) {
    let renglon = '<tr>'+
                    '<td>'+ evento.datos[0] + '</td>' +
                    '<td>'+ evento.datos[1] + '</td>' +
                    '<td>'+ evento.datos[2] + '</td>' +
                    '<td>  <a class="editar btn btn-info" type="submit" value="" data-id=' + id + '>Editar</a></td>' +
                    '<td>  <a class="eliminar btn btn-danger" type="submit" value="" data-id=' + id + '>Eliminar</a></td>' +
                  '</tr>';
    return renglon;
}

let tabla = '<table class="table table-striped">';
tabla += '<th scope="col">Nombre</th>';
tabla += '<th scope="col">Categoria</th>';
tabla += '<th scope="col">Fecha</th>';
tabla += '<th scope="col">Editar</th>';
tabla += '<th scope="col">Eliminar</th>';


const container = document.querySelector('section[class="section"]')
let evento = '';
n=neventos();
if (n!==0){
  for (let i = 1; i <= n; i++) {
      evento = window.localStorage.getItem(i)
      let data = JSON.parse(evento)
      console.log(data)

      if (data !== null){
        tabla += muestrarenglon(data, i);   
      }
    }
}

container.innerHTML = container.innerHTML + tabla

document.querySelectorAll('.editar').forEach((element) => {
  element.addEventListener('click', editar)
})
document.querySelectorAll('.eliminar').forEach((element) => {
  element.addEventListener('click', eliminar)
})