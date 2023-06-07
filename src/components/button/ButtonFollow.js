import { useState } from "react"
import { Button } from "./style.js"
import { Blocks } from "react-loader-spinner";
import axios from "axios";

export default function ButtonFollow({handleFollow, following, isLoading, isUser}) {


    return (
        
        <>
            <Button onClick={handleFollow} data-test="follow-btn" disabled={isLoading} 
            color={following} isUser={isUser}>{isLoading ? <Blocks
              visible={true}
              height="30"
              width="30"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              style={{ overflow: 'hidden' }}
            /> : following ?  "Unfollow" : "Follow"}</Button>
        </>
    )
}