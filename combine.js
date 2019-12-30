const data1 = ["HnKZ7xcEMBq9n1iNiLKz8soLwGezS3r7ErgbAbAGSZ9y",
"Ars6dcaC2sKSQL7dJ88JHDx8ewS1DdDh5VuXotWypqVu"]

const data2 = ["tpubD8szuhbEMy3YsXcfREnurMrKu8b5mNS6iXkoPoPj3pdkHEX9wjgNAs4zgG56tEYiNQUjCQ9L4UUxsniaSvQyDVfzG86n8mAmNcyE7ppPzCL",
"tpubD8szuhbEMy3YsXcfREnurMrKu8b5mNS6iXkoPoPj3pdkHEX9wjgNAs4zgG56tEYiNQUjCQ9L4UUxsniaSvQyDVfzG86n8mAmNcyE7ppPzCL[legacy]"]




const combine = (obj1, obj2) => {
  let i = 0
  let arr = []
  while (i < obj1.length) {
  let obj = {
    'store': obj1[i],
    'xpub': obj2[i]
  }
  arr.push(obj)
  i++
}
  return {'btc': arr}
}

console.log(combine(data1, data2))