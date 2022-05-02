const list = [1,4,90,67,5,10]

//destructing
const [a,b,c,d,...rest] = list

//the rest will be an array holding the data exept 1th,2nd,3rd and the 4th

console.log(a)
console.log(rest)

const filtered = list.filter((value)=>{
    if(value%2==0) return value
})

const modified= list.map((value)=>{
    return value**2
})

const modified_not_reassigned = []
let count = 0;

list.forEach((value)=>{
    if(count<list.length-1)
        val = value+list[count+1];
    else 
        val = value
        
        modified_not_reassigned.push(val)
        count++;
})

const obexample = {
    name : "object with function as prop",
    age : 29,
    sum : function (e) {
        this.age = this.age + e
        return e**2
    },
    ob2 : {
        l : 20,
        s : 50
    }
}

obexample.sum(3)

console.log(obexample.age) //32

//object destructing

const {name,age,sum,ob2:{l}} = obexample;

console.log(sum(10))

console.log(l)

console.log(filtered)

console.log(modified)

console.log(modified_not_reassigned)

//classes

class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    greet() {
      console.log('hello, my name is ' + this.name)
    }
  }
  
  const adam = new Person('Adam Ondra', 35)
  adam.greet()
  
  const janja = new Person('Janja Garnbret', 22)
  janja.greet()