const modulData = document.querySelector('#moduleDate');
if (localStorage.getItem('registeredUser')) {
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    console.log(registeredUser);
    for (const prop in registeredUser){
        console.log`${prop} ${registeredUser[prop]}`;
        const newLi = document.createElement('li');
        newLi.textContent = `${prop}: ${registeredUser[prop]}`;
        modulData.appendChild(newLi);
    }
};
