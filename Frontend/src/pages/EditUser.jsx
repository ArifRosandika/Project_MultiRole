import React, { useEffect } from 'react'
import Layout from './Layout'
import FormEditUser from '../component/FormEditUser'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../auth/authS";

const Edituser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
            navigate("/");
        }
        if(user && user.role !== "admin"){
            navigate("/");
        }
    }, [isError, user, navigate]);

  return (
    <Layout>
      <FormEditUser />
    </Layout>
  )
}

export default Edituser