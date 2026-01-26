import {useState, useEffect} from 'react'
import Header from './Components/Header'
import Guitar from './Components/Guitar'
import {db} from './data/db'


function App() {

  const [data, setData ] = useState(db)
  const [cart, setCart]= useState([]);

  function addToCart(item){ 

    //Esta logica es cuando comparo si en mi state 
    //ya tengo ese elemento, para no repetirse
    //se usa findIndex porque no muta el useState
    const intemExists = cart.findIndex(guitar=> guitar.id === item.id)
    //console.log(intemExists)
    if (intemExists >= 0 ) {

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
    console.log('Incrementando...',id)

  }

  return (
    <>
     
     <Header 
     cart={cart}
     removeFromCart ={removeFromCart}
     increaseQuantity = {increaseQuantity}
     />
    
    <main className="container-xl mt-5">
        <h2  className="text-center">Nuestra Colección</h2>
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
