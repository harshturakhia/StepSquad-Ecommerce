import axios from "axios";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS} from "../constants/productConstant"
import {PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS} from "../constants/productConstant"


let url = "http://localhost:8000/api/v1";
export const getProduct =(keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
    try{
        dispatch({
            type:"ALL_PRODUCT_REQUEST"
        });


        let link=`${url}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if(category){
         link= `${url}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data}=await axios.get(link);

      
        dispatch({
            type:"ALL_PRODUCT_SUCCESS",
            payload:data
        })


    }catch(error){
        dispatch({
            type:"ALL_PRODUCT_FAIL",
            payload:error.response.data.message
        })
    }
}

// export const getProductDetails =(id)=>async(dispatch)=>{
//     try{
//         dispatch({
//             type:"PRODUCT_DETAILS_REQUEST"
//         });

//         const {data}=await axios.get(`http://localhost:3000/api/v1/products/${id}`);

//         dispatch({
//             type:"PRODUCT_DETAILS_SUCCESS",
//             payload:data.product
//         })


//     }catch(error){
//         dispatch({
//             type:"PRODUCT_DETAILS_FAIL",
//             payload:error.response.data.message
//         })
//     }
// }

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`${url}/products/${id}`);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// CLEARING ERRORS
export const clearErrors =()=>async(dispatch)=>{

    dispatch({
        type:"CLEAR_ERRORS"
    })
}

