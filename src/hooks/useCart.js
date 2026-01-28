import {useState, useEffect,useMemo} from 'react'
import {db} from '../data/db'


export const useCart=()=>{

    const initialCart = () =>{

    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []

  }

  const [data ] = useState(db)
  const [cart, setCart]= useState(initialCart);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(()=>{

     localStorage.setItem('cart',JSON.stringify(cart))
 
  },[cart])

  function addToCart(item){ 

    //Esta logica es cuando comparo si en mi state 
    //ya tengo ese elemento, para no repetirse
    //se usa findIndex porque no muta el useState
    const intemExists = cart.findIndex(guitar=> guitar.id === item.id)
    //console.log(intemExists)
    if (intemExists >= 0 ) {

      if(cart[intemExists].quatity >= MAX_ITEMS) return
      //Aqui sirve pero estoy mutando al state
      //cart[intemExists].quatity++

      const updateCart= [...cart]

      updateCart[intemExists].quatity++
      setCart(updateCart)

      //console.log("Ya existe...")
    }else{

      item.quatity = 1
      console.log("No existe... Agregando...")
      //setCart(prevCart=>[...prevCart,item])
      //Una forma mas rapida menos codigo, asi, porque cart es lo que
      //esta arriba mis elementos guardados
      setCart([...cart,item])
    }

    
  }

   function removeFromCart(id){

      setCart(prevCart => prevCart.filter(guitar=>guitar.id !== id))

    }

   function increaseQuantity(id)
  {
    setCart(prevCart => prevCart.map(item=>
      item.id === id && item.quatity <MAX_ITEMS ? {...item, quatity:item.quatity+1} : item      
    )) 
  }

  function decreaseQuantity(id)
  {
    setCart(prevCart => prevCart.map(item=>
      item.id === id && item.quatity > MIN_ITEMS ? {...item, quatity:item.quatity-1} : item      
    )) 
  }

  function clearCart(){

    setCart([])
  }


  // function increaseQuantity(id)
  // {
  //   const updateCart = cart.map(item=>{
  //     if (item.id === id) {
  //       return{
          
  //         ...item,
  //         quatity: item.quatity+1
  //       }
  //     }
  //     return item
  //   })
  //   setCart(updateCart)
  // }



    //Esta es la parte del header
      //State Derivado
    const isEmpty=useMemo( () => cart.length === 0,[cart]  )

//     array.reduce((acumulador, elementoActual) => {
//   return nuevoValorDelAcumulador;
// }, valorInicial);

    const cartTotal = useMemo(()=>cart.reduce((total,item)=>total+(item.quatity * item.price),0), [cart])

    //console.log(cart)




    return {

            data,cart,addToCart,removeFromCart,decreaseQuantity,increaseQuantity,clearCart,isEmpty,cartTotal
        
    }
}


