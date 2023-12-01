import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [mode, setMode] = useState('light')

  const [basketUl, setBasketUl] = useState(
    localStorage.getItem('basket')
      ? JSON.parse(localStorage.getItem('basket'))
      :
      []
  );
  const [count, setCount] = useState(0);
  const [filterData, setFilterData] = useState("All");
  // console.log(filterData);

  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketUl))
  }, [basketUl])

  useEffect(() => {
    fetch('https://mocki.io/v1/8fa1ba1b-e2d7-46b9-9435-726ea8e2bca7')
      .then(res => res.json())
      .then(api => setData(api));
  }, []);

  function AddBasket(item) {
    let elementIndex = basketUl.findIndex((x) => x.id === item.id);
    if (elementIndex !== -1) {
      const newBasket = [...basketUl];
      newBasket[elementIndex].count++;
      setBasketUl(newBasket);
    } else {
      setBasketUl([...basketUl, { ...item, count: 1 }]);
    }
  }


  function setValueCount(isAdd, item) {
    let elementIndex = basketUl.findIndex((x) => x.id === item.id);
    const newBasket = [...basketUl];

    if (elementIndex !== -1) {
      if (isAdd) {
        newBasket[elementIndex].count++;
      } else {
        if (newBasket[elementIndex].count > 1) {
          newBasket[elementIndex].count--;
        }
      }

      setBasketUl(newBasket);
    }
  }

  function RemoveBasket(id) {
    setBasketUl(basketUl.filter((x) => x.id !== id));
  }

  // function mode() {
  //   var big = document.querySelector('.big')
  //   big.classList.toggle('dark')

  // }




  function filter(category) {
    setFilterData(category);
  }

  const filteredProducts = filterData === "All" ? data : data.filter((item) => item.category === filterData);


  return (
    <div className='big'>
      <button className={`big ${mode}`} style={{ background: "none" , border:'none' }} onClick={() => {
        mode === 'light' ? setMode('dark') : setMode('light')
        mode === 'light' ? localStorage.setItem('mode', 'dark') : localStorage.setItem('mode', 'light')
      }} > {mode === 'light' ? <i class="fa-solid fa-moon" style={{ color: "#c19f5f", fontSize: "23px" }}></i> : <i class="fa-solid fa-sun" style={{ color: "#c19f5f", fontSize: "23px" }}></i>}</button>
      {/* <h2>Basket</h2>
      <table border={1}>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Count</th>
          <th>Delete</th>


        </tr>
        {basketUl.map((item) => (
          <tr className='cart' key={item.id}>
            <td>
              <img width={110} src={item.img} alt="" />
            </td>
            <td>{item.name}</td>
            <td>$ {item.count * item.price}</td>
            <td>
              <div className='count'>
                <button className='minus' onClick={() => setValueCount(false, item)}>
                  -
                </button>
                <span>{item.count}</span>
                <button className='plus' onClick={() => setValueCount(true, item)}>
                  +
                </button>
                <br />
              </div>
            </td>
            <td>
              <button className='remove' onClick={() => RemoveBasket(item.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </table> */}

      <h3>Wishlist</h3>
      <table border={1}>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Delete</th>


        </tr>
        {basketUl.map((item) => (
          <tr className='cart' key={item.id}>
            <td>
              <img width={110} src={item.img} alt="" />
            </td>
            <td>{item.name}</td>
            <td>$ {item.price}</td>

            <td>
              <button className='remove' onClick={() => RemoveBasket(item.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </table>



      <h1>Products</h1>
      <ul className="list-group mt-5">
        <li onClick={() => { filter('All') }} > All</li>
        <li onClick={() => { filter('Bakery') }} > Bakery</li>
        <li onClick={() => { filter('Chocolate') }}> Chocolate</li>
        <li onClick={() => { filter('Craft Bakery') }}> Craft Bakery</li>
        <li onClick={() => { filter('Craft Food') }}> Craft Food</li>
        <li onClick={() => { filter('Cupcake') }}> Cupcake</li>
        <li onClick={() => { filter('Delicious Sweets') }}> Delicious Sweets </li>
      </ul>
      <div className='product'>
        {filteredProducts.map(item => (
          <div className='cart' key={item.id}>
            <img width={120} src={item.img} alt="" />
            <p>$ {item.price}</p>
            <p>{item.category}</p>
            {/* <button onClick={() => { AddBasket(item); setValueCount(true, item); }}>Add Basket</button> */}
            <button
              onClick={() => {
                AddBasket(item); setValueCount(true, item);
              }}
            >
              {basketUl.some(basketItem => basketItem.id === item.id) ? (
                <i style={{ color: clickCount % 2 !== 0 ? "white" : "red" }} className="fa-solid fa-heart"></i>
              ) : (
                <i style={{ color: "white" }} className="fa-solid fa-heart"></i>
              )}

            </button>






          </div>
        ))}
      </div>


      <hr />
    </div>
  );
}

export default App;


