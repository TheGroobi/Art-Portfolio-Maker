
    
    //const content = document.createElement('div');
    const label = document.createElement('h1');
    const description = document.createElement('p');
    const image = document.createElement('img');

    const container = document.querySelector('.mainGrid');
    const popupAdd = document.querySelector('.popupAdd');
    const piece = document.querySelector('.piece-1')

    const btn = document.querySelector('#btn');
    const btnClose = document.querySelector('#btnClose')
    const btnFinalize = document.querySelector('#popupFinalize');
    const removeBtn = document.querySelector('#btnRemove');

    const name = document.querySelector('#name');
    const dsc = document.querySelector('#description'); 
    const fileSelector = document.querySelector('#Artwork');

    function removeDiv(id){
        const divToRemove = document.querySelector('.piece-1[uid="' + id + '"]');
        divToRemove.remove();
    }

    function generateId(){
        return "id" + Math.random().toString(16).slice(2);
    }

    function assignId(element, id){
        
        element.setAttribute('uid', id);
    }
    
    function createDiv(){
        const content = document.createElement('div');
        const label = document.createElement('h1');
        const description = document.createElement('p');
        const image = document.createElement('img');
        const textBox = document.createElement('div');
        const removeBtn = document.createElement('button');
        const closeIcon = document.createElement('img');
        const imageLinker = document.createElement('a')

        const uniqueId = generateId();

        imageLinker.id = 'image_linker';
        imageLinker.href = 'artwork.html';
    
        content.classList.add('piece-1');

        removeBtn.classList.add('btnRemove');
        closeIcon.src = "cross.png";
        removeBtn.id = 'btnRemove';

        textBox.classList.add('textBox');
        
        label.innerHTML = document.getElementById('name').value;
        description.innerHTML = document.getElementById('description').value;

        image.setAttribute('src', URL.createObjectURL(fileSelector.files[0]));

        removeBtn.appendChild(closeIcon);
        textBox.appendChild(label);
        textBox.appendChild(description);
        imageLinker.appendChild(image);
        content.appendChild(imageLinker);
        content.appendChild(removeBtn);
        content.appendChild(textBox);

        assignId(removeBtn, uniqueId);
        assignId(content, uniqueId);
        

        removeBtn.addEventListener('click', function() {
            removeDiv(uniqueId);
        });
    
        container.appendChild(content);

        popupAdd.classList.remove('open');
    }

    function createDivFromData(data) {
        const content = document.createElement('div');
        const label = document.createElement('h1');
        const description = document.createElement('p');
        const image = document.createElement('img');
        const textBox = document.createElement('div');
        const removeBtn = document.createElement('button');
        const closeIcon = document.createElement('img');
        const imageLinker = document.createElement('a');
    
        imageLinker.id = 'image_linker';
        imageLinker.href = 'artwork.html';
    
        content.classList.add('piece-1');
        removeBtn.classList.add('btnRemove');
        closeIcon.src = "cross.png";
        removeBtn.id = 'btnRemove';
        textBox.classList.add('textBox');
    
        label.innerHTML = data.title;
        description.innerHTML = data.description;
        image.setAttribute('src', data.image);
    
        removeBtn.appendChild(closeIcon);
        textBox.appendChild(label);
        textBox.appendChild(description);
        imageLinker.appendChild(image);
        content.appendChild(imageLinker);
        content.appendChild(removeBtn);
        content.appendChild(textBox);
    
        assignId(removeBtn, data.uid);
        assignId(content, data.uid);
    
        removeBtn.addEventListener('click', function () {
            removeDiv(data.uid);
        });
    
        container.appendChild(content);
        popupAdd.classList.remove('open');
    }
    
    // Function to load data to sessionStorage
    function loadToJSON(name, description) {
        const newData = {
            uid: generateId(),
            title: name,
            description: description,
            image: URL.createObjectURL(fileSelector.files[0])
        };
    
        // Get existing data from sessionStorage
        const existingData = JSON.parse(sessionStorage.getItem('artworkData')) || [];
    
        // Add new data to the existing data
        existingData.push(newData);
    
        // Save the updated data back to sessionStorage
        sessionStorage.setItem('artworkData', JSON.stringify(existingData));
    
        // Call the function to create a div from the new data
        createDivFromData(newData);
    }
    
    // ... (Your existing code)
    
    // Add this block of code to retrieve and display existing data during page load
    window.onload = function () {
        const existingData = JSON.parse(sessionStorage.getItem('artworkData')) || [];
        existingData.forEach((data) => {
            createDivFromData(data);
        });
    };


    removeBtn.addEventListener('click', ()=> {
        if(removeBtn.getAttribute('uid') == piece.getAttribute('uid')){
            removeDiv(removeBtn.getAttribute('uid'));
        }else{
            console.log('error');
        }
    });

    btn.addEventListener('click', () => {
        popupAdd.classList.add('open');
    });

    btnClose.addEventListener('click', () => {
        popupAdd.classList.remove('open');
    });
    
    
    btnFinalize.addEventListener('click', () => {
        loadToJSON(name.value, dsc.value);
    });
    
