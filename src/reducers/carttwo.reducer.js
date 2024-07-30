

// import { carttwoConstants } from '../actions/constantes';

// const initialState = {
//     cartId: localStorage.getItem('cartId') || '',
//     carttwo: null,
//     carts: [],
//     loading: false,
//     error: null,
//     itemCount: 0, // Vous pouvez conserver itemCount ici si cela fait partie de votre gestion d'état
//     userInfo: {}  // Ajout de userInfo pour stocker les informations de l'utilisateur
// };

// const carttwoReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case carttwoConstants.ADD_TO_CARTTWO_REQUEST:
//         case carttwoConstants.GET_CARTTWO_REQUEST:
//         case carttwoConstants.UPDATE_CARTTWO_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case carttwoConstants.ADD_TO_CARTTWO_SUCCESS:
//             return {
//                 ...state,
//                 carttwo: action.payload, // Assurez-vous que le payload contient la structure attendue
//                 loading: false
//             };
//         case carttwoConstants.GET_CARTTWO_SUCCESS:
//             return {
//                 ...state,
//                 carttwo: action.payload, // payload devrait être l'objet complet du panier, incluant items et userInfo si disponibles
//                 itemCount: action.payload.items.length, // Exemple de mise à jour du itemCount
//                 loading: false
//             };
//         case carttwoConstants.UPDATE_CARTTWO_SUCCESS:
//             return {
//                 ...state,
//                 carttwo: action.payload,
//                 userInfo: action.payload.userInfo,
//                 itemCount: 0, // Mise à jour spécifique de userInfo après l'update
//                 loading: false
//             };
//         case carttwoConstants.ADD_TO_CARTTWO_FAILURE:
//         case carttwoConstants.GET_CARTTWO_FAILURE:
//         case carttwoConstants.UPDATE_CARTTWO_FAILURE:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };

//             case carttwoConstants.CLEAR_CART:
//                 return {
//                     ...state,
//                     carttwo: null,
//                     itemCount: 0,
//                     userInfo: {} 
//                 };

//                 case carttwoConstants.NEW_CART_CREATED:
//                     return {
//                         ...state,
//                         cartId: action.payload,
//                         items: []  // Reset the cart items when a new cart is created
//                     };

//                     case carttwoConstants.GET_ALL_CARTS_REQUEST:
//                         return {
//                             ...state,
//                             loading: true,
//                             error: null
//                         };
//                     case carttwoConstants.GET_ALL_CARTS_SUCCESS:
//                         return {
//                             ...state,
//                             loading: false,
//                             carts: action.payload
//                         };
//                     case carttwoConstants.GET_ALL_CARTS_FAILURE:
//                         return {
//                             ...state,
//                             loading: false,
//                             error: action.payload
//                         };
    
//         default:
//             return state;
//     }
// };

// export default carttwoReducer;

import { carttwoConstants } from '../actions/constantes';

const initialState = {
    cartId: localStorage.getItem('cartId') || '',
    carttwo: null,
    carts: [],
    loading: false,
    error: null,
    itemCount: 0,
    userInfo: {}
};

const carttwoReducer = (state = initialState, action) => {
    switch (action.type) {
        case carttwoConstants.ADD_TO_CARTTWO_REQUEST:
        case carttwoConstants.GET_CARTTWO_REQUEST:
        case carttwoConstants.UPDATE_CARTTWO_REQUEST:
        case carttwoConstants.REMOVE_ITEM_FROM_CART_REQUEST:
        case carttwoConstants.UPDATE_ITEM_QUANTITY_REQUEST:
        case carttwoConstants.GET_ALL_CARTS_REQUEST:
        case carttwoConstants.GET_CARTS_BY_USERID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case carttwoConstants.ADD_TO_CARTTWO_SUCCESS:
            return {
                ...state,
                carttwo: action.payload,
                loading: false
            };
        case carttwoConstants.GET_CARTTWO_SUCCESS:
            return {
                ...state,
                carttwo: action.payload,
                itemCount: action.payload.items.length,
                loading: false
            };
        case carttwoConstants.UPDATE_CARTTWO_SUCCESS:
            return {
                ...state,
                carttwo: action.payload,
                userInfo: action.payload.userInfo,
                itemCount: 0,
                loading: false
            };
        case carttwoConstants.REMOVE_ITEM_FROM_CART_SUCCESS:
        case carttwoConstants.UPDATE_ITEM_QUANTITY_SUCCESS:
            return {
                ...state,
                carttwo: action.payload,
                loading: false
            };
        case carttwoConstants.ADD_TO_CARTTWO_FAILURE:
        case carttwoConstants.GET_CARTTWO_FAILURE:
        case carttwoConstants.UPDATE_CARTTWO_FAILURE:
        case carttwoConstants.REMOVE_ITEM_FROM_CART_FAILURE:
        case carttwoConstants.UPDATE_ITEM_QUANTITY_FAILURE:
        case carttwoConstants.GET_ALL_CARTS_FAILURE:
        case carttwoConstants.GET_CARTS_BY_USERID_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case carttwoConstants.CLEAR_CART:
            return {
                ...state,
                carttwo: null,
                itemCount: 0,
                userInfo: {}
            };
        case carttwoConstants.NEW_CART_CREATED:
            return {
                ...state,
                cartId: action.payload,
                items: []
            };
        case carttwoConstants.GET_ALL_CARTS_SUCCESS:
            return {
                ...state,
                loading: false,
                carts: action.payload
            };
        case carttwoConstants.GET_CARTS_BY_USERID_SUCCESS:
            return {
                ...state,
                loading: false,
                carts: action.payload
            };
        default:
            return state;
    }
};

export default carttwoReducer;
