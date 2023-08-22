import React, {useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {checkUserAuthFX} from '../app/api/auth';
import {setUser} from '../context/user';


export const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false)

  const router = useRouter()
  const shouldCheckAuth = useRef(true)

  React.useEffect(() => {
    if(shouldCheckAuth.current){
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const user = await checkUserAuthFX('/users/login-check')

    if(isAuthPage){
      if(!user){

        setShouldLoadContent(true)
        return
      }

      router.push('/dashboard')
      return
    }

    if(user){
      setUser(user)
      setShouldLoadContent(true)
      return
    }

    router.push('/')
  }
  return {shouldLoadContent}

}
