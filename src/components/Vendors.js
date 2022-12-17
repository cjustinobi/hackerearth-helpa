

const Vendors = () => {
  return (
    <div class="product-container">

      <div class="container">


        <div class="sidebar  has-scrollbar" data-mobile-menu>

          <div class="product-showcase">

            <h3 class="showcase-heading">Top service Providers</h3>

            <div class="showcase-wrapper">

              <div class="showcase-container">

                <div class="showcase">

                  <a href="#" className="showcase-img-box">
                    {/*<img src="src/assets/images/istockphoto-1060680104-612x612.jpg" alt="baby fabric shoes" width="75" height="75"*/}
                    {/*     class="showcase-img">*/}
                  </a>

                  <div class="showcase-content">

                    {/*<a href="#">*/}
                    {/*  <h4 class="showcase-title">Janet Fatima<br>Tailor*/}
                    {/*</a>*/}

                    <div class="showcase-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        <div class="product-main">

          <h2 class="title">Service Providers</h2>

          <div class="product-grid">

            <div class="showcase">

              <div class="showcase-banner">

                {/*<img src="../hack/images (1).jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img default">*/}
                {/*  <img src="../hack/download (1).jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover" style="transform: scale(0.9);">*/}

                <div class="showcase-actions">

                  <a href="../profile/profile 1/index.html">
                    <button className="btn-action">
                      <ion-icon name="person-outline"></ion-icon>
                    </button>
                  </a>

                </div>

              </div>

              <div class="showcase-content">

                <a href="#" className="showcase-category">justin</a>

                <a href="#">
                  <h3 class="showcase-title">Auto-mobile Engineer</h3>
                </a>

                <div class="showcase-rating">
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star-outline"></ion-icon>
                  <ion-icon name="star-outline"></ion-icon>
                </div>

                <div class="price-box">
                  <p class="price">#48.00</p>
                  <button className="btn" onClick="makePayment('justib@ggh.hhj', 48, 'justin', 'okon')">Hire</button>
                </div>

              </div>

            </div>


          </div>

        </div>

      </div>

    </div>
  )
}

export default Vendors