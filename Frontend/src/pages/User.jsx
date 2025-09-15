import React, { useEffect } from 'react'
import Layout from './Layout.jsx'
import UserList from '../component/UserList.jsx'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../auth/authS";

const User = () => {
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
      <UserList />
    </Layout>
  )
}

export default User;