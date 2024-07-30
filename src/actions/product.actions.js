import { productConstants } from './constantes';

// Action de création de produit
// export const createProduct = (productData) => (dispatch) => {
//   dispatch({ type: productConstants.CREATE_PRODUCT_REQUEST });
//   fetch('https://back-stack-1.onrender.com/product/create', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(productData),
//   })
//     .then((response) => response.json())
//     .then((data) => dispatch({
//       type: productConstants.CREATE_PRODUCT_SUCCESS,
//       payload: data,
//     }))
//     .catch((error) => dispatch({
//       type: productConstants.CREATE_PRODUCT_FAILURE,
//       payload: error,
//     }));
// };
export const createProduct = (productData) => (dispatch) => {
  dispatch({ type: productConstants.CREATE_PRODUCT_REQUEST });

  // Préparez le FormData
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('nameTwo',productData.nameTwo);
  formData.append('description', productData.description);
  formData.append('type', productData.type);
  formData.append('price',productData.price)
  
  // Ajoutez les fichiers au FormData
  if (productData.files && productData.files.length) {
    productData.files.forEach(file => {
      formData.append('files', file);
    });
  }

  fetch('https://back-stack-1.onrender.com/product/create', {
    method: 'POST',
    body: formData, // Pas besoin de définir 'Content-Type' pour FormData, le navigateur le fera
  })
  .then((response) => response.json())
  .then((data) => dispatch({
    type: productConstants.CREATE_PRODUCT_SUCCESS,
    payload: data,
  }))
  .catch((error) => dispatch({
    type: productConstants.CREATE_PRODUCT_FAILURE,
    payload: error,
  }));
};


// Récupérer tous les produits
export const getAllProducts = () => (dispatch) => {
  dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
  fetch('https://back-stack-1.onrender.com/product/products')
    .then((response) => response.json())
    .then((data) => dispatch({
      type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    }))
    .catch((error) => dispatch({
      type: productConstants.GET_ALL_PRODUCTS_FAILURE,
      payload: error,
    }));
};

// Récupérer un produit par ID
export const getProductById = (id) => async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_REQUEST });
    try {
      const response = await fetch(`https://back-stack-1.onrender.com/product/products/${id}`);
      const data = await response.json();
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_FAILURE,
        payload: error
      });
    }
  };


export const updateProduct = (id, productData) => (dispatch) => {
  dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });

  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('nameTwo',productData.nameTwo);
  formData.append('description', productData.description);
  formData.append('type', productData.type);
  formData.append('price',productData.price);
  

  if (productData.files && productData.files.length) {
      console.log("Files to upload:", productData.files); // Log file details
      productData.files.forEach(file => {
          formData.append('files', file);
      });
  }

  console.log("FormData to be sent:", Object.fromEntries(formData)); // Display FormData entries

  fetch(`https://back-stack-1.onrender.com/product/update/${id}`, {
      method: 'PUT',
      body: formData,
  })
  .then(response => {
      console.log("Server response:", response);
      if (!response.ok) {
          return response.json().then(data => {
              console.log("Server error data:", data);
              throw new Error(data.message || 'Failed to update product');
          });
      }
      return response.json();
  })
  .then(data => {
      console.log("Update success:", data);
      dispatch({
          type: productConstants.UPDATE_PRODUCT_SUCCESS,
          payload: data,
      });
  })
  .catch(error => {
      console.error("Update failure:", error);
      dispatch({
          type: productConstants.UPDATE_PRODUCT_FAILURE,
          payload: error.toString(),
      });
  });
};



  

// Supprimer un produit
export const deleteProduct = (id) => (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });

    fetch(`https://back-stack-1.onrender.com/product/delete/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            // Si la réponse n'est pas OK, lancez une erreur pour passer au bloc 'catch'
            return response.json().then(data => {
                throw new Error(data.message);
            });
        }
        return response.json();
    })
    .then(data => {
        // Si la suppression est réussie, envoyez l'ID du produit supprimé à votre store Redux
        dispatch({
            type: productConstants.DELETE_PRODUCT_SUCCESS,
            payload: id,
        });
    })
    .catch((error) => {
        dispatch({
            type: productConstants.DELETE_PRODUCT_FAILURE,
            payload: error.message,
        });
    });
};

