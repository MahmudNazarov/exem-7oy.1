let products = [];

        async function fetchProducts() {
            const res = await fetch('https://fakestoreapi.com/products');
            products = await res.json();
            displayProducts(products);
        }

        function displayProducts(items) {
            const container = document.getElementById('products');
            container.innerHTML = '';
            items.forEach(product => {
                container.innerHTML += `
                    <div class="product">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.category}</p>
                        <p>Цена: $${product.price}</p>
                    </div>
                `;
            });
        }

        function filterProducts() {
            let filtered = [...products];
            const search = document.getElementById('search').value.toLowerCase();
            const sort = document.getElementById('sort').value;
            const category = document.getElementById('category').value;

            if (category !== 'all') {
                filtered = filtered.filter(p => p.category === category);
            }
            if (search) {
                filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
            }
            if (sort === 'asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sort === 'desc') {
                filtered.sort((a, b) => b.price - a.price);
            }
            displayProducts(filtered);
        }

        fetchProducts();