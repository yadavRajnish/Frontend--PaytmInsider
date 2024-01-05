import axios from "axios";

export const getSubCategory= (categoryEventID)=>{
    return (dispatch)=>{
        dispatch({type:"Get-Category-Pending"});
        return axios
        .get(`https://paytm-insider-backend.onrender.com/get-category/${categoryEventID}`)
        .then((res)=>{
            dispatch({type:"Get-Category-Success",payload:res.data})
            // console.log(res.data)
            return Promise.resolve()
        })
        .catch((err)=>{
            dispatch({type:"Get-Category-Failed",payload:err.message})
            return Promise.reject()
        })
    }
}

export const getAllCategories= (categoryEventID)=>{
    return (dispatch)=>{
        dispatch({type:"Get-Category-Pending"});
        return axios
        .get(`https://paytm-insider-backend.onrender.com/get-categories`)
        .then((res)=>{
            dispatch({type:"Get-Category-Success",payload:res.data})
            // console.log(res.data)
            return Promise.resolve()
        })
        .catch((err)=>{
            dispatch({type:"Get-Category-Failed",payload:err.message})
            return Promise.reject()
        })
    }
}