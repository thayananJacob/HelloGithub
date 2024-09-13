function create(values){
    let array = [];
    for (let value of values ){
        array.push(value);
    }
    
    return array;
}



let meusValores = [1,2,3,4,5];
let resultado = create(meusValores);
console.log('Vetor criado:', resultado);
