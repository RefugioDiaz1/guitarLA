import {useState, useEffect} from 'react'
import Header from './Components/Header'
import Guitar from './Components/Guitar'
import {db} from './data/db'


function App() {

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

  return (
    <>
     
     <Header 
     cart={cart}
     removeFromCart ={removeFromCart}
     increaseQuantity = {increaseQuantity}
     decreaseQuantity = {decreaseQuantity}
     clearCart= {clearCart}
     />
    
    <main className="container-xl mt-5">
        <h2  className="text-center">Nuestra Colección con Variedad</h2>
        <div className="row mt-5">
           { 
            data.map((guitar) =>(
               <Guitar   
               key={guitar.id}             
               guitar={guitar}
               setCart={setCart}
               addToCart={addToCart}
               />
               ))}   
        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
