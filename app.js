const buscarGatinhos = (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=10');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const cats = JSON.parse(xhr.responseText);
                cats.forEach(cat => {
                    const id = document.createElement('p');
                    id.textContent = `ID: ${cat.id}, Width: ${cat.width}, Height: ${cat.height}`;
                    
                    const container = document.createElement('div');
                    container.classList.add('container');
                    container.appendChild(id);

                    const img = document.createElement('img');
                    img.src = cat.url;
                    document.querySelector('#gatinhos').appendChild(container);
                    container.appendChild(img);
                });
            } else {
                alert('Erro na requisição');
            }
        }
    };
    xhr.send();
};

const btnMostrar = document.querySelector("#mostrar-gatinhos");
btnMostrar.addEventListener("click", buscarGatinhos);

const getMarcas = () => {
    const tarefas = fetch('https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/data.json')

    tarefas
    .then(resposta => resposta.json())
    .then(marcas => {
        const ul = document.createElement('ul')
        marcas.forEach(marca => {
            const li = document.createElement('li')
            const logo = document.createElement('img')
            const name = document.createElement('p')
            name.textContent = marca.name
            logo.src = marca.image?.optimized
            li.appendChild(logo)
            li.appendChild(name)
            ul.appendChild(li)
            console.log(marca)
        })
        document.body.appendChild(ul)
    })
    .catch(erro => console.log(erro))
}
const btnMarcas = document.querySelector("#mostrar-marcas")
btnMarcas.addEventListener("click", getMarcas)