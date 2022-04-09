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
    const ev = new Array();
    const nombre= document.getElementById('nombre').value;
    const categoria= document.getElementById('categoria').value ;
    const fecha= document.getElementById('fecha').value;
    ev[0]=nombre;
    ev[1]=categoria;
    ev[2]=fecha;
    guardar(ev);
    limpiar();      
 })

function guardar(ev) {
    let n=0;
    let objeto = {};

    if (ev[0]!=="" && ev[1] !== "" && ev[2]!==""){
      n=evts();
      
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

      objeto.data = ev;
      window.localStorage.setItem(n,JSON.stringify(objeto))
 
      currid=0;
      location.reload()
    }
}

function evts() {
    let n=0;
    
    n=Number(window.localStorage.getItem(0))
  return n
}

function editar(ev){
  let id = ev.target.getAttribute('data-id')

  ev = window.localStorage.getItem(id)
  let data = JSON.parse(ev)
  
  document.getElementById('nombre').value = data.data[0];
  document.getElementById('categoria').value = data.data[1];
  document.getElementById('fecha').value = data.data[2];
  currid=Number(id)
}

function eliminar(ev){
  let id = ev.target.getAttribute('data-id')
  window.localStorage.removeItem(id) 
  currid=0;
  location.reload()
}

function viewfila(ev, id) {
    let fila = '<tr>'+
                    '<td>'+ ev.data[0] + '</td>' +
                    '<td>'+ ev.data[1] + '</td>' +
                    '<td>'+ ev.data[2] + '</td>' +
                    '<td>  <a class="editar btn btn-info" type="submit" value="" data-id=' + id + '>Editar</a></td>' +
                    '<td>  <a class="eliminar btn btn-danger" type="submit" value="" data-id=' + id + '>Eliminar</a></td>' +
                  '</tr>';
    return fila;
}

let tabla = '<table class="table table-striped">';
tabla += '<th scope="col">Nombre</th>';
tabla += '<th scope="col">Categoria</th>';
tabla += '<th scope="col">Fecha</th>';
tabla += '<th scope="col">Editar</th>';
tabla += '<th scope="col">Eliminar</th>';

const container = document.querySelector('section[class="section"]')
let ev = '';
n=evts();
if (n!==0){
  for (let i = 1; i <= n; i++) {
      ev = window.localStorage.getItem(i)
      let data = JSON.parse(ev)
      console.log(data)

      if (data !== null){
        tabla += viewfila(data, i);   
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