import React, {useState, useEffect} from 'react';
import { commerce} from './lib/commerce';
import {Products, NavBar, Cart} from './components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const fetchProducts = async () =>{
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async() =>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    } 

    const handleUpdateCartQty = async(productID, quantity) =>  {
        const item = await commerce.cart.update(productID, {quantity});
        setCart(item.cart)
    }

    const handleRemoveFromCart = async(productID) => {
        const item = await commerce.cart.remove(productID);
        setCart(item.cart);
    }

    const handleEmptyCart = async() => {
        const item = await commerce.cart.empty();
        setCart(item.cart);
    }

    useEffect(() =>{
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <NavBar  totalItems = {cart.total_items}  />
                <Switch>
                    <Route exact path = "/">
                        { <Products  products= {products} onAddToCart={handleAddToCart}/> }
                    </Route>
                    <Route exact path = "/cart">
                         <Cart 
                                cart = {cart} 
                                handleUpdateCartQty= {handleUpdateCartQty}
                                handleRemoveFromCart= {handleRemoveFromCart}
                                handleEmptyCart= {handleEmptyCart}
                        /> 
                    </Route>
                </Switch>    
            </div>
        </Router>
    )
}

export default App;

