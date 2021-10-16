$(() => {

})


const createMenuItem = (menuItem) => {
  const $menuItem = `
  <div class="card">
    <div class="card-image">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSCOlniJMr4V7dNRTupyATwGeWoL5H5bSUA&usqp=CAU" alt="Placeholder image">
    </div>
    <div class="card-content">
      <div class="media">
        <p class="title is-3">Mohca Smoothie Bubble Tea</p>
      </div>
      <div class="content">
        <span class="description">Description: Lorem ipsum dolor sit amet.</span>
        <span class="ingredients">Ingredients: Lorem ipsum dolor sit amet.</span>
        <div class="card-footer">
          <div class="cost">
            <p>$5.00</p>
          </div>
          <div class="order-value">
            <div>quantity: 0</div>
            <div class="increment-order">
              <button>+</button>
              <button>-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  return $menuItem;
}
