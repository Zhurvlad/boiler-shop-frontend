import {UseFormRegister} from 'react-hook-form/dist/types/form';
import {FieldErrors} from 'react-hook-form/dist/types/errors';

export interface IInputs {
  name: string,
  email: string,
  password: string
}


export interface IAuthInput {
  register:UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

export interface ISignUpFX extends ISignInFX {
  email: string,
}

export interface ISignInFX {
  url: string,
  username: string,
  password: string
}


export interface IUser {
  username: string,
  userId: number | string,
  email: string
}
