const list = [4, 2, 0, 1, 5, 0] // should be true

const evaluate = (answers) => {
    console.log('answers', answers)
    let sequence = answers.filter(answer => answer !== 0).reverse()
    console.log(`The sequence is ${sequence}`)
    console.log(`TRUE STATEMENT: Is ${sequence.length} === 0?`)
    if(sequence.length <= 0) return true
    console.log('No, length still >= 0')
    let n = sequence.shift()
    console.log('length', sequence.length)
    console.log(`FALSE STATEMENT: Is ${n} > ${sequence.length}?`)
    if(n > sequence.length) {
        console.log("it's greater!!!! :)")
        return false
    }
    
    return evaluate(sequence.map(item => item - 1)) //gotta refactor this to subtract just n number of index items
}

hh = arr => {
    arr = arr.filter(e=>(e!=0)).sort((a,b)=>a-b).reverse()
    if(!arr.length) return true
    n = arr.shift();
    if(n>arr.length) return false
    arr = arr.map((e,i)=>(i<n)?(e-1):e)
    return hh(arr)
  }

const init = () => {
    let check = evaluate(list)
    console.log(`The result is ${check}`)
}

init()