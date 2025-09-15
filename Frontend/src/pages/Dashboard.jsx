    import React, { useEffect } from "react";
    import Layout from "./Layout";
    import Welcome from "../component/Welcome";
    import { useDispatch, useSelector } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import { getMe } from "../auth/authS";

    const Dasboard = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {user, isError} = useSelector((state) => state.auth);

        useEffect(() => {
            if(!user && !isError) {
                dispatch(getMe());
            }
        }, [dispatch, user, isError]);

        useEffect(() => {
            if(isError){
                navigate("/login");
            }
        }, [isError, navigate]);
        
        return (
            <Layout>
                <Welcome />
            </Layout>
        );
    }

    export default Dasboard;