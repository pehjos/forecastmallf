import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

import swal from 'sweetalert2'

export const signin = (formData, router) => async (dispatch) => {
  let timerInterval
  swal.fire({
    title: 'Siging In!',
    html: 'Loading <b></b> milliseconds.',
    timer: 10000,
    timerProgressBar: true,
    didOpen: () => {
      swal.showLoading()
      const b = swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    const Toast = swal.mixin({ toast: true, position: 'top-end',
    showConfirmButton: false, timer: 3000, timerProgressBar: true,
     didOpen: (toast) => { toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer) } }) 
   Toast.fire({ icon: 'success', title: 'Sigin successfully' })
    router.push('/sell');
  }catch (error) {
    console.log(error,"hello");
  

      swal.fire({ icon: 'error', 
      title: 'Oops...', text:"email or password does not match!",
     })
    

  }
};

export const signup = (formData, router) => async (dispatch) => {
  let timerInterval
  swal.fire({
    title: 'Siging Up!',
    html: 'Loading <b></b> milliseconds.',
    timer: 10000,
    timerProgressBar: true,
    didOpen: () => {
      swal.showLoading()
      const b = swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    const Toast = swal.mixin({ toast: true, position: 'top-end',
    showConfirmButton: false, timer: 3000, timerProgressBar: true,
     didOpen: (toast) => { toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer) } }) 
   Toast.fire({ icon: 'success', title: 'Sigup successfully' })
    router.push('/sell');
  }catch (error) {
    console.log(error,"hello");
  

      swal.fire({ icon: 'error', 
      title: 'Oops...', text:"Email or password exists already !",
     })
    

  }
};