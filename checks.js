let arr = [1,2,3,3,2,1,0,5,5,9,999,9,9,9,9,9];
let newArr=[];
for(let ele of arr){
    if (!newArr.includes(ele)){
        newArr.push(ele)
    }
   
}

console.log(newArr);