// selects all the filter checkboxes and type checkboxes
const checkboxes = document.querySelectorAll('.filter-checkbox');
const typeCheckboxes = document.querySelectorAll('.type-checkbox');

// selects the container for the products and get a list of products
const productsContainer = document.querySelector('.product-grid');
const products = Array.from(document.querySelectorAll('.product'));

// function to apply filters and sorting
function applyFilters() {
  // get an array of selected filter values from the checkboxes
  const selectedFilters = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.getAttribute('data-filter'));

  // get an array of selected type values from the type checkboxes
  const selectedTypes = Array.from(typeCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.getAttribute('data-type'));

  // filter the products based on selected types and filters
  const filteredProducts = products.filter(product => {
    const productTypes = product.getAttribute('data-types').split(', ');

    if (selectedTypes.length > 0) {
      if (!productTypes.some(type => selectedTypes.includes(type))) {
        return false;
      }
    }

    return true;
  });

  // sort the filtered products based on selected filters
  filteredProducts.sort((a, b) => {
    const priceA = parseInt(a.getAttribute('data-price'));
    const priceB = parseInt(b.getAttribute('data-price'));

    if (selectedFilters.includes('price-low')) {
      return priceA - priceB;
    }

    if (selectedFilters.includes('price-high')) {
      return priceB - priceA;
    }

    if (selectedFilters.includes('popular')) {
      const isPopularA = a.classList.contains('popular');
      const isPopularB = b.classList.contains('popular');
      if (isPopularA && !isPopularB) return -1;
      if (!isPopularA && isPopularB) return 1;
    }

    return 0;
  });

  // clear the products container
  productsContainer.innerHTML = '';

  // append the sorted and filtered products back to the container
  filteredProducts.forEach(product => {
    productsContainer.appendChild(product.cloneNode(true));
  });
}

// event listeners to checkboxes to trigger applyFilters function
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', applyFilters);
});

// event listeners to typeCheckboxes to trigger applyFilters function
typeCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', applyFilters);
});

applyFilters();