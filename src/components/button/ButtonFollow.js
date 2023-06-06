import { useState } from "react"
import { Button } from "./style.js"
import { Blocks } from "react-loader-spinner";
import axios from "axios";

export default function ButtonFollow({handleFollow, following, isLoading}) {


    return (
        
        <>
            <Button onClick={handleFollow} disabled={isLoading} color={following}>{isLoading ? <Blocks
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