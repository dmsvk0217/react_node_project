import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  // option = null : 누구든 들어갈 수 있는 페이지
  // option = true : 로그인한 유저만 들어갈 수 있는 페이지
  // option = false : 로그인한 유저는 들어갈 수 없는 페이지

  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        //auth()로 받은 값으로 분기체크해주기.
        if (!response.payload.isAuth) {
          // 로그인이 안되어 있으면.
          if (option) {
            // optino이 ture인 페이지를 못들어 가게 한다.
            navigate("/login", { replace: true });
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.isAdmin) {
            // admin계정이고 admin페이지이면 통과한다.
            navigate("/", { replace: true });
          } else {
            if (option === false) {
              // option이 false인 페에지에 들어가면 안됨.
              navigate("/", { replace: true });
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
