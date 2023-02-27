fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    var product = document.getElementById('product')
    console.log(json.product_type)

    var selectType = document.getElementById('type')
    var selectBrand = document.getElementById('brand')
    var selectBestValue = document.getElementById('bestProduct')
    var padrao = [...json]

    var sendBtn = document.getElementById('send')

    var brandNamesUnicos = []

    sendBtn.addEventListener('click', function (e) {
      e.preventDefault()
      const textName = document.getElementById('name')
      const value = textName.value
      searchByName(value)
    })

    function searchByBrand() {
      while (product.firstChild) {
        product.removeChild(product.firstChild)
      }
      if (selectBrand.value !== 'todos') {
        var listaBrand = json.filter(x => {
          if (x.brand == selectBrand.value) {
            return x
          }
        })
        renderProduct(listaBrand)
        addFlipCards()
      } else {
        renderProduct(padrao)
        addFlipCards()
      }
    }

    selectBrand.addEventListener('change', () => {
      searchByBrand()
    })

    function searchByName(name) {
      while (product.firstChild) {
        product.removeChild(product.firstChild)
      }
      let searchJson = json.filter(item => {
        if (item.name.toLowerCase().includes(name)) {
          
          return item
        }
      })
      renderProduct(searchJson)
      addFlipCards()
    }

    function searchByBestValue() {
      while (product.firstChild) {
        product.removeChild(product.firstChild)
      }
      if (selectBestValue.value == 'Melhor Avaliados') {
        json.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1
          } else {
            return true
          }
        })
        renderProduct(json)
        addFlipCards()
      } else {
        renderProduct(padrao)
        addFlipCards()
      }
    }

    selectBestValue.addEventListener('change', () => {
      searchByBestValue()
    })

    function searchByType() {
      while (product.firstChild) {
        product.removeChild(product.firstChild)
      }
      if (selectType.value == 'deAaZ') {
        json.sort((a, b) => {
          if (
            a.name.replace(/(\r\n|\n|\r|#)/gm, '').trim() <
            b.name.replace(/(\r\n|\n|\r|#)/gm, '').trim()
          ) {
            return -1
          } else {
            return true
          }
        })
        renderProduct(json)
        addFlipCards()
      } else if (selectType.value == 'deZaA') {
        json.sort((a, b) => {
          if (
            a.name.replace(/(\r\n|\n|\r|#)/gm, '').trim() >
            b.name.replace(/(\r\n|\n|\r|#)/gm, '').trim()
          ) {
            return -1
          } else {
            return true
          }
        })
        renderProduct(json)
        addFlipCards()
      } else if (selectType.value == 'maioresPrecos') {
        json.sort((a, b) => {
          if (a.price > b.price) {
            return -1
          } else {
            return true
          }
        })
        renderProduct(json)
        addFlipCards()
      } else if (selectType.value == 'menoresPrecos') {
        json.sort((a, b) => {
          if (a.price < b.price) {
            return -1
          } else {
            return true
          }
        })
        renderProduct(json)
        addFlipCards()
      } else {
        renderProduct(padrao)
        addFlipCards()
      }
    }

    selectType.addEventListener('change', () => searchByType())

    function flipCard(x) {
      x.classList.toggle('flip')
      // console.log(x)
    }

    function createStarRating(rating) {
      var result = ''

      if (rating < 1 || rating > 5) {
        return 'Não avaliado'
      }
      for (let i = 1; i <= rating; i++) {
        result += '⭐'
      }
      for (let i = rating; i < 5; i++) {
        result += '✰'
      }
     

      return result
    }


    function renderProduct(listaProdutos) {
      listaProdutos.forEach(x => {
        let star = createStarRating(x.rating)

        let newProductName = document.createElement('div')

        newProductName.innerHTML = `
        <div class="cardsSingle">
        <div class="star cardFront">${star}</div>
          <div class="info cardFront">
            <div class="imgContainer">
              <img src="${x.image_link}" class="img">
            </div>
            <h1 class="productName">${x.name}</h1>
              <div class="brandAndPriceFront">
                <div class="price">R$ ${x.price}</div>
                <div class="brand">${x.brand}</div>
              </div>
          </div>
          <div class="information${x.id} cardBack" id=${x.id}>
            <h1 class="productNameInfo">${x.name}</h1>
              <div class="brandAndPriceBack">
                <div class="brandInfo">${x.brand}</div>
                <div class="priceInfo">R$ ${x.price}</div>
              </div>
              <div>Brand: ${x.brand}</div>
              <div>Price: R$ ${x.price}</div>
              <div>Rating: ${x.rating}</div>
              <div>Category: ${x.category}</div>
              <div>Product Type: ${x.product_type}</div>
          </div>
        </div>
        `
        newProductName.classList.add('cardBox')
        product.appendChild(newProductName)
      })
    }

    function renderProductByBrand(listaProdutos) {
      listaProdutos.forEach(x => {
        if (!brandNamesUnicos.includes(x.brand)) {
          brandNamesUnicos.push(x.brand)

          let brandOption = document.createElement('option')

          brandOption.innerHTML = `
          <option class="option" value="${x.brand}" >${x.brand}</option>
          `
          selectBrand.appendChild(brandOption)
        }
      })
    }

    renderProduct(json)
    renderProductByBrand(json)

    function addFlipCards() {
      var cards = document.querySelectorAll('.cardsSingle')
      cards.forEach(card =>
        card.addEventListener('click', () => flipCard(card))
      )
    }

    addFlipCards()

  })
